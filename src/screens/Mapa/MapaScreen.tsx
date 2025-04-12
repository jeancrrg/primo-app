import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MapaScreenStyle";
import MapView, { Circle, Marker } from "react-native-maps";
import { useEffect, useMemo, useRef, useState } from "react";
import { Colors } from "../../../assets/styles/Colors";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Surface } from "react-native-paper"
import { PrestadorServico } from "../../models/PrestadorServico";
import { buscarPrestadoresServico } from "../../services/PrestadorServico.service";

export default function MapaScreen() {

    const [loading, setLoading] = useState<boolean>(true);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Location.LocationObject | null>(null);
    const [listaPrestadoresServico, setListaPrestadoresServico] = useState<PrestadorServico[]>([]);
    const [prestadorServicoSelecionado, setPrestadorServicoSelecionado] = useState<PrestadorServico | null>(null);

    const bottomSheetRef = useRef<BottomSheet>(null)
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
                    style={styles.mapa}
                    provider="google"
                    initialRegion={{
                        latitude: localizacaoAtual.coords.latitude,
                        longitude: localizacaoAtual.coords.longitude,
                        latitudeDelta: 0.050,
                        longitudeDelta: 0.050
                    }}
                    loadingIndicatorColor={Colors.corPrimaria}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    onPress={() => onPressMapa()}>

                    <Circle
                        center={{ 
                            latitude: localizacaoAtual.coords.latitude,
                            longitude: localizacaoAtual.coords.longitude 
                        }}
                        radius={2000}
                        strokeWidth={2}
                        strokeColor={Colors.azulEscuroTransparente}
                        fillColor={Colors.azulClaroTransparente} 
                    />

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
                        />
                    ))}
                </MapView>
            ) : (
                <ActivityIndicator style={styles.loading} size="large" color={Colors.corPrimaria} />
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