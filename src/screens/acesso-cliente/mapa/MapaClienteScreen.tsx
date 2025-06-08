import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MapaClienteScreenStyle";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "../../../../assets/styles/Colors";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Surface } from "react-native-paper"
import { buscarPrestadoresServico } from "../../../services/Prestador.service";
import Loader from "../../../components/loader/Loader";
import { PrestadorServico } from "../../../models/cadastro/PrestadorServico";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import { solicitarPrestador1 } from "../../../services/Solicitacao.service";

export default function MapaClienteScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Location.LocationObject | null>(null);
    const [listaPrestadoresServico, setListaPrestadoresServico] = useState<PrestadorServico[]>([]);
    const [prestadorServicoSelecionado, setPrestadorServicoSelecionado] = useState<PrestadorServico | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const referenciaMapa = useRef<MapView>(null);

    const snapPoints = useMemo(() => ['20%', '33%'], []);

    useEffect(() => {
        setLoading(true);
        obterLocalizacaoAtual();
        buscarPrestadores();
        atualizarLocalizacaoTemReal();
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
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }, 1000);

            // Depois de 1s, realizar zoom na localização atual
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

    async function solicitarPermissaoLocalizacao(): Promise<boolean> {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted) {
            return true;
        }
        return false;
    }

    async function buscarPrestadores(): Promise<void> {
        const listaPrestadoresServico: PrestadorServico[] = await buscarPrestadoresServico();
        setListaPrestadoresServico(listaPrestadoresServico);
        setLoading(false);
    }

    async function atualizarLocalizacaoTemReal(): Promise<void> {
        const concedeuPermissaoLocalizacao: boolean = await solicitarPermissaoLocalizacao();
        if (concedeuPermissaoLocalizacao) {
            Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
                distanceInterval: 1
            }, (localizacao) => {
                setLocalizacaoAtual(localizacao);
            });
        }
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

    async function solicitarPrestador(): Promise<void> {
        try {
            console.log('Solicitando prestador');
            await solicitarPrestador1('1');
        } catch (error) {
            console.error("Erro ao solicitar prestador:", error);
        }
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
                <Loader />
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
                            <Image source={obterImagemAvatar(prestadorServicoSelecionado?.codigoAvatar)} style={styles.avatar} />
                        </View>

                        <View style={styles.containerDescricao}>
                            <Text style={styles.nome}> {prestadorServicoSelecionado?.nome} </Text>
                            <Text style={styles.tipoServico}> {prestadorServicoSelecionado?.descricaoTipoServico} </Text>
                            <Text style={styles.precoServico}> R$ {prestadorServicoSelecionado?.valorServico} </Text>
                        </View>

                        <View style={styles.containerSolicitacao}>
                            <Text style={styles.tempoSolicitacao}> 20 min </Text>

                            <TouchableOpacity style={styles.botaoSolicitacao} onPress={() => solicitarPrestador()}>
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