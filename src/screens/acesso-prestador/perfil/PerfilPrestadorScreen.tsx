import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./PerfilPrestadorScreenStyle";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import { useEffect, useState } from "react";
import { obterCodigoPessoaLogado, sairAplicativo } from "../../../services/Autenticacao.service";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalAvatar from "../../../components/modal-avatar/ModalAvatar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotaStack } from "../../../models/types/RotaStack";
import CardSmall from "../../../components/card-small/CardSmall";
import BotaoSegmentado from "../../../components/botao-segmentado/BotaoSegmentado";
import Toast from "react-native-toast-message";
import { atualizarAvatarPrestador, buscarPrestadorServico } from "../../../services/Prestador.service";
import { PrestadorServico } from "../../../models/cadastro/PrestadorServico";
import Header from "../../../components/header/Header";

export default function PerfilPrestadorScreen(): JSX.Element {

    const [prestadorServico, setPrestadorServico] = useState<PrestadorServico>();
    const [mostrarModalAvatar, setMostrarModalAvatar] = useState<boolean>(false);
    const [opcoesBotaoSegmentado, setOpcoesBotaoSegmentado] = useState<string[]>(['Dados', 'Serviço']);
    const [opcaoBotaoSelecionado, setOpcaoBotaoSelecionado] = useState<string>('Dados');

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

    useEffect(() => {
        carregarPrestadorServico();
    }, []);

    async function carregarPrestadorServico(): Promise<void> {
        try {
            const codigoPessoa: number | null = await obterCodigoPessoaLogado();
            if (codigoPessoa === null) {
                Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Código do prestador de serviço não encontrado!'});
            } else {
                const prestadorServico: PrestadorServico = await buscarPrestadorServico(codigoPessoa);
                setPrestadorServico(prestadorServico);
            }
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    async function selecionarAvatar(codigoAvatar: number): Promise<void> {
        prestadorServico!.codigoAvatar = codigoAvatar;
        atualizarAvatarPrestador(prestadorServico!.codigo, prestadorServico!.codigoAvatar);
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
        navigation.replace('login');
    }

    return (
        <View style={styles.container}>
            <Header titulo="Perfil" />

            <View style={styles.containerPerfil}>
                <View style={styles.containerNome}>
                    <Text style={styles.nome}> {prestadorServico?.nome} </Text>
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
                                <CardSmall nomeIcone="car-wrench" tipoInformacao="Serviço" informacao={prestadorServico?.descricaoTipoServico} />
                                <CardSmall nomeIcone="currency-usd" tipoInformacao="Valor" informacao={prestadorServico?.valorServico.toString()} />
                            </View>
                        ) : (
                            <View>
                                <CardSmall nomeIcone="phone" tipoInformacao="Telefone" informacao={prestadorServico?.telefone} />
                                <CardSmall nomeIcone="email-outline" tipoInformacao="Email" informacao={prestadorServico?.email} />
                                <CardSmall nomeIcone="briefcase-check-outline" tipoInformacao="Cnpj" informacao={prestadorServico?.cnpj} />
                                <CardSmall nomeIcone="map-marker-outline" tipoInformacao="Endereço" informacao={prestadorServico?.endereco.logradouro} />
                            </View>
                        )}

                        <View style={styles.containerLogo}>
                            <Text style={styles.logo}> Primo </Text>
                            <TouchableOpacity style={styles.containerSaidaApp} onPress={() => confirmarSaidaAplicativo()}>
                                <Text style={styles.textoSaidaApp}> sair do aplicativo </Text>
                                <MaterialCommunityIcons name='logout-variant' style={styles.iconeSaidaApp} />
                            </TouchableOpacity>
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
    );
}