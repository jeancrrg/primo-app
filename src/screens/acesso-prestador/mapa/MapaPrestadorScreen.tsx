import { View } from "react-native";
import { styles } from "./MapaPrestadorScreenStyle";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Loader from "../../../components/loader/Loader";
import { Colors } from "../../../../assets/styles/Colors";

export default function MapaPrestadorScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Location.LocationObject | null>(null);

    const referenciaMapa = useRef<MapView>(null);

    useEffect(() => {
        obterLocalizacaoAtual();
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
        </View>
    );
}