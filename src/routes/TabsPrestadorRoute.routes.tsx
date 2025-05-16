import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioPrestadorScreen from "../screens/acesso-prestador/inicio/InicioPrestadorScreen";
import MapaPrestadorScreen from "../screens/acesso-prestador/mapa/MapaPrestadorScreen";
import PerfilPrestadorScreen from "../screens/acesso-prestador/perfil/PerfilPrestadorScreen";
import { botaoCentralTabBar, tabBar } from "../utils/NavigationUtil";
import ServicoPrestadorScreen from "../screens/acesso-prestador/servico/ServicoPrestadorScreen";
import EstatisticaPrestadorScreen from "../screens/acesso-prestador/estatistica/EstatisticaPrestadorScreen";

const Tab = createBottomTabNavigator();

export default function TabsPrestadorRoute(): JSX.Element {
    return (
        <Tab.Navigator screenOptions={tabBar} initialRouteName="inicio">
            <Tab.Screen name="inicio" component={InicioPrestadorScreen} />
            <Tab.Screen name="estatistica" component={EstatisticaPrestadorScreen} />
            <Tab.Screen name="mapa" component={MapaPrestadorScreen} options={{ tabBarButton: botaoCentralTabBar }} />
            <Tab.Screen name="servico" component={ServicoPrestadorScreen} />
            <Tab.Screen name="perfil" component={PerfilPrestadorScreen} />
        </Tab.Navigator>
    );
}