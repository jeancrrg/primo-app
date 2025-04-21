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
        height: 200,
        width: 200
    },
    containerFormulario: {
        flex: 1,
        backgroundColor: Colors.branco,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 40,
        paddingVertical: 30
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
        marginTop: 25
    },
    infoCadastro: {
        textAlign: 'center'
    }
})