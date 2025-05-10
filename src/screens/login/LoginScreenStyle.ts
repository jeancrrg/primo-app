import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.corPrimaria
    },
    containerLogo: {
        alignItems: 'center'
    },
    logo: {
        height: 160,
        width: 160
    },
    versao: {
        color: Colors.branco,
        marginBottom: 10
    },
    containerFormulario: {
        flex: 1,
        backgroundColor: Colors.branco,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30
    },
    formulario: {
        paddingHorizontal: 40
    },
    titulo: {
        color: Colors.corPrimaria,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    texto: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 25
    },
    containerBotaoEntrar: {
        marginTop: 10
    },
    infoCadastro: {
        textAlign: 'center'
    }
})