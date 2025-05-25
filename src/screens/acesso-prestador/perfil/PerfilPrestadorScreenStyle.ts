import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerPerfil: {
        position: 'absolute',
        top: 75,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: "row",
        backgroundColor: Colors.branco,
        padding: 15,
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
        marginBottom: 110
    },
    containerBotaoSegmentado: {
        alignItems: 'center'
    },
    containerBotoes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    botao: {
        height: 80,
        width: 105,
        backgroundColor: Colors.branco,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 4,
        shadowColor: Colors.preto,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1
    },
    textoBotao: {
        fontFamily: "Mulish-Medium"
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
    versaoApp: {
        fontFamily: "Mulish-Medium"
    }
})