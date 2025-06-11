import { Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import * as Animatable from 'react-native-animatable'; 
import { useCallback, useEffect, useState } from "react";
import Divider from "../../components/divider/Divider";
import BotaoPrincipal from "../../components/botao/botao-principal/BotaoPrincipal";
import BotaoSecundario from "../../components/botao/botao-secundario/BotaoSecundario";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validacoesFormularioLogin } from "../../validations/LoginValidation";
import { User } from "firebase/auth";
import { isNotEmpty } from "../../utils/ValidationUtil";
import Loader from "../../components/loader/Loader";
import { FormularioLogin } from "../../models/interfaces/formularios/FormularioLogin.interface";
import { navegarParaTela } from "../../utils/NavigationUtil";
import { RotaPrincipalEnum } from "../../models/enum/RotaPrincipal.enum";
import { autenticarUsuario, realizarLogin } from "../../services/Autenticacao.service";
import { removerCodigoPessoaLogado, removerTokenAcesso, salvarCodigoPessoaLogado, salvarTipoPessoaLogado, salvarTokenAcesso } from "../../services/Storage.service";
import { LoginDTO } from "../../models/dto/LoginDTO.model";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function LoginScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const { control, handleSubmit, formState: { errors }, setValue } = useForm<FormularioLogin>({
        resolver: yupResolver(validacoesFormularioLogin)
    });

    useFocusEffect(
        useCallback(() => {
            setValue('login', '');
            setValue('senha', '');
            setMostrarSenha(false);
            removerTokenAcesso();
            removerCodigoPessoaLogado();
        }, [])
    );

    async function entrar(formulario: FormularioLogin): Promise<void> {
        try {
            setLoading(true);
            
            const usuario: User = await autenticarUsuario(formulario.login, formulario.senha);
            const loginDTO: LoginDTO = await realizarLogin(formulario);

            console.log('Dados do login:', loginDTO);

            salvarTokenAcesso(loginDTO.token);
            salvarCodigoPessoaLogado(loginDTO.codigoPessoa);
            salvarTipoPessoaLogado(loginDTO.tipoPessoa);

            if (isNotEmpty(usuario) && isNotEmpty(loginDTO.token)) {
                navegarParaTela(RotaPrincipalEnum.TABS);
            }
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Erro ao entrar! - ' + error.message });
        } finally {
            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            {loading ? (
                <Loader/>
            ) : (
                <View style={styles.container}>
                    <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                        <Image source={require("../../../assets/images/logos/logo-primo-branco.png")} style={styles.logo} />
                        <Text style={styles.versao}> 0.0.1 </Text>
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.formulario}>
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

                                <View style={styles.containerEsqueciSenha}>
                                    <TouchableOpacity onPress={() => navegarParaTela(RotaPrincipalEnum.ESQUECI_SENHA)}>
                                        <Text style={styles.esqueciSenha}> Esqueci minha senha </Text>
                                    </TouchableOpacity>
                                </View>
                            
                                <Animatable.View animation='fadeInLeft' delay={700}>
                                    <BotaoPrincipal label="Entrar" onPress={handleSubmit(entrar)} />
                                </Animatable.View>

                                <Divider texto="OU" />
                                    
                                <Text style={styles.infoCadastro}> Ainda não possui cadastro? Cadastre-se</Text>

                                <Animatable.View animation='fadeInRight' delay={700}>
                                    <BotaoSecundario label="Cadastrar" onPress={() => navegarParaTela(RotaPrincipalEnum.OPCAO_CADASTRO)} />
                                </Animatable.View>
                            </View>
                        </ScrollView>
                    </Animatable.View>
                </View>
            )}
        </TouchableWithoutFeedback>
    );
}