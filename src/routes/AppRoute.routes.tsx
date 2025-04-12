import * as React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InicioScreen from '../screens/inicio/InicioScreen';
import PesquisaScreen from '../screens/pesquisa/PesquisaScreen';
import { tabBar, botaoCentralTabBar } from "../utils/NavigationUtil";
import MapaScreen from '../screens/mapa/MapaScreen';
import ServicoScreen from '../screens/servico/ServicoScreen';
import PerfilScreen from '../screens/perfil/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function AppRoute() {
    return (
        <Tab.Navigator screenOptions={tabBar} initialRouteName='inicio'>
            <Tab.Screen name='inicio' component={InicioScreen} />
            <Tab.Screen name='pesquisa' component={PesquisaScreen} />
            <Tab.Screen name='mapa' component={MapaScreen} options={{ tabBarButton: botaoCentralTabBar }}/>
            <Tab.Screen name='servico' component={ServicoScreen} />
            <Tab.Screen name='perfil' component={PerfilScreen} />
        </Tab.Navigator>
    );
};
