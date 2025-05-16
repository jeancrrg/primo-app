import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { botaoCentralTabBar, tabBar } from "../utils/NavigationUtil";
import PesquisaClienteScreen from "../screens/acesso-cliente/pesquisa/PesquisaClienteScreen";
import ServicoClienteScreen from "../screens/acesso-cliente/servico/ServicoClienteScreen";
import MapaClienteScreen from "../screens/acesso-cliente/mapa/MapaClienteScreen";
import InicioClienteScreen from "../screens/acesso-cliente/inicio/InicioClienteScreen";
import PerfilClienteScreen from "../screens/acesso-cliente/perfil/PerfilClienteScreen";

const Tab = createBottomTabNavigator();

export default function TabsClienteRoute(): JSX.Element {
    return (
        <Tab.Navigator screenOptions={tabBar} initialRouteName="inicio">
            <Tab.Screen name="inicio" component={InicioClienteScreen} />
            <Tab.Screen name="pesquisa" component={PesquisaClienteScreen} />
            <Tab.Screen name="mapa" component={MapaClienteScreen} options={{ tabBarButton: botaoCentralTabBar }} />
            <Tab.Screen name="servico" component={ServicoClienteScreen} />
            <Tab.Screen name="perfil" component={PerfilClienteScreen} />
        </Tab.Navigator>
    );
}