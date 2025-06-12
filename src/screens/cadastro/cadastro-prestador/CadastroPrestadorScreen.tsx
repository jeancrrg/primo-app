import { Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./CadastroPrestadorScreenStyle";
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../assets/styles/Colors";
import { useEffect, useState } from "react";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import Input from "../../../components/input/Input";
import Divider from "../../../components/divider/Divider";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validacoesFormularioPrestador } from "../../../validations/PrestadorValidation";
import Loader from "../../../components/loader/Loader";
import { buscarTiposServico } from "../../../services/TipoServico.service";
import Picker from "../../../components/picker/Picker";
import { cadastrarUsuarioAutenticacao } from "../../../services/Autenticacao.service";
import Toast from "react-native-toast-message";
import { isEmpty } from "../../../utils/ValidationUtil";
import { formatarCNPJ, formatarTelefone } from "../../../utils/FormatterUtil";
import { TipoServico } from "../../../models/cadastro/TipoServico.model";
import { CadastroPrestadorDTO } from "../../../models/dto/CadastroPrestadorDTO.model";
import { FormularioCadastroPrestador } from "../../../models/interfaces/formularios/FormularioCadastroPrestador.interface";
import { navegarParaTela, voltarTela } from "../../../utils/NavigationUtil";
import { RotaPrincipalEnum } from "../../../models/enum/RotaPrincipal.enum";
import { cadastrarPrestador } from "../../../services/PrestadorServico.service";

export default function CadastroPrestadorScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);
    const [tipoServicoSelecionado, setTipoServicoSelecionado] = useState<TipoServico | null>(null);
    const [listaTiposServico, setListaTiposServico] = useState<TipoServico[]>([])

    const { control, handleSubmit, formState: { errors } } = useForm<FormularioCadastroPrestador>({
        resolver: yupResolver(validacoesFormularioPrestador)
    });

    useEffect(() => {
        carregarTiposServico();
    }, []);

    async function carregarTiposServico(): Promise<void> {
        try {
            setLoading(true);
            const listaTiposServico: TipoServico[] = await buscarTiposServico();
            setListaTiposServico(listaTiposServico);
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        } finally {
            setLoading(false);
        }
    }

    async function cadastrar(formulario: FormularioCadastroPrestador): Promise<void> {
        try {
            setLoading(true);
            if (isEmpty(tipoServicoSelecionado)) {
                Toast.show({ type: 'aviso', text1: 'AVISO', text2: 'Tipo de serviço não informado! Informe o tipo de serviço!'});

            } else {
                const cadastroPrestadorDTO: CadastroPrestadorDTO = await criarDtoCadastroPrestador(formulario);
                await cadastrarPrestador(cadastroPrestadorDTO);
                await cadastrarUsuarioAutenticacao(formulario.email, formulario.senha);
                Toast.show({ type: 'sucesso', text1: 'SUCESSO', text2: 'Usuário cadastrado com sucesso! Acesse sua conta!'});
                navegarParaTela(RotaPrincipalEnum.LOGIN);
            }
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        } finally {
            setLoading(false);
        }
    }

    async function criarDtoCadastroPrestador(formulario: FormularioCadastroPrestador): Promise<CadastroPrestadorDTO> {
        const cadastroPrestadorDTO: CadastroPrestadorDTO = {
            nome: formulario.nome,
            telefone: formulario.telefone,
            email: formulario.email,
            senha: formulario.senha,
            cnpj: formulario.cnpj,
            endereco: formulario.endereco,
            codigoTipoServico: tipoServicoSelecionado?.codigo,
            valorServico: formulario.valorServico
        };
        return cadastroPrestadorDTO;
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
                                <Text style={styles.titulo}> Cadastro Prestador </Text>

                                <Input
                                    control={control}
                                    name='nome'
                                    label='Nome'
                                    maxLength={100}
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

                                <Divider texto="Serviço"/>

                                <Input
                                    control={control}
                                    name='cnpj'
                                    label='Cnpj'
                                    maxLength={18}
                                    nomeIconeEsquerda='card-account-details-outline'
                                    errosValidacao={errors.cnpj?.message}
                                    mascara={formatarCNPJ}
                                    tipoTeclado='numeric'
                                />

                                <Input
                                    control={control}
                                    name='endereco'
                                    label='Endereço'
                                    maxLength={120}
                                    nomeIconeEsquerda='map-marker-outline'
                                    errosValidacao={errors.endereco?.message}
                                />

                                <Picker
                                    label='Tipos Serviço'
                                    icone='car-wrench'
                                    valorSelecionado={tipoServicoSelecionado}
                                    listaDados={listaTiposServico}
                                    getLabel={(item) => item.descricao || ''}
                                    onSelecionar={(item) => setTipoServicoSelecionado(item)}
                                />

                                <Input
                                    control={control}
                                    name='valorServico'
                                    label='Valor Serviço'
                                    maxLength={6}
                                    nomeIconeEsquerda='currency-usd'
                                    errosValidacao={errors.valorServico?.message}
                                    tipoTeclado='numeric'
                                />

                                <Animatable.View animation='fadeInLeft' delay={700}>
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