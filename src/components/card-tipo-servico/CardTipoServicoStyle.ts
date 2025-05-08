import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    botao: {
        backgroundColor: Colors.branco,
        padding: 10,
        marginHorizontal: 8,
        marginVertical: 8,
        borderRadius: 20,
        width: 150,
        height: 102,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: Colors.cinzaEscuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4
    },
    icone: {
        flex: 1,
        marginTop: 8,
        fontSize: 36,
        color: Colors.corPrimaria
    },
    texto: {
        color: Colors.corPrimaria,
        fontSize: 16,
        textAlign: "center",
        fontWeight: 'bold'
    }
});