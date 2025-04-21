import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24
    },
    containerBarraPesquisa: {
        marginVertical: 30
    },
    barraPesquisa: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.branco,
        padding: 10,
        borderRadius: 20,
        shadowColor: Colors.cinzaEscuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6,
    },
    iconeBarraPesquisa: {
        fontSize: 20
    },
    inputBarraPesquisa: {
        paddingHorizontal: 10,
        fontSize: 20,
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