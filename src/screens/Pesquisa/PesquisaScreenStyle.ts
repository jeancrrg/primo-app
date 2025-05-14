import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24
    },
    barraPesquisa: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.branco,
        padding: 10,
        marginVertical: 30,
        borderRadius: 20,
        shadowColor: Colors.cinzaEscuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6
    },
    iconeBarraPesquisa: {
        fontSize: 20,
        marginRight: 10,
        color: Colors.cinzaEscuro
    },
    inputBarraPesquisa: {
        flex: 1,
        fontSize: 18,
        color: Colors.cinzaEscuro
    },
    containerAnimacao: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 150
    },
    animacao: {
        height: 300
    },
    textoAnimacao: {
        fontSize: 16
    }
});