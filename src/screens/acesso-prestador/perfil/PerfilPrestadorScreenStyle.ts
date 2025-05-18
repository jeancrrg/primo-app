import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerPerfil: {
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: "row",
        backgroundColor: Colors.branco,
        padding: 16,
        borderRadius: 20
    },
    containerNome: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 16
    },
    nome: {
        fontSize: 21,
        fontFamily: "Mulish-Medium",
    },
    containerAvatar: {
        height: 72,
        width: 72,
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden"
    },
    avatar: {
        height: 72,
        width: 72,
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden"
    },
    containerInformacoes: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 65,
        marginBottom: 130
    },
    containerBotaoSegmentado: {
        alignItems: 'center'
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
})