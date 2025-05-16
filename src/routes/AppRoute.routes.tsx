import * as React from "react";
import LoginScreen from "../screens/login/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OpcaoCadastroScreen from "../screens/cadastro/opcao-cadastro/OpcaoCadastroScreen";
import CadastroClienteScreen from "../screens/cadastro/cadastro-cliente/CadastroClienteScreen";
import CadastroPrestadorScreen from "../screens/cadastro/cadastro-prestador/CadastroPrestadorScreen";
import EsqueciSenhaScreen from "../screens/cadastro/esqueci-senha/EsqueciSenhaScreen";
import RedirecionamentoTipoAcessoUtil from "../utils/RedirecionamentoTipoAcessoUtil";

const Stack = createNativeStackNavigator();

export default function AppRoute(): JSX.Element {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="esqueciSenha" component={EsqueciSenhaScreen} />
            <Stack.Screen name="opcaoCadastro" component={OpcaoCadastroScreen} />
            <Stack.Screen name="cadastroCliente" component={CadastroClienteScreen} />
            <Stack.Screen name="cadastroPrestador" component={CadastroPrestadorScreen} />
            <Stack.Screen name="tabs" component={RedirecionamentoTipoAcessoUtil} />
        </Stack.Navigator>
    );
};
