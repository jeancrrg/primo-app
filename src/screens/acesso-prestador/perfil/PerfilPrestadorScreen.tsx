import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./PerfilPrestadorScreenStyle";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalAvatar from "../../../components/modal-avatar/ModalAvatar";
import CardSmall from "../../../components/card-small/CardSmall";
import BotaoSegmentado from "../../../components/botao-segmentado/BotaoSegmentado";
import Toast from "react-native-toast-message";
import { PrestadorServico } from "../../../models/cadastro/PrestadorServico.model";
import Header from "../../../components/header/Header";
import { Colors } from "../../../../assets/styles/Colors";
import { navegarParaTela } from "../../../utils/NavigationUtil";
import { RotaPrincipalEnum } from "../../../models/enum/RotaPrincipal.enum";
import { atualizarAvatarPrestador, buscarPrestadorServico, inativarPrestador } from "../../../services/PrestadorServico.service";
import { obterCodigoPessoaLogado } from "../../../services/Storage.service";
import { formatarCNPJ, formatarNome, formatarTelefone } from "../../../utils/FormatterUtil";
import { MensagemErroDTO } from "../../../models/dto/MensagemErroDTO.model";
import Loader from "../../../components/loader/Loader";
import { sairAplicativo } from "../../../utils/FirebaseUtil";

export default function PerfilPrestadorScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [prestadorServico, setPrestadorServico] = useState<PrestadorServico>();
    const [mostrarModalAvatar, setMostrarModalAvatar] = useState<boolean>(false);
    const [opcoesBotaoSegmentado] = useState<string[]>(['Dados', 'Serviço']);
    const [opcaoBotaoSelecionado, setOpcaoBotaoSelecionado] = useState<string>('Dados');

    useEffect(() => {
        carregarPrestadorServico();
    }, []);

    async function carregarPrestadorServico(): Promise<void> {
        try {
            setLoading(true);
            const codigoPessoa: number | null = await obterCodigoPessoaLogado();
            if (codigoPessoa === null) {
                Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Código do prestador de serviço não encontrado!'});
            } else {
                const prestadorServico: PrestadorServico = await buscarPrestadorServico(codigoPessoa);
                setPrestadorServico(prestadorServico);
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
            prestadorServico!.codigoAvatar = codigoAvatar;
            setPrestadorServico(prestadorServico);
            atualizarAvatarPrestador(prestadorServico!.codigo, prestadorServico!.codigoAvatar);
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
            await inativarPrestador(prestadorServico!.codigo);
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
                            <Text style={styles.nome}> {formatarNome(prestadorServico?.nome)} </Text>
                        </View>

                        <View style={styles.containerAvatar}>
                            <TouchableOpacity onPress={() => setMostrarModalAvatar(true)}>
                                <Image source={obterImagemAvatar(prestadorServico?.codigoAvatar)} style={styles.avatar} />
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
                                {opcaoBotaoSelecionado == 'Serviço' ? (
                                    <View>
                                        <CardSmall nomeIcone="map-marker-outline" tipoInformacao="Endereço" informacao={formatarNome(prestadorServico?.endereco.logradouro)} />
                                        <CardSmall nomeIcone="car-wrench" tipoInformacao="Serviço" informacao={formatarNome(prestadorServico?.descricaoTipoServico)} />
                                        <CardSmall nomeIcone="currency-usd" tipoInformacao="Valor" informacao={prestadorServico?.valorServico.toString()} />
                                    </View>
                                ) : (
                                    <View>
                                        <CardSmall nomeIcone="card-account-details-outline" tipoInformacao="Cnpj" informacao={formatarCNPJ(prestadorServico?.cnpj)} />
                                        <CardSmall nomeIcone="phone" tipoInformacao="Telefone" informacao={formatarTelefone(prestadorServico?.telefone)} />
                                        <CardSmall nomeIcone="email-outline" tipoInformacao="Email" informacao={prestadorServico?.email} />
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