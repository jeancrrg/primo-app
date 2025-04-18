import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CadastroScreenStyle";
import * as Animatable from 'react-native-animatable'; 
import { useState } from "react";
import Divider from "../../components/divider/Divider";
import { Colors } from "../../../assets/styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasStack } from "../../models/interfaces/Interface";
import { useNavigation } from "@react-navigation/native";

export default function CadastroScreen() {

    const [mostrarFormularioEscolha, setMostrarFormularioEscolha] = useState<boolean>(true);
    const [mostrarFormularioCliente, setMostrarFormularioCliente] = useState<boolean>(false);
    const [mostrarFormularioPrestador, setMostrarFormularioPrestador] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();

    function voltarNavegacao(): void {
        navigation.goBack();
    }

    function renderFormularioCliente() {
        return (
            <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                <Text style={styles.titulo}> O que deseja? </Text>

                <Text style={styles.texto}> Escolha como deseja utilizar o App Primo </Text>

                <Animatable.View animation='fadeInLeft' delay={700}>
                    <TouchableOpacity style={styles.botaoPrincipal}>
                        <Text style={styles.textoBotaoPrincipal}> Solicitar Serviço </Text>    
                    </TouchableOpacity>
                </Animatable.View>

                <Animatable.View animation='fadeInRight' delay={700}>
                    <TouchableOpacity style={styles.botaoSecundario}>
                        <Text style={styles.textoBotaoSecundario}> Oferecer Serviço </Text>
                    </TouchableOpacity>
                </Animatable.View>

                <Divider texto='OU' />

                <View style={styles.containerPossuiCadastro}>
                    <Text style={styles.textoPossuiCadastro}> Já possui cadastro? </Text>
                    <TouchableOpacity onPress={() => voltarNavegacao()}>
                        <Text style={styles.textoEntrarCadastro}> ENTRAR </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        );
    }

    return (
        <View style={styles.container}>
            <Animatable.View animation='fadeInLeft' delay={500}>
                <TouchableOpacity style={styles.botaoVoltar} onPress={() => voltarNavegacao()}>
                    <MaterialCommunityIcons name='arrow-left-circle-outline' color={Colors.branco} size={38} />
                </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                <Image source={require("../../../assets/logo-primo.png")} style={styles.logo} />
            </Animatable.View> 

            {mostrarFormularioEscolha && renderFormularioCliente()}



        </View>
    );
}