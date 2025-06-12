import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./PerfilClienteScreenStyle";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Cliente } from "../../../models/cadastro/Cliente.model";
import { atualizarAvatarCliente, buscarCliente, inativarCliente } from "../../../services/Cliente.service";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import CardSmall from "../../../components/card-small/CardSmall";
import ModalAvatar from "../../../components/modal-avatar/ModalAvatar";
import Header from "../../../components/header/Header";
import BotaoSegmentado from "../../../components/botao-segmentado/BotaoSegmentado";
import { RotaPrincipalEnum } from "../../../models/enum/RotaPrincipal.enum";
import { navegarParaTela } from "../../../utils/NavigationUtil";
import { Colors } from "../../../../assets/styles/Colors";
import { obterCodigoPessoaLogado } from "../../../services/Storage.service";
import { formatarCPF, formatarNome, formatarTelefone } from "../../../utils/FormatterUtil";
import { MensagemErroDTO } from "../../../models/dto/MensagemErroDTO.model";
import Loader from "../../../components/loader/Loader";
import { sairAplicativo } from "../../../utils/FirebaseUtil";

export default function PerfilClienteScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [cliente, setCliente] = useState<Cliente>();
    const [mostrarModalAvatar, setMostrarModalAvatar] = useState<boolean>(false);
    const [opcoesBotaoSegmentado] = useState<string[]>(['Dados', 'Veículo']);
    const [opcaoBotaoSelecionado, setOpcaoBotaoSelecionado] = useState<string>('Dados');

    useEffect(() => {
        carregarCliente();
    }, []);

    async function carregarCliente(): Promise<void> {
        try {
            setLoading(true);
            const codigoPessoa: number | null = await obterCodigoPessoaLogado();
            if (codigoPessoa === null) {
                Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Código do cliente não encontrado!'});
            } else {
                const cliente: Cliente = await buscarCliente(codigoPessoa);
                setCliente(cliente);
            }
        } catch (error: any) {
            const mensagemErroDTO: MensagemErroDTO = error?.response?.data;
            Toast.show({ type: 'erro', text1: 'ERRO', text2: (mensagemErroDTO?.mensagem || 'Ocorreu um erro inesperado!') });
        } finally {
            setLoading(false);
        }
    }

    async function selecionarAvatar(codigoAvatar: number): Promise<void> {
        try {
            setLoading(true);
            cliente!.codigoAvatar = codigoAvatar;
            setCliente(cliente);
            atualizarAvatarCliente(cliente!.codigo, cliente!.codigoAvatar);
        } catch (error: any) {
            const mensagemErroDTO: MensagemErroDTO = error?.response?.data;
            Toast.show({ type: 'erro', text1: 'ERRO', text2: (mensagemErroDTO?.mensagem || 'Ocorreu um erro inesperado!') });
        } finally {
            setLoading(false);
        }
    }

    function confirmarSaidaAplicativo(): void {
        Alert.alert("Aviso", "Deseja realmente sair do aplicativo?",
            [
                {
                    text: "SIM",
                    onPress: () => sair(),
                },
                {
                    text: "NÃO",
                    style: "cancel",
                    onPress: () => {}
                }
            ],
            {cancelable: true}
        );
    }

    function sair(): void {
        sairAplicativo();
        navegarParaTela(RotaPrincipalEnum.LOGIN);
    }

    function confirmarExclusaoConta(): void {
        Alert.alert("Aviso", "Deseja realmente excluir sua conta do aplicativo?",
            [
                {
                    text: "SIM",
                    onPress: () => excluir(),
                },
                {
                    text: "NÃO",
                    style: "cancel",
                    onPress: () => {}
                }
            ],
            {cancelable: true}
        );
    }

    async function excluir(): Promise<void> {
        try {
            setLoading(true);
            await inativarCliente(cliente!.codigo);
            Toast.show({ type: 'sucesso', text1: 'SUCESSO', text2: 'Conta excluída com sucesso!'});
            sairAplicativo();
            navegarParaTela(RotaPrincipalEnum.LOGIN);
        } catch (error: any) {
            const mensagemErroDTO: MensagemErroDTO = error?.response?.data;
            Toast.show({ type: 'erro', text1: 'ERRO', text2: (mensagemErroDTO?.mensagem || 'Ocorreu um erro inesperado!') });
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    <Header titulo="Perfil" />
                    <View style={styles.containerPerfil}>
                        <View style={styles.containerNome}>
                            <Text style={styles.nome}> {formatarNome(cliente?.nome)} </Text>
                        </View>

                        <View style={styles.containerAvatar}>
                            <TouchableOpacity onPress={() => setMostrarModalAvatar(true)}>
                                <Image source={obterImagemAvatar(cliente?.codigoAvatar)} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.containerInformacoes}>
                        <View style={styles.containerBotaoSegmentado}>
                            <BotaoSegmentado
                                opcoes={opcoesBotaoSegmentado}
                                opcaoSelecionada={opcaoBotaoSelecionado}
                                onSelecionar={setOpcaoBotaoSelecionado}
                            />
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                {opcaoBotaoSelecionado == 'Veículo' ? (
                                    <View>
                                        <CardSmall nomeIcone="car-outline" tipoInformacao="Modelo" informacao={formatarNome(cliente?.modeloVeiculo)} />
                                        <CardSmall nomeIcone="calendar-range" tipoInformacao="Ano" informacao={cliente?.anoVeiculo.toString()} />
                                    </View>
                                ) : (
                                    <View>
                                        <CardSmall nomeIcone="card-account-details-outline" tipoInformacao="Cpf" informacao={formatarCPF(cliente?.cpf)} />
                                        <CardSmall nomeIcone="phone" tipoInformacao="Telefone" informacao={formatarTelefone(cliente?.telefone)} />
                                        <CardSmall nomeIcone="email-outline" tipoInformacao="Email" informacao={cliente?.email} />
                                    </View>
                                )}

                                <View style={styles.containerBotoes}>
                                    <TouchableOpacity style={styles.botao} onPress={() => navegarParaTela(RotaPrincipalEnum.ESQUECI_SENHA)}>
                                        <MaterialCommunityIcons name='lock-check-outline' color={Colors.corPrimaria} size={28}/>
                                        <Text style={styles.textoBotao}> Alterar senha </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.botao} onPress={() => confirmarSaidaAplicativo()}>
                                        <MaterialCommunityIcons name='logout-variant' color={Colors.corPrimaria} size={28}/>
                                        <Text style={styles.textoBotao}> Sair Aplicativo </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.botao} onPress={() => confirmarExclusaoConta()}>
                                        <MaterialCommunityIcons name='delete-outline' color={Colors.vermelhoErro} size={28}/>
                                        <Text style={styles.textoBotao}> Excluir conta </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.containerLogo}>
                                    <Text style={styles.logo}> Primo </Text>
                                    <Text style={styles.versaoApp}> Versão 0.0.1 </Text>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    
                    {mostrarModalAvatar && (
                        <ModalAvatar
                            onClose={() => setMostrarModalAvatar(false)}
                            onSelecionarAvatar={(codigoAvatar) => {
                                selecionarAvatar(codigoAvatar);
                            }}
                        />
                    )}
                </View>
            )}
        </View>
    );
}