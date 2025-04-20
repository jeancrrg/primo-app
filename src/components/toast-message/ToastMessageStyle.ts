import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: Colors.branco,
        padding: 10,
        borderRadius: 10,
        borderLeftWidth: 8,
        shadowColor: Colors.preto,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: "center",
        marginHorizontal: 20
    },
    containerTexto: {
        flex: 1,
        paddingLeft: 10
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 16,
        color: Colors.cinzaEscuro2
    },
    subtitulo: {
        fontSize: 14,
        color: Colors.cinzaEscuro
    }
});
