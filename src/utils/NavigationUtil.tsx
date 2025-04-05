import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Colors } from "../../assets/styles/Colors";
import { Feather } from "@expo/vector-icons";

export const tabBar = ({ route }: {route: RouteProp<Record<string, object | undefined>, string>;}): BottomTabNavigationOptions => {
    
    return {
        tabBarIcon: ({ color }: { color: string }) => {
            let nomeIcone: "home" | "search" | "tool" | "user" = "home";

            switch (route.name) {
                case "pesquisa":
                    nomeIcone = "search";
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
            marginHorizontal: 20,
            paddingTop: 12
        },
        tabBarActiveTintColor: Colors.corPrimaria,
        tabBarInactiveTintColor: Colors.cinzaEscuro,
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
        shadowColor: Colors.cinzaEscuro,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    }
});
