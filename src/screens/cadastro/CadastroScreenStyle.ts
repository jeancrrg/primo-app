import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

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
        marginTop: 10,
        marginBottom: 30
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
        marginTop: 20,
        marginBottom: 40
    },
    botaoPrincipal: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.corPrimaria,
        borderRadius: 20,
        marginBottom: 20
    },
    textoBotaoPrincipal: {
        color: Colors.branco,
        fontSize: 20,
        fontWeight: 'bold'
    },
    botaoSecundario: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.corPrimaria,
        borderWidth: 2,
        borderRadius: 20,
        marginBottom: 30
    },
    textoBotaoSecundario: {
        color: Colors.corPrimaria,
        fontSize: 20,
        fontWeight: 'bold'
    },
    containerPossuiCadastro: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textoPossuiCadastro: {
        color: Colors.cinzaEscuro2,
        fontSize: 18
    },
    textoEntrarCadastro: {
        color: Colors.corPrimaria,
        fontWeight: 'bold',
        fontSize: 18,
        textDecorationLine: 'underline'
    }
})