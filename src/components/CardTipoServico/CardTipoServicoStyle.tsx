import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    botao: {
        padding: 10,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 10,
        borderColor: Colors.cor_primaria,
        borderWidth: 1,
        width: 102,
        height: 102,
        justifyContent: "center",
        alignItems: "center"
    },
    icone: {
        flex: 1,
        marginTop: 8,
        fontSize: 36,
        color: Colors.cor_primaria
    },
    texto: {
        color: Colors.cor_primaria,
        fontSize: 14,
        fontFamily: "Mulish-Medium",
        textAlign: "center"
    }
});