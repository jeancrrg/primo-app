import { Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { styles } from "./CadastroClienteScreenStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../assets/styles/Colors";
import { useState } from "react";
import Divider from "../../../components/divider/Divider";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import Input from "../../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validacoesFormularioCliente } from "../../../validations/ClienteValidation";
import { FormularioCadastroCliente } from "../../../models/interfaces/formularios/FormularioCadastroCliente.interface";
import { formatarCPF, formatarTelefone } from "../../../utils/FormatterUtil";
import Toast from "react-native-toast-message";
import Loader from "../../../components/loader/Loader";
import { RotaPrincipalEnum } from "../../../models/enum/RotaPrincipal.enum";
import { navegarParaTela, voltarTela } from "../../../utils/NavigationUtil";
import { cadastrarCliente } from "../../../services/Cliente.service";
import { MensagemErroDTO } from "../../../models/dto/MensagemErroDTO.model";
import { cadastrarUsuarioAutenticacao, tratarErroFirebase } from "../../../utils/FirebaseUtil";
import { FirebaseError } from "firebase/app";

export default function CadastroClienteScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormularioCadastroCliente>({
        resolver: yupResolver(validacoesFormularioCliente)
    });

    async function cadastrar(formulario: FormularioCadastroCliente): Promise<void> {
        try {
            setLoading(true);
            await cadastrarCliente(formulario);
            await cadastrarUsuarioAutenticacao(formulario.email, formulario.senha);
            Toast.show({ type: 'sucesso', text1: 'SUCESSO', text2: 'Usuário cadastrado com sucesso! Acesse sua conta!'});
            navegarParaTela(RotaPrincipalEnum.LOGIN);
        } catch (error: any) {
            if ((error as FirebaseError)?.code) {
                tratarErroFirebase(error);
            } else {
                tratarErroGeral(error);
            }
        } finally {
            setLoading(false);
        }
    }

    function tratarErroGeral(error: any): void {
        const mensagemErroDTO: MensagemErroDTO = error?.response?.data;
        if (mensagemErroDTO?.codigoErro == 409) {
            Toast.show({ type: 'aviso', text1: 'AVISO', text2: mensagemErroDTO?.mensagem });
        } else {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Erro ao realizar o login! - ' + (mensagemErroDTO?.mensagem 
                                                                || 'Ocorreu um erro inesperado!') });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            {loading ? (
                <Loader/>
            ) : (
                <View style={styles.container}>
                    <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                        <TouchableOpacity style={styles.botaoVoltar} onPress={() => voltarTela()}>
                            <MaterialCommunityIcons name='arrow-left-circle-outline' color={Colors.branco} size={40} />
                        </TouchableOpacity>

                        <Image source={require("../../../../assets/images/logos/logo-primo-branco.png")} style={styles.logo} />
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.formulario}>
                                <Text style={styles.titulo}> Cadastro Cliente </Text>
                            
                                <Input
                                    control={control}
                                    name='nome'
                                    label='Nome'
                                    maxLength={50}
                                    nomeIconeEsquerda='clipboard-text-outline'
                                    errosValidacao={errors.nome?.message}
                                />

                                <Input
                                    control={control}
                                    name='telefone'
                                    label='Telefone'
                                    maxLength={15}
                                    nomeIconeEsquerda='phone'
                                    errosValidacao={errors.telefone?.message}
                                    mascara={formatarTelefone}
                                    tipoTeclado='numeric'
                                />

                                <Input
                                    control={control}
                                    name='cpf'
                                    label='Cpf'
                                    maxLength={14}
                                    nomeIconeEsquerda='card-account-details-outline'
                                    errosValidacao={errors.cpf?.message}
                                    mascara={formatarCPF}
                                    tipoTeclado='numeric'
                                />

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

                                <Divider texto="Veículo"/>

                                <Input
                                    control={control}
                                    name='modeloVeiculo'
                                    label='Modelo Veículo'
                                    maxLength={50}
                                    nomeIconeEsquerda='car-outline'
                                    errosValidacao={errors.modeloVeiculo?.message}
                                />

                                <Input
                                    control={control}
                                    name='anoVeiculo'
                                    label='Ano Veículo'
                                    maxLength={4}
                                    nomeIconeEsquerda='calendar-range'
                                    errosValidacao={errors.anoVeiculo?.message}
                                    tipoTeclado='numeric'
                                />

                                <Animatable.View animation='fadeInLeft' delay={700} style={styles.containerBotaoCadastro}>
                                    <BotaoPrincipal label="Cadastrar" onPress={handleSubmit(cadastrar)} />
                                </Animatable.View>
                            </View>
                        </ScrollView>
                    </Animatable.View>
                </View>
            )}
        </TouchableWithoutFeedback>
    );
}