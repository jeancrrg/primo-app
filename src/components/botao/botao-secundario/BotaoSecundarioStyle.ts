import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    botao: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.corPrimaria,
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 20
    },
    labelBotao: {
        color: Colors.corPrimaria,
        fontSize: 20,
        fontWeight: 'bold'
    }
})