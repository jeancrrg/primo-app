import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    botao: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.corPrimaria,
        borderRadius: 20,
        marginTop: 20
    },
    labelBotao: {
        color: Colors.branco,
        fontSize: 20,
        fontWeight: 'bold'
    }
})