import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable'; 
import { styles } from "./CadastroClienteScreenStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasStack } from "../../../models/interfaces/Interface";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../assets/styles/Colors";
import { useState } from "react";
import Divider from "../../../components/divider/Divider";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import Input from "../../../components/input/Input";

export default function CadastroClienteScreen() {

    const [nome, setNome] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [modeloVeiculo, setModeloVeiculo] = useState<string>('');
    const [anoVeiculo, setAnoVeiculo] = useState<string>('');

    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left-circle-outline' color={Colors.branco} size={38} />
                    </TouchableOpacity>

                    <Image source={require("../../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                    <Text style={styles.titulo}> Cadastro Cliente </Text>

                    <Input
                        label='Nome'
                        valor={nome}
                        onChangeText={setNome}
                        maxLength={100}
                        nomeIconeEsquerda='clipboard-text-outline'
                    />

                    <Input
                        label='Telefone'
                        valor={telefone}
                        onChangeText={setTelefone}
                        maxLength={15}
                        nomeIconeEsquerda='phone'
                    />

                    <Input
                        label='Email'
                        valor={email}
                        onChangeText={setEmail}
                        maxLength={50}
                        nomeIconeEsquerda='email-outline'
                    />

                    <Input
                        label='Senha'
                        valor={senha}
                        onChangeText={setSenha}
                        maxLength={100}
                        nomeIconeEsquerda='lock-outline'
                        nomeIconeDireita={mostrarSenha ? 'eye' : 'eye-off'}
                        onPressIconeDireita={() => setMostrarSenha(!mostrarSenha)}
                        mostrarValor={!mostrarSenha}
                    />

                    <Divider texto="Veículo"/>

                    <Input
                        label='Modelo Veículo'
                        valor={modeloVeiculo}
                        onChangeText={setModeloVeiculo}
                        maxLength={100}
                        nomeIconeEsquerda='car-outline'
                    />

                    <Input
                        label='Ano Veículo'
                        valor={anoVeiculo}
                        onChangeText={setAnoVeiculo}
                        maxLength={4}
                        nomeIconeEsquerda='calendar-range'
                    />

                    <Animatable.View animation='fadeInLeft' delay={700}>
                        <BotaoPrincipal label="Cadastrar" onPress={() => navigation.navigate("tabs")} />
                    </Animatable.View>
                </Animatable.View>

            </View>
        </TouchableWithoutFeedback>
    );
}