import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./PerfilPrestadorScreenStyle";
import { obterImagemAvatar } from "../../../services/Avatar.service";
import { useState } from "react";
import { sairAplicativo } from "../../../services/Autenticacao.service";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ModalAvatar from "../../../components/modal-avatar/ModalAvatar";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotaStack } from "../../../models/types/RotaStack";

export default function PerfilPrestadorScreen(): JSX.Element {

    const [mostrarModalAvatar, setMostrarModalAvatar] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<RotaStack>>();

    async function selecionarAvatar(codigoAvatar: number): Promise<void> {
        console.log('Avatar selecionado: ', codigoAvatar);
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
                            <Text style={styles.nome}> Junim </Text>
                        </View>

                        <View style={styles.containerAvatar}>
                            <TouchableOpacity onPress={() => setMostrarModalAvatar(true)}>
                                <Image source={obterImagemAvatar(1)} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                    </View>


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