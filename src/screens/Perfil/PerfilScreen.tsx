import { Alert, FlatList, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./PerfilScreenStyle";
import CardSmall from "../../components/card-small/CardSmall";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RotaStack } from "../../models/types/RotaStack";
import { useEffect, useMemo, useRef, useState } from "react";
import { Cliente } from "../../models/cadastro/Cliente";
import Toast from "react-native-toast-message";
import { obterCodigoPessoaLogado, removerCodigoPessoaLogado } from "../../services/Autenticacao.service";
import { removerTokenAcesso } from "../../services/TokenAcesso.service";
import BottomSheet from "@gorhom/bottom-sheet";
import { Colors } from "../../../assets/styles/Colors";
import { Avatar } from "../../models/cadastro/Avatar";
import { Surface } from "react-native-paper";
import { buscarAvatares } from "../../services/Avatar.service";
import { isNotEmpty } from "../../utils/ValidationUtil";
import { atualizarAvatarCliente, buscarCliente } from "../../services/Cliente.service";

export default function PerfilScreen(): JSX.Element {

    const [cliente, setCliente] = useState<Cliente>();
    const [mostrarOpcoesAvatares, setMostrarOpcoesAvatares] = useState<boolean>(false);
    const [listaAvatares, setListaAvatares] = useState<Avatar[]>();

    const imagensAvatares: { [key: string]: any } = {
        'sem-avatar.png': require('../../../assets/images/avatares/sem-avatar.png'),
        'avatar-jean.png': require('../../../assets/images/avatares/avatar-jean.png'),
        'avatar-1.png': require('../../../assets/images/avatares/avatar-1.png'),
        'avatar-2.png': require('../../../assets/images/avatares/avatar-2.png'),
        'avatar-3.png': require('../../../assets/images/avatares/avatar-3.png'),
        'avatar-4.png': require('../../../assets/images/avatares/avatar-4.png'),
        'avatar-5.png': require('../../../assets/images/avatares/avatar-5.png'),
    };

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['50%'], []);

    useEffect(() => {
        buscarInformacoesUsuario();
        carregarAvatares();
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

    async function carregarAvatares(): Promise<void> {
        try {
            const avatares: Avatar[] = await buscarAvatares();
            setListaAvatares(avatares.reverse());
        } catch(error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    function abrirOpcoesAvatares(): void {
        setMostrarOpcoesAvatares(true);
        bottomSheetRef.current?.expand();
    }

    function fecharOpcoesAvatares(): void {
        setMostrarOpcoesAvatares(false);
        bottomSheetRef.current?.close();   
    }

    function renderAvatar(avatar: Avatar): JSX.Element {
        const imagem = imagensAvatares[avatar.urlImagem];
        return (
            <TouchableOpacity onPress={() => selecionarAvatar(avatar)}>
                <Image source={imagem} style={styles.avatarOpcao} />
            </TouchableOpacity>
        );
    }

    async function selecionarAvatar(avatar: Avatar): Promise<void> {
        cliente!.codigoAvatar = avatar.codigo;
        await atualizarAvatarCliente(cliente!.codigoPessoa, cliente!.codigoAvatar);
        fecharOpcoesAvatares();
    }

    function obterImagemPeloCodigoAvatar(codigoAvatar: number | undefined): any {
        const avatar: Avatar | undefined = listaAvatares?.find(avatar => avatar.codigo === codigoAvatar);
        if (isNotEmpty(avatar)) {
            return imagensAvatares[avatar!.urlImagem];
        }
        return imagensAvatares['sem-avatar.png'];
    }

    function confirmarSaidaAplicativo(): void {
        Alert.alert(
            "Aviso",
            "Deseja realmente sair do aplicativo?",
            [
                {
                    text: "SIM",
                    onPress: () => sairAplicativo(),
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

    function sairAplicativo(): void {
        removerTokenAcesso();
        removerCodigoPessoaLogado();
        navigation.replace('login');
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.containerFundoAzul}>
                    <Text style={styles.titulo}> Perfil </Text>
                </View>

                <View style={styles.containerPerfil}>
                    <View style={styles.cardUsuario}>
                        <View style={styles.containerNome}>
                            <Text style={styles.nome}> {cliente?.nome} </Text>
                        </View>

                        <View style={styles.containerAvatar}>
                            <TouchableOpacity onPress={() => abrirOpcoesAvatares()}>
                                <Image source={obterImagemPeloCodigoAvatar(cliente?.codigoAvatar)} style={styles.avatar} />
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

            {mostrarOpcoesAvatares && (
                <View style={styles.containerBottomSheet}>

                    {/* Fecha o Bottom Sheet ao clicar fora */}
                    <TouchableWithoutFeedback onPress={fecharOpcoesAvatares}>
                        <View style={styles.sombraBottomSheet} />
                    </TouchableWithoutFeedback>

                    <BottomSheet
                        ref={bottomSheetRef}
                        index={0}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onClose={() => fecharOpcoesAvatares()}
                        backgroundStyle={{ backgroundColor: Colors.cinzaClaro }}>

                        <Surface elevation={5} style={styles.containerEscolhaAvatares}>
                            <Text style={styles.tituloEscolhaAvatar}> Escolha seu avatar: </Text>

                            <FlatList
                                data={listaAvatares}
                                numColumns={3}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => renderAvatar(item)}
                                keyExtractor={(avatar) => avatar.codigo!.toString()}
                                columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 16 }}
                            />
                        </Surface>
                    </BottomSheet>
                </View>
            )}
        </View>
    );
}