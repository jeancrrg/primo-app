import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./PerfilScreenStyle";
import CardSmall from "../../components/card-small/CardSmall";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RotaStack } from "../../models/types/RotaStack";
import { useEffect, useState } from "react";
import { UsuarioCliente } from "../../models/cadastro/UsuarioCliente";
import { buscarUsuarioCliente } from "../../services/Usuario.service";
import Toast from "react-native-toast-message";
import { obterCodigoUsuarioLogado, removerCodigoUsuarioLogado } from "../../services/Autenticacao.service";
import { removerTokenAcesso } from "../../services/TokenAcesso.service";

export default function PerfilScreen() {

    const [usuario, setUsuario] = useState<UsuarioCliente>();

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

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
                        <Image source={require("../../../assets/images/avatares/avatar-jean.png")} style={styles.avatar} />
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
    );
}