import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./MapaScreenStyle";
import MapView, { Callout, Circle, Marker, Region } from "react-native-maps";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../assets/styles/Colors";
import * as Location from "expo-location";
import { PrestadorServico } from "../../models/interfaces/Interface";

export default function MapaScreen() {

    const [loading, setLoading] = useState<boolean>(true);
    const [localizacaoAtual, setLocalizacaoAtual] = useState<Region | null>(null);

    const [listaPrestadoresServico] = useState<PrestadorServico[]>([
        { codigo: 1, nome: "Carlos", tipoServico: "Mecânico", endereco: 'Rua A, 123', telefone: '123456789',
            latitude: -18.914500, longitude: -48.275000 },

        { codigo: 2, nome: "Mariana", tipoServico: "Elétrica", endereco: 'Rua B, 456', telefone: '987654321',
            latitude: -18.914000, longitude: -48.274500 },

        { codigo: 3, nome: "João", tipoServico: "Pintura", endereco: 'Rua C, 789', telefone: '456789123',
            latitude: -18.913500, longitude: -48.274200 }
    ]);

    useEffect(() => {
        obterLocalizacaoAtual();
    }, []);

    async function obterLocalizacaoAtual(): Promise<void> {
        const concedeuPermissaoLocalizacao: boolean = await solicitarPermissaoLocalizacao(); 
        if (!concedeuPermissaoLocalizacao) {
            return;
        }

        // Obtém a localização atual do usuário
        let localizacao = await Location.getCurrentPositionAsync({});

        // Extrai latitude e longitude da localização retornada
        const { latitude, longitude } = localizacao.coords;

        // Define a região inicial do mapa com base na localização do usuário
        setLocalizacaoAtual({
            latitude, // Latitude atual
            longitude, // Longitude atual
            latitudeDelta: 0.0922, // Zoom vertical do mapa (quanto maior, mais afastado)
            longitudeDelta: 0.0421, // Zoom horizontal do mapa
        });

        setLoading(false);
    }

    async function solicitarPermissaoLocalizacao(): Promise<boolean> {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>
            {localizacaoAtual && !loading ? (
                <MapView
                    style={styles.mapa}
                    provider="google"
                    initialRegion={localizacaoAtual}
                    loadingIndicatorColor={Colors.corPrimaria}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>

                    <Circle
                        center={{ latitude: localizacaoAtual.latitude, longitude: localizacaoAtual.longitude }}
                        radius={2000}
                        strokeWidth={2}
                        strokeColor={Colors.azulEscuroTransparente}
                        fillColor={Colors.azulClaroTransparente} 
                    />

                    {listaPrestadoresServico.map((prestadorServico) => (
                        <Marker
                            key={prestadorServico.codigo}
                            coordinate={{ latitude: prestadorServico.latitude, longitude: prestadorServico.longitude }}
                            title={`${prestadorServico.nome}`}>

                            <Callout onPress={() => console.log('Chamando...')}>
                                <View>
                                    <View style={styles.callout_button}>
                                        <Text style={styles.callout_title}> {prestadorServico.nome} </Text>
                                        <Text style={styles.callout_text}> {prestadorServico.tipoServico} </Text>
                                    </View>

                                    <MaterialCommunityIcons name='logout-variant' size={24} color={Colors.corPrimaria} />
                                </View>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <ActivityIndicator style={styles.loading} size="large" color={Colors.corPrimaria} />
            )}
        </View>
    );
}