import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 120,
        position: 'relative'
    },
    containerCard: {
        height: 240,
        marginBottom: 20,
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
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
    containerTiposServicos: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        marginTop: 200
    },
    textoTipoServico: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Mulish-Medium",
        marginTop: 20
    },
    tiposServico: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    }
});