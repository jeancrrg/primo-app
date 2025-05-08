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
import { User } from "firebase/auth";
import { realizarLogin, autenticarUsuario } from "../../services/Autenticacao.service";
import { LoginDTO } from "../../models/dto/LoginDTO";
import { isNotEmpty } from "../../utils/ValidationUtil";
import Toast from "react-native-toast-message";
import { atribuirTokenAcesso } from "../../services/TokenAcesso.service";

export default function LoginScreen() {

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

    const { control, handleSubmit, formState: { errors } } = useForm<LoginDTO>({
        resolver: yupResolver(validacoesFormularioLogin)
    });

    async function entrar(loginDTO: LoginDTO): Promise<void> {
        try {
            const usuario: User = await autenticarUsuario(loginDTO.login, loginDTO.senha);
            const token: string = await realizarLogin(loginDTO);
            atribuirTokenAcesso(token);
            
            console.log('token: ', token);

            if (isNotEmpty(usuario) && isNotEmpty(token)) {
                navigation.navigate('tabs');
            }
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <Image source={require("../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.titulo}> Bem-Vindo(a) </Text>                    
                        <Text style={styles.texto}> Entre ou cadastre-se no App Primo </Text>
                    
                        <Input
                            control={control}
                            name='login'
                            label='Email'
                            maxLength={50}
                            nomeIconeEsquerda='email-outline'
                            errosValidacao={errors.login?.message}
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
                    </ScrollView>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}