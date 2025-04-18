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
        height: 200,
        width: 200
    },
    containerFormulario: {
        flex: 1,
        backgroundColor: Colors.branco,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 15,
        marginBottom: 20
    },
    containerPossuiCadastro: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    textoEntrar: {
        color: Colors.corPrimaria,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})