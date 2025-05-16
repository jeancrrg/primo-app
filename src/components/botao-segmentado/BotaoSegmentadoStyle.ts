import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        height: 60,
        width: 220,
        flexDirection: 'row',
        backgroundColor: Colors.branco,
        borderRadius: 20,
        marginBottom: 30
    },
    botaoSelecionado: {
        position: 'absolute',
        height: '80%',
        width: 110,
        marginHorizontal: 5,
        top: '10%',
        backgroundColor: Colors.corPrimaria,
        borderRadius: 20
    },
    botao: {
        width: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        fontSize: 16
    },
    textoSelecionado: {
        color: Colors.branco
    }
})