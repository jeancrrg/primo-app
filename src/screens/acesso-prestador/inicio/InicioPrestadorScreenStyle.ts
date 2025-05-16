import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerCard: {
        height: 240,
        marginBottom: 20,
        position: 'absolute',
        top: 80,
        left: 24,
        right: 24,
        zIndex: 10
    },
    card: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: 240,
        borderRadius: 20,
        backgroundColor: Colors.branco,
        shadowColor: Colors.cinzaEscuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        alignSelf: "flex-start",
        justifyContent: "space-between"
    },
    containerTexto: {
        width: '50%',
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    tituloTexto: {
        fontSize: 23,
        fontFamily: "Mulish-Medium",
        color: Colors.corPrimaria,
        marginTop: 5,
        marginBottom: 15
    },
    texto: {
        fontSize: 15,
        fontFamily: "Mulish-Medium",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 8
    },
    containerImagem: {
        width: '50%',
        justifyContent: "center"
    },
    imagem: {
        height: 180,
        width: 150,
        resizeMode: "contain"
    },
})