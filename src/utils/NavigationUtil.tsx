import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { createNavigationContainerRef, RouteProp, StackActions } from "@react-navigation/native";
import { Colors } from "../../assets/styles/Colors";
import { Feather } from "@expo/vector-icons";
import { RotaPrincipal } from "../models/types/RotaPrincipal";
import { RotaTabBar } from "../models/types/RotaTabBar";

export const tabBar = ({ route }: {route: RouteProp<Record<string, object | undefined>, string>;}): BottomTabNavigationOptions => {
    return {
        tabBarIcon: ({ color }: { color: string }) => {
            let nomeIcone: "home" | "search" | "grid" | "tool" | "user" = "home";

            switch (route.name) {
                case "pesquisa":
                    nomeIcone = "search";
                    break;
                case "estatistica":
                    nomeIcone = "grid";
                    break;
                case "servico":
                    nomeIcone = "tool";
                    break;
                case "perfil":
                    nomeIcone = "user";
                    break;
                default:
                    nomeIcone = "home";
            }

            return <Feather name={nomeIcone} size={30} color={color} />;
        },
        tabBarStyle: {
            ...styles.shadow,
            position: "absolute",
            borderRadius: 20,
            height: 70,
            marginTop: 10,
            marginBottom: 25,
            marginHorizontal: 20
        },
        tabBarActiveTintColor: Colors.corPrimaria,
        tabBarInactiveTintColor: Colors.cinzaMedioEscuro,
        headerShown: false,
        tabBarShowLabel: false,
    };
};

interface TabButtonProps extends BottomTabBarButtonProps {}

export const botaoCentralTabBar: React.FC<TabButtonProps> = ({ onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ top: -18, justifyContent: "center", alignItems: "center" }}>

        <View style={{
                width: 60,
                height: 60,
                borderRadius: 32,
                backgroundColor: Colors.corPrimaria,
                ...styles.shadow,
                justifyContent: "center",
                alignItems: "center",
            }}>

            <Feather name="map-pin" size={30} color={Colors.branco} />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: Colors.preto,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    }
});

export const navigationRef = createNavigationContainerRef<RotaPrincipal>();
type RotasApp = RotaPrincipal & RotaTabBar;

export function navegarParaTela<K extends keyof RotasApp>(rota: K, parametros?: RotasApp[K]): void {
    if (navigationRef.isReady()) {
        (navigationRef as any).navigate(rota, parametros);
    }
}

export function substituirTela<K extends keyof RotasApp>(rota: K, parametros?: RotasApp[K]): void {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(StackActions.replace(rota, parametros));
    }
}

export function voltarTela(): void {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}
