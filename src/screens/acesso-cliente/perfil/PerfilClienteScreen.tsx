import { Alert, FlatList, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./PerfilClienteScreenStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import BottomSheet from "@gorhom/bottom-sheet";
import { Surface } from "react-native-paper";
import { Cliente } from "../../../models/cadastro/Cliente";
import { Avatar } from "../../../models/cadastro/Avatar";
import { RotaStack } from "../../../models/types/RotaStack";
import { obterCodigoPessoaLogado, removerCodigoPessoaLogado, removerTipoPessoaLogado, sairAplicativo } from "../../../services/Autenticacao.service";
import { atualizarAvatarCliente, buscarCliente } from "../../../services/Cliente.service";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import { removerTokenAcesso } from "../../../services/TokenAcesso.service";
import CardSmall from "../../../components/card-small/CardSmall";
import { Colors } from "../../../../assets/styles/Colors";
import ModalAvatar from "../../../components/modal-avatar/ModalAvatar";

export default function PerfilClienteScreen(): JSX.Element {

    const [cliente, setCliente] = useState<Cliente>();
    const [mostrarModalAvatar, setMostrarModalAvatar] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

    useEffect(() => {
        buscarInformacoesUsuario();
    }, []);

    async function buscarInformacoesUsuario(): Promise<void> {
        try {
            const codigoPessoa: number | null = await obterCodigoPessoaLogado();
            if (codigoPessoa === null) {
                Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Código do cliente não encontrado!'});
            } else {
                const cliente: Cliente = await buscarCliente(codigoPessoa);
                setCliente(cliente);
            }
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    async function selecionarAvatar(codigoAvatar: number): Promise<void> {
        cliente!.codigoAvatar = codigoAvatar;
        await atualizarAvatarCliente(cliente!.codigoPessoa, cliente!.codigoAvatar);
    }

    function confirmarSaidaAplicativo(): void {
        Alert.alert(
            "Aviso",
            "Deseja realmente sair do aplicativo?",
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
            <View style={styles.containerConteudo}>
                <View style={styles.containerFundoAzul}>
                    <Text style={styles.titulo}> Perfil </Text>
                </View>

                <View style={styles.containerPerfil}>
                    <View style={styles.cardUsuario}>
                        <View style={styles.containerNome}>
                            <Text style={styles.nome}> {cliente?.nome} </Text>
                        </View>

                        <View style={styles.containerAvatar}>
                            <TouchableOpacity onPress={() => setMostrarModalAvatar(true)}>
                                <Image source={obterImagemAvatar(cliente?.codigoAvatar)} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CardSmall nomeIcone="phone" tipoInformacao="Telefone:" informacao={cliente?.telefone} />

                    <CardSmall nomeIcone="email-outline" tipoInformacao="Email:" informacao={cliente?.email} />

                    <CardSmall nomeIcone="car-outline" tipoInformacao="Modelo Veículo:" informacao={cliente?.modeloVeiculo} />

                    <CardSmall nomeIcone="calendar-range" tipoInformacao="Ano Veículo:" informacao={cliente?.anoVeiculo?.toString()} />

                    <View style={styles.containerLogo}>
                        <Text style={styles.logo}> Primo </Text>

                        <TouchableOpacity style={styles.containerSaidaApp} onPress={() => confirmarSaidaAplicativo()}>
                            <Text style={styles.textoSaidaApp}> sair do aplicativo </Text>
                            <MaterialCommunityIcons name='logout-variant' style={styles.iconeSaidaApp} />
                        </TouchableOpacity>
                    </View>
                </View>
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