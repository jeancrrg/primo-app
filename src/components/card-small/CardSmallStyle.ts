import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        backgroundColor: Colors.branco,
        justifyContent: "center"
    },
    icone: {
        color: Colors.preto,
        fontSize: 26,
        padding: 4,
        marginRight: 10
    },
    containerInfoCard: {
        flex: 1,
        justifyContent:"center"
    },
    informacao: {
        fontSize: 14,
        fontFamily: "Mulish-Medium"
    },
    tipoInformacao: {
        fontSize: 14,
        fontFamily: "Mulish-Light",
        color: Colors.cinzaEscuro
    }
})