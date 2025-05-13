import * as React from "react";
import TabsRoute from "./TabsRoute.routes";
import LoginScreen from "../screens/login/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpcaoCadastroScreen from "../screens/cadastro/opcao-cadastro/OpcaoCadastroScreen";
import CadastroClienteScreen from "../screens/cadastro/cadastro-cliente/CadastroClienteScreen";
import CadastroPrestadorScreen from "../screens/cadastro/cadastro-prestador/CadastroPrestadorScreen";
import EsqueciSenhaScreen from "../screens/cadastro/esqueci-senha/EsqueciSenhaScreen";

const Stack = createNativeStackNavigator();

export default function AppRoute() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="esqueciSenha" component={EsqueciSenhaScreen} />
            <Stack.Screen name="opcaoCadastro" component={OpcaoCadastroScreen} />
            <Stack.Screen name="cadastroCliente" component={CadastroClienteScreen} />
            <Stack.Screen name="cadastroPrestador" component={CadastroPrestadorScreen} />
            <Stack.Screen name="tabs" component={TabsRoute} />
        </Stack.Navigator>
    );
};
