import { ActivityIndicator, View } from "react-native";
import { styles } from "./MapaScreenStyle";
import MapView, { Circle, Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { Colors } from "../../../assets/styles/Colors";
import * as Location from "expo-location";
import { PrestadorServico } from "../../models/interfaces/Interface";

export default function MapaScreen() {

    const [loading, setLoading] = useState<boolean>(true);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Location.LocationObject | null>(null);

    const [listaPrestadoresServico] = useState<PrestadorServico[]>([
        { codigo: 1, nome: "Welligton Cardoso", tipoServico: "Chaveiro", endereco: 'Rua A, 123', telefone: '123456789',
            latitude: -18.9048018, longitude: -48.2795889 },

        { codigo: 2, nome: "Mariana Ribeiro", tipoServico: "Auto Elétrica", endereco: 'Rua B, 456', telefone: '987654321',
            latitude: -18.9125313, longitude: -48.2696829 },

        { codigo: 3, nome: "João Pedro", tipoServico: "Guincho", endereco: 'Rua C, 789', telefone: '456789123',
            latitude: -18.9016061, longitude: -48.2602384 }
    ]);

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
        const concedeuPermissaoLocalizacao: boolean = await solicitarPermissaoLocalizacao();
        if (concedeuPermissaoLocalizacao) {
            const localizacao: Location.LocationObject = await Location.getCurrentPositionAsync();
            setLocalizacaoAtual(localizacao);
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
                    style={styles.mapa}
                    provider="google"
                    initialRegion={{
                        latitude: localizacaoAtual.coords.latitude,
                        longitude: localizacaoAtual.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    loadingIndicatorColor={Colors.corPrimaria}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>

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
                                latitude: prestadorServico.latitude,
                                longitude: prestadorServico.longitude
                            }}
                            title={`${prestadorServico.nome}`}
                            description={`Serviço: ${prestadorServico.tipoServico}`}
                            onCalloutPress={() => console.log('Botão pressionado')}
                        />
                    ))}
                </MapView>
            ) : (
                <ActivityIndicator style={styles.loading} size="large" color={Colors.corPrimaria} />
            )}
        </View>
    );
}