import { Image, Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Animatable from 'react-native-animatable'; 
import { useState } from "react";
import Divider from "../../components/divider/Divider";
import BotaoPrincipal from "../../components/botao/botao-principal/BotaoPrincipal";
import BotaoSecundario from "../../components/botao/botao-secundario/BotaoSecundario";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validacoesFormularioLogin } from "../../validations/LoginValidation";
import { RotaStack } from "../../models/types/RotaStack";
import { FormularioLogin } from "../../models/interfaces/formularios/FormularioLogin";
import { User } from "firebase/auth";
import { realizarLogin } from "../../services/Autenticacao.service";
import { isNotEmpty } from "../../utils/ValidationUtil";
import Toast from "react-native-toast-message";

export default function LoginScreen() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacoesFormularioLogin)
    });

    function entrar(formulario: FormularioLogin): void {   
        realizarLogin(formulario.email, formulario.senha)
            .then((usuario: User) => {
                if (isNotEmpty(usuario)) {
                    navigation.navigate('tabs');
                }
            })
            .catch(error => {
                let mensagemErro: string = '';
                switch (error.code) {
                    case 'auth/invalid-login-credentials':
                        mensagemErro = 'Usuário ou senha inválida! Verifique novamente';
                        break;
                    case 'auth/user-not-found':
                        mensagemErro = 'Usuário não encontrado. Verifique o email digitado';
                        break;
                    case 'auth/too-many-requests':
                        mensagemErro = 'Muitas tentativas de login. Tente novamente mais tarde';
                        break;
                    default:
                        mensagemErro = 'Ocorreu um erro inesperado! Entre em contato com o suporte';
                        break;
                }
                Toast.show({ type: 'erro', text1: 'ERRO', text2: mensagemErro });
            });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <Image source={require("../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.containerFormulario}>
                    <Animatable.View animation='fadeInUp' delay={500}>
                        <Text style={styles.titulo}> Bem-Vindo(a) </Text>                    
                        <Text style={styles.texto}> Entre ou cadastre-se no App Primo </Text>
                    
                        <Input
                            control={control}
                            name='email'
                            label='Email'
                            maxLength={50}
                            nomeIconeEsquerda='email-outline'
                            errosValidacao={errors.email?.message}
                        />

                        <Input
                            control={control}
                            name='senha'
                            label='Senha'
                            maxLength={15}
                            nomeIconeEsquerda='lock-outline'
                            nomeIconeDireita={mostrarSenha ? 'eye' : 'eye-off'}
                            onPressIconeDireita={() => setMostrarSenha(!mostrarSenha)}
                            mostrarValor={!mostrarSenha}
                            errosValidacao={errors.senha?.message}
                        />
                    
                        <Animatable.View animation='fadeInLeft' delay={700} style={styles.containerBotaoEntrar}>
                            <BotaoPrincipal label="Entrar" onPress={handleSubmit(entrar)} />
                        </Animatable.View>

                        <Divider texto="OU" />
                            
                        <Text style={styles.infoCadastro}> Ainda não possui cadastro? Cadastre-se</Text>

                        <Animatable.View animation='fadeInRight' delay={700}>
                            <BotaoSecundario label="Cadastrar" onPress={() => navigation.navigate("opcaoCadastro")} />
                        </Animatable.View>
                    </Animatable.View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}