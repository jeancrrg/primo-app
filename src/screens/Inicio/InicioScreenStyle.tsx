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
        color: Colors.cor_primaria,
        marginVertical: 30
    },
    containerCard: {
        height: 240,
        marginBottom: 20
    },
    card: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: 240,
        borderRadius: 20,
        backgroundColor: Colors.branco,
        shadowColor: Colors.cinza_escuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        alignSelf: "flex-start",
        justifyContent: "space-between"
    },
    containerTexto: {
        width: '55%',
        padding: 15,
        alignItems: "center"
    },
    tituloTexto: {
        fontSize: 23,
        fontFamily: "Mulish-Medium",
        color: Colors.cor_primaria,
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
        paddingVertical: 24
    },
    imagem: {
        height: 180,
        width: 180,
        resizeMode: "contain"
    },
    containerTiposServicos: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: "center"
    },
    textoTipoServico: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Mulish-Medium"
    },
    tiposServico: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 15
    }
});