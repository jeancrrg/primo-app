import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.corPrimaria
    },
    botaoVoltar: {
        paddingTop: 20,
        paddingLeft: 25
    },
    containerLogo: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    logo: {
        height: 160,
        width: 160
    },
    containerFormulario: {
        flex: 1,
        backgroundColor: Colors.branco,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    formulario: {
        padding: 40
    },
    titulo: {
        color: Colors.corPrimaria,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    texto: {
        fontSize: 18,
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 30
    },
    containerBotao: {
        marginTop: 110
    }
})