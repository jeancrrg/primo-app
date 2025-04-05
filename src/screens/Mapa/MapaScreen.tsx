import { Text, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Circle, Marker, Region } from "react-native-maps";
import { Colors } from "../../../assets/styles/Colors";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./MapaScreenStyle";

interface PrestadorServico {
    id: number;
    firstName: string;
    lastName: string;
    district: string;
    expertArea: string;
}

type DistrictCoordinates = Record<string, { latitude: number; longitude: number }>;

export default function MapaScreen() {
    const [initialRegion, setInitialRegion] = useState<Region | null>(null);
    const [serviceList] = useState<PrestadorServico[]>([
        { id: 1, firstName: "Carlos", lastName: "Silva", district: "Aparecida", expertArea: "Mecânica" },
        { id: 2, firstName: "Mariana", lastName: "Souza", district: "Aparecida", expertArea: "Elétrica" },
        { id: 3, firstName: "João", lastName: "Pereira", district: "Aparecida", expertArea: "Pintura" }
    ]);

    const districtCoordinates: DistrictCoordinates = {
        Aparecida: { latitude: -18.918432, longitude: -48.277229 },
    };

    useEffect(() => {
        async function getLocationAsync() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            setInitialRegion({
                latitude,
                longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }

        getLocationAsync();
    }, []);

    function getCoordinatesForDistrict(district: string) {
        return districtCoordinates[district] || { latitude: 0, longitude: 0 };
    }

    return (
        <View style={styles.container}>
            {initialRegion && (
                <MapView
                    style={styles.map}
                    provider="google"
                    initialRegion={initialRegion}
                    loadingIndicatorColor={Colors.cor_primaria}
                    userLocationUpdateInterval={1000}
                    showsUserLocation={true}
                    showsMyLocationButton={true}>

                    <Circle
                        center={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }}
                        radius={2000}
                        strokeWidth={2}
                        strokeColor="rgba(0, 0, 255, 0.5)"
                        fillColor="rgba(0, 0, 255, 0.2)"
                    />

                    {serviceList.map((service) => (
                        <Marker
                            key={service.id}
                            coordinate={getCoordinatesForDistrict(service.district)}
                            title={`${service.firstName} ${service.lastName}`}>

                            <Callout style={styles.callout_container}>
                                <TouchableOpacity onPress={() => console.log('teste')}>
                                    <View style={styles.callout_button}>
                                        <Text style={styles.callout_title}>
                                            {service.firstName} {service.lastName}
                                        </Text>
                                        <Text style={styles.callout_text}>
                                            {service.expertArea}
                                        </Text>
                                    </View>
                                    <MaterialCommunityIcons name='chevron-right' color={Colors.cor_primaria} size={24}/>
                                </TouchableOpacity>
                            </Callout>
                        </Marker>
                    ))}
                </MapView>
            )}
        </View>
    );
}
