import { StyleSheet, TouchableOpacity, View } from "react-native";
import { BottomTabBarButtonProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { Colors } from "../../assets/styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const iconesTabBar = ({ route }: {route: RouteProp<Record<string, object | undefined>, string>;}): BottomTabNavigationOptions => {
    
    return {
        tabBarIcon: ({ color }: { color: string }) => {
            let iconName: string = '';

            switch (route.name) {
                case "pesquisa":
                    iconName = "card-search-outline";
                    break;
                case "servico":
                    iconName = "hammer-wrench";
                    break;
                case "perfil":
                    iconName = "account-outline";
                    break;
                default:
                    iconName = "home";
            }

            return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
        },
        tabBarStyle: {
            ...styles.shadow,
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            borderRadius: 20,
            height: 80,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 0,
            borderColor: Colors.cor_primaria,
            borderWidth: 1,
        },
        tabBarActiveTintColor: Colors.cor_primaria,
        tabBarInactiveTintColor: Colors.cinza_escuro,
        headerShown: false,
        tabBarShowLabel: false,
    };
};

interface TabButtonProps extends BottomTabBarButtonProps {}

export const botaoCentralTabBar: React.FC<TabButtonProps> = ({ onPress }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{ top: -20, justifyContent: "center", alignItems: "center" }}>

        <View style={{
                width: 56,
                height: 56,
                borderRadius: 32,
                backgroundColor: Colors.cor_primaria,
                ...styles.shadow,
                justifyContent: "center",
                alignItems: "center",
            }}>

            <MaterialCommunityIcons name="map-marker" size={30} color={Colors.branco} />
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shadow: {
        shadowColor: Colors.cinza_escuro,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    }
});
