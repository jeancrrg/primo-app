import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.branco,
        shadowColor: Colors.cinzaClaro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        justifyContent: "center"
    },
    containerCard: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: Colors.branco,
        justifyContent: "center",
        paddingBottom: 8
    },
    imagem: {
        marginRight: 16,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        overflow: "hidden",
        width: 72,
        height: 72
    },
    containerDescricao: {
        flex: 1
    },
    containerTitulo: {
        flex: 1
    },
    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "Mulish-Medium"
    },
    tipoServico: {
        fontSize: 16,
        fontFamily: "Mulish-Light",
        color: Colors.cinzaEscuro
    },
    containerEndereco: {
        flexDirection: "row",
        marginTop: 5,
    },
    endereco: {
        fontSize: 14,
        fontFamily: "Mulish-Light",
        flex: 1,
        color: Colors.corPrimaria,
        justifyContent: "center"
    },
    containerBotao: {
        flex: 1,
        alignItems: "flex-end"
    },
    botao: {
        width: 200,
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: Colors.corPrimaria,
        padding: 8,
        marginVertical: 2,
        marginHorizontal: 15
    },
    textoBotao: {
        fontFamily: "Mulish-Light",
        color: Colors.branco,
        fontSize: 16,
        fontWeight: 'bold'
    }
})
