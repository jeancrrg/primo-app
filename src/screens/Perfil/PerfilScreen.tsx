import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./PerfilScreenStyle";
import CardSmall from "../../components/card-small/CardSmall";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RotasStack } from "../../models/interfaces/Interface";

export default function PerfilScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();

    function confirmarSaidaAplicativo(): void {
        Alert.alert(
            "Aviso",
            "Deseja realmente sair do aplicativo?",
            [
                {
                    text: "SIM",
                    onPress: () => navigation.replace('login'),
                },
                {
                    text: "NÃO",
                    onPress: () => {},
                    style: "cancel",
                }
            ],
            {cancelable: true}
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> Perfil </Text>

            <View style={styles.containerPerfil}>
                <View style={styles.cardUsuario}>
                    <View style={styles.containerNome}>
                        <Text style={styles.nome}> Jean Carlo Rabelo Garcia </Text>
                    </View>

                    <View style={styles.containerAvatar}>
                        <Image source={require("../../../assets/images/avatares/avatar-jean.png")} style={styles.avatar} />
                    </View>
                </View>

                <CardSmall nomeIcone="phone" tipoInformacao="Telefone:" informacao="(34) 9 9196 - 8327" />

                <CardSmall nomeIcone="email-outline" tipoInformacao="Email:" informacao="jeancrg@gmail.com" />

                <CardSmall nomeIcone="car-outline" tipoInformacao="Modelo Veículo:" informacao="Astra GL" />

                <CardSmall nomeIcone="calendar-range" tipoInformacao="Ano Veículo:" informacao="2001" />

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