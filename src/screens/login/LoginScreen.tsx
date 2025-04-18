import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Animatable from 'react-native-animatable'; 
import { useState } from "react";
import { RotasStack } from "../../models/interfaces/Interface";
import Divider from "../../components/divider/Divider";
import BotaoPrincipal from "../../components/botao/botao-principal/BotaoPrincipal";
import BotaoSecundario from "../../components/botao/botao-secundario/BotaoSecundario";
import Input from "../../components/input/Input";

export default function LoginScreen() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <Image source={require("../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                    <Text style={styles.titulo}> Bem-Vindo(a) </Text>

                    <Text style={styles.texto}> Entre ou cadastre-se no App Primo </Text>

                    <Input
                        label='Email'
                        valor={email}
                        onChangeText={setEmail}
                        maxLength={100}
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
                
                    <Animatable.View animation='fadeInLeft' delay={700}>
                        <BotaoPrincipal label="Entrar" onPress={() => navigation.navigate("tabs")} />
                    </Animatable.View>

                    <Divider texto="OU" />
                        
                    <Text style={styles.infoCadastro}> Ainda não possui cadastro? Cadastre-se</Text>

                    <Animatable.View animation='fadeInRight' delay={700}>
                        <BotaoSecundario label="Cadastrar" onPress={() => navigation.navigate("opcaoCadastro")} />
                    </Animatable.View>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}