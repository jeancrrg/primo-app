import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from '../screens/inicio/InicioScreen';
import { tabBar, botaoCentralTabBar } from "../utils/NavigationUtil";
import PesquisaScreen from '../screens/pesquisa/PesquisaScreen';
import MapaScreen from '../screens/mapa/MapaScreen';
import ServicoScreen from '../screens/servico/ServicoScreen';
import PerfilScreen from '../screens/perfil/PerfilScreen';

const { Screen, Navigator } = createBottomTabNavigator();

export default function AppRoute() {
    return (
        <Navigator screenOptions={tabBar} initialRouteName='inicio'>
            <Screen name='inicio' component={InicioScreen} />
            <Screen name='pesquisa' component={PesquisaScreen} />
            <Screen name='mapa' component={MapaScreen} options={{ tabBarButton: botaoCentralTabBar }}/>
            <Screen name='servico' component={ServicoScreen} />
            <Screen name='perfil' component={PerfilScreen} />
        </Navigator>
    );
};
