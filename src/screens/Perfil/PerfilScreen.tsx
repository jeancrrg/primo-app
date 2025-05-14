import { Alert, FlatList, Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./PerfilScreenStyle";
import CardSmall from "../../components/card-small/CardSmall";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RotaStack } from "../../models/types/RotaStack";
import { useEffect, useMemo, useRef, useState } from "react";
import { UsuarioCliente } from "../../models/cadastro/UsuarioCliente";
import { buscarUsuarioCliente } from "../../services/Usuario.service";
import Toast from "react-native-toast-message";
import { obterCodigoUsuarioLogado, removerCodigoUsuarioLogado } from "../../services/Autenticacao.service";
import { removerTokenAcesso } from "../../services/TokenAcesso.service";
import BottomSheet from "@gorhom/bottom-sheet";
import { Colors } from "../../../assets/styles/Colors";
import { Avatar } from "../../models/cadastro/Avatar";
import { Surface } from "react-native-paper";

export default function PerfilScreen(): JSX.Element {

    const [mostrarOpcoesAvatares, setMostrarOpcoesAvatares] = useState<boolean>(false);
    const [codigoAvatarSelecionado, setCodigoAvatarSelecionado] = useState<number>();

    const listaAvatares: Avatar[] = [
        { codigo: 1, urlImagem: 'assets/images/avatares/avatar-1.png' },
        { codigo: 2, urlImagem: 'assets/images/avatares/avatar-2.png' },
        { codigo: 3, urlImagem: 'assets/images/avatares/avatar-3.png' },
        { codigo: 4, urlImagem: 'assets/images/avatares/avatar-4.png' },
        { codigo: 5, urlImagem: 'assets/images/avatares/avatar-5.png' },
        { codigo: 6, urlImagem: 'assets/images/avatares/avatar-jean.png' },
    ];

    const imagensAvatares: { [key: string]: any } = {
        'assets/images/avatares/avatar-1.png': require('../../../assets/images/avatares/avatar-1.png'),
        'assets/images/avatares/avatar-2.png': require('../../../assets/images/avatares/avatar-2.png'),
        'assets/images/avatares/avatar-3.png': require('../../../assets/images/avatares/avatar-3.png'),
        'assets/images/avatares/avatar-4.png': require('../../../assets/images/avatares/avatar-4.png'),
        'assets/images/avatares/avatar-5.png': require('../../../assets/images/avatares/avatar-5.png'),
        'assets/images/avatares/avatar-jean.png': require('../../../assets/images/avatares/avatar-jean.png'),
    };

    const [usuario, setUsuario] = useState<UsuarioCliente>();

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['50%'], []);

    useEffect(() => {
        buscarInformacoesUsuario();
    }, []);

    async function buscarInformacoesUsuario(): Promise<void> {
        try {
            const codigoUsuario: number | null = await obterCodigoUsuarioLogado();
            if (codigoUsuario === null) {
                Toast.show({ type: 'erro', text1: 'ERRO', text2: 'Código do usuário não encontrado!'});
            } else {
                const usuarioCliente: UsuarioCliente = await buscarUsuarioCliente(codigoUsuario);
                setUsuario(usuarioCliente);
            }
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    function abrirOpcoesAvatares(): void {
        setMostrarOpcoesAvatares(true);
        bottomSheetRef.current?.expand();
    }

    function fecharOpcoesAvatares(): void {
        setMostrarOpcoesAvatares(false);
        setCodigoAvatarSelecionado(undefined);
        bottomSheetRef.current?.close();   
    }

    function renderAvatar(item: any): JSX.Element {
        const imagem = imagensAvatares[item.urlImagem];
        return (
            <TouchableOpacity>
                <Image source={imagem} style={styles.avatarOpcao} />
            </TouchableOpacity>
        );
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
        removerCodigoUsuarioLogado();
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
                            <Text style={styles.nome}> {usuario?.nome} </Text>
                        </View>

                        <View style={styles.containerAvatar}>
                            <TouchableOpacity onPress={() => abrirOpcoesAvatares()}>
                                <Image source={require("../../../assets/images/avatares/avatar-jean.png")} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CardSmall nomeIcone="phone" tipoInformacao="Telefone:" informacao={usuario?.telefone} />

                    <CardSmall nomeIcone="email-outline" tipoInformacao="Email:" informacao={usuario?.email} />

                    <CardSmall nomeIcone="car-outline" tipoInformacao="Modelo Veículo:" informacao={usuario?.modeloVeiculo} />

                    <CardSmall nomeIcone="calendar-range" tipoInformacao="Ano Veículo:" informacao={usuario?.anoVeiculo?.toString()} />

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
                                keyExtractor={(item) => item.codigo!.toString()}
                                columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 16 }}
                            />
                        </Surface>
                    </BottomSheet>
                </View>
            )}
        </View>
    );
}