import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 120
    },
    containerFundoAzul: {
        backgroundColor: Colors.corPrimaria,
        height: 150,
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative'
    },
    titulo: {
        fontSize: 34,
        fontFamily: "Mulish-Medium",
        color: Colors.branco
    },
    containerPerfil: {
        position: 'absolute',
        top: 90,
        left: 24,
        right: 24,
        zIndex: 10
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
        paddingHorizontal: 16
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
        height: 72,
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
    },
    containerBottomSheet: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        elevation: 100
    },
    containerEscolhaAvatares: {
        flex: 1,
        height: 110,
        backgroundColor: Colors.branco,
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 120,
        borderRadius: 20
    },
    tituloEscolhaAvatar: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 20
    },
    avatarOpcao: {
        width: 72,
        height: 72,
        borderRadius: 50
    },
    sombraBottomSheet: {
        flex: 1,
        backgroundColor: Colors.sombraPreta
    }
});