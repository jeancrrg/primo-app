import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 220,
        flexDirection: 'row',
        backgroundColor: Colors.branco,
        borderRadius: 20,
        marginVertical: 20
    },
    botaoSelecionado: {
        position: 'absolute',
        height: '100%',
        width: 120,
        backgroundColor: Colors.corPrimaria,
        borderRadius: 18
    },
    botao: {
        width: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        fontSize: 16,
        fontFamily: "Mulish-Medium"
    },
    textoSelecionado: {
        color: Colors.branco,
        fontWeight: 'bold'
    }
})