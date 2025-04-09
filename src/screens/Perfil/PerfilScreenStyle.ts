import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 120,
        paddingHorizontal: 24
    },
    titulo: {
        fontSize: 34,
        fontFamily: "Mulish-Medium",
        color: Colors.corPrimaria,
        marginVertical: 30
    },
    containerPerfil: {
        flex: 1
    },
    cardUsuario: {
        flexDirection: "row",
        borderRadius: 20,
        marginBottom: 25,
        backgroundColor: Colors.branco,
        padding: 16
    },
    containerNome: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal:16
    },
    nome: {
        fontSize: 21,
        fontFamily: "Mulish-Medium",
    },
    containerAvatar: {
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72
    },
    avatar: {
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72
    },
    containerLogo: {
        flex: 1,
        alignItems: "center"
    },
    logo: {
        fontSize: 34,
        fontFamily: "Mulish-Medium",
        color: Colors.cinzaMedio
    },
    containerSaidaApp: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center"
    },
    textoSaidaApp: {
        padding: 2,
        fontSize: 17,
        fontFamily: "Mulish-Medium"
    },
    iconeSaidaApp: {
        color: Colors.preto,
        fontSize: 24,
        padding: 2
    }
});