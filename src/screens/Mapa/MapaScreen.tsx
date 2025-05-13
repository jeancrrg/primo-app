import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MapaScreenStyle";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "../../../assets/styles/Colors";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Surface } from "react-native-paper"
import { buscarPrestadoresServico } from "../../services/Prestador.service";
import Loader from "../../components/loader/Loader";
import { PrestadorServico } from "../../models/cadastro/PrestadorServico";

export default function MapaScreen() {

    const [loading, setLoading] = useState<boolean>(true);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Location.LocationObject | null>(null);
    const [listaPrestadoresServico, setListaPrestadoresServico] = useState<PrestadorServico[]>([]);
    const [prestadorServicoSelecionado, setPrestadorServicoSelecionado] = useState<PrestadorServico | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const referenciaMapa = useRef<MapView>(null);

    const snapPoints = useMemo(() => ['20%', '33%'], []);

    useEffect(() => {
        obterLocalizacaoAtual();
        buscarPrestadores();
    }, []);

    // Atualiza a localização em tempo real
    useEffect(() => {
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1
        }, (localizacao) => {
            setLocalizacaoAtual(localizacao);
        });
    }, []);

    async function obterLocalizacaoAtual(): Promise<void> {
        const concedeuPermissaoLocalizacao: boolean = await solicitarPermissaoLocalizacao();
        if (concedeuPermissaoLocalizacao) {
            const localizacao: Location.LocationObject = await Location.getCurrentPositionAsync();
            setLocalizacaoAtual(localizacao);

            // Mostrar mapa sem zoom
            referenciaMapa.current?.animateToRegion({
                latitude: localizacao.coords.latitude,
                longitude: localizacao.coords.longitude,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            }, 1000);

            // Depois de 1s, da zoom na localização atual
            setTimeout(() => {
                referenciaMapa.current?.animateToRegion({
                    latitude: localizacao.coords.latitude,
                    longitude: localizacao.coords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }, 1000);
            }, 1200);
        }
    }

    async function buscarPrestadores(): Promise<void> {
        const listaPrestadoresServico: PrestadorServico[] = await buscarPrestadoresServico();
        setListaPrestadoresServico(listaPrestadoresServico);
        setLoading(false);
    }

    async function solicitarPermissaoLocalizacao(): Promise<boolean> {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted) {
            return true;
        }
        return false;
    }

    function onPressMarker(prestadorServico: PrestadorServico): void {
        setPrestadorServicoSelecionado(prestadorServico);
        abrirBottomSheet();
    }

    function onPressMapa(): void {
        setPrestadorServicoSelecionado(null);
        fecharBottomSheet();
    }

    function abrirBottomSheet(): void {
        bottomSheetRef.current?.expand();
    }

    function fecharBottomSheet(): void {
        bottomSheetRef.current?.close();
    }

    return (
        <View style={styles.container}>

            {localizacaoAtual && !loading ? (
                <MapView
                    ref={referenciaMapa}
                    style={styles.mapa}
                    provider="google"
                    loadingIndicatorColor={Colors.corPrimaria}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={false}
                    showsMyLocationButton={true}
                    onPress={() => onPressMapa()}>

                    <Marker coordinate={{latitude: localizacaoAtual.coords.latitude, longitude: localizacaoAtual.coords.longitude}}>
                        <View style={styles.containerMarcadorLocalizacao}>
                            <View style={styles.circuloExterno} />
                            <View style={styles.marcadorLocalizacao} />
                        </View>
                    </Marker>  

                    {listaPrestadoresServico.map((prestadorServico) => (
                        <Marker
                            key={prestadorServico.codigo}
                            coordinate={{
                                latitude: parseFloat(prestadorServico.endereco?.latitude ?? '0'),
                                longitude: parseFloat(prestadorServico.endereco?.longitude ?? '0')
                            }}
                            title={prestadorServico.nome}
                            description={prestadorServico.descricaoTipoServico}
                            onPress={() => onPressMarker(prestadorServico)}
                            anchor={{ x: 0.5, y: 0.5 }} />
                    ))}
                </MapView>
            ) : (
                <Loader/>
            )}

            {prestadorServicoSelecionado && (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backgroundStyle={{ backgroundColor: Colors.cinzaClaro }}>

                    <Surface elevation={5} style={styles.containerBottomSheet}>
                        <View style={styles.containerAvatar}>
                            <Image source={require("../../../assets/images/avatares/avatar-5.png")} style={styles.avatar} />
                        </View>

                        <View style={styles.containerDescricao}>
                            <Text style={styles.nome}> {prestadorServicoSelecionado?.nome} </Text>
                            <Text style={styles.tipoServico}> {prestadorServicoSelecionado?.descricaoTipoServico} </Text>
                            <Text style={styles.precoServico}> R$ {prestadorServicoSelecionado?.valorServico} </Text>
                        </View>

                        <View style={styles.containerSolicitacao}>
                            <Text style={styles.tempoSolicitacao}> 20 min </Text>

                            <TouchableOpacity style={styles.botaoSolicitacao}>
                                <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={24} color={Colors.branco} />
                                <Text style={styles.textoBotaoSolicitacao}> Solicitar </Text>
                            </TouchableOpacity>
                        </View>
                    </Surface>
                </BottomSheet>
            )}

        </View>
    );
}