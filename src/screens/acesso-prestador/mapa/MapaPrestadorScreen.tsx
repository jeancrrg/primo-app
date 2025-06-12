import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./MapaPrestadorScreenStyle";
import { useEffect, useMemo, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Loader from "../../../components/loader/Loader";
import { Colors } from "../../../../assets/styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { conectarWebSocket, disconectarWebSocket } from "../../../services/WebSocket.service";
import BottomSheet from "@gorhom/bottom-sheet";
import { Surface } from "react-native-paper";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import { InformacaoClienteDTO } from "../../../models/dto/InformacaoClienteDTO.model";
import { useConexaoPrestador } from "../../../contexts/ConexaoPrestadorContext";

export default function MapaPrestadorScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Location.LocationObject | null>(null);

    const [possuiSolicitacaoServico, setPossuiSolicitacaoServico] = useState<boolean>(false);
    const [informacaoClienteDTO, setInformacaoClienteDTO] = useState<InformacaoClienteDTO>();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const referenciaMapa = useRef<MapView>(null);

    const snapPoints = useMemo(() => ['20%', '33%'], []);

    const { indicadorConectado } = useConexaoPrestador();

    useEffect(() => {
        obterLocalizacaoAtual();
        atualizarLocalizacaoTemReal();
    }, []);

    useEffect(() => {
        conectarWebSocket(2, (data) => {
            setInformacaoClienteDTO(data);           
            setPossuiSolicitacaoServico(true);
            abrirBottomSheet();
            setLoading(false);
        });

        setLoading(false); 
        return () => disconectarWebSocket();
    }, []);

    async function obterLocalizacaoAtual(): Promise<void> {
        setLoading(true);
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
        setLoading(false);
    }

    async function solicitarPermissaoLocalizacao(): Promise<boolean> {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if (granted) {
            return true;
        }
        return false;
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

    function abrirBottomSheet(): void {
        bottomSheetRef.current?.expand();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerConexao}>
                <MaterialCommunityIcons name='access-point' color={Colors.cinzaEscuro} size={30} />
                <Text style={styles.textoHeaderConexao}> Você está {indicadorConectado ? 'conectado' : 'desconectado'} </Text>
            </View>

            {localizacaoAtual && !loading ? (
                <MapView
                    ref={referenciaMapa}
                    style={styles.mapa}
                    provider="google"
                    loadingIndicatorColor={Colors.corPrimaria}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={false}
                    showsMyLocationButton={true}>

                    <Marker coordinate={{latitude: localizacaoAtual.coords.latitude, longitude: localizacaoAtual.coords.longitude}}>
                        <View style={styles.containerMarcadorLocalizacao}>
                            <View style={styles.circuloExterno} />
                            <View style={styles.marcadorLocalizacao} />
                        </View>
                    </Marker>
                </MapView>
            ) : (
                <Loader />
            )}

            {possuiSolicitacaoServico && (
                <BottomSheet
                    key={informacaoClienteDTO?.codigo}
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    backgroundStyle={{ backgroundColor: Colors.cinzaClaro }}>

                    <Surface elevation={5} style={styles.containerBottomSheet}>
                        <View style={styles.containerAvatar}>
                            <Image source={obterImagemAvatar(informacaoClienteDTO?.codigoAvatar)} style={styles.avatar} />
                        </View>

                        <View style={styles.containerConteudo}>
                            <View style={styles.containerDescricao}>
                                <Text style={styles.nome}> {informacaoClienteDTO?.nome} </Text>
                                <Text style={styles.tempoSolicitacao}> 20 min </Text>
                            </View>

                            <View style={styles.containerBotoes}>
                                <TouchableOpacity style={styles.botaoAceitar} onPress={() => {}}>
                                    <MaterialCommunityIcons name='checkbox-marked-circle-outline' size={25} color={Colors.branco} />
                                    <Text style={styles.textoBotaoSolicitacao}> Aceitar </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.botaoRecusar} onPress={() => {}}>
                                    <MaterialCommunityIcons name='close-circle-outline' size={25} color={Colors.branco} />
                                    <Text style={styles.textoBotaoSolicitacao}> Recusar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Surface>
                </BottomSheet>
            )}
        </View>
    );
}