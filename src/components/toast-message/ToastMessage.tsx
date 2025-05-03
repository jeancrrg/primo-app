import { Text, View } from "react-native";
import { styles } from "./ToastMessageStyle";
import { PropsToastMessage } from "../../models/interfaces/props/PropsToastMessage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../assets/styles/Colors";

export default function ToastMessage({ type, text1, text2 }: PropsToastMessage) {

    const iconesToast = {
        info: { nome: 'information', cor: Colors.azulInfo },
        aviso: { nome: 'alert', cor: Colors.amareloAviso },
        successo: { nome: 'check-circle', cor: Colors.verdeSucesso },
        erro: { nome: 'alert-circle', cor: Colors.vermelhoErro }
    };

    const icone = iconesToast[type];

    return (
        <View style={[styles.container, { borderLeftColor: icone.cor }]}>
            <MaterialCommunityIcons name={icone.nome} color={icone.cor} size={35} />

            <View style={styles.containerTexto}>
                <Text style={styles.titulo}> {text1} </Text>
                <Text style={styles.subtitulo}> {text2} </Text>
            </View>
        </View>
    );
}