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
        marginTop: 20,
        marginBottom: 30
    },
    input: {
        backgroundColor: Colors.cinzaClaro,
        height: 55,
        marginBottom: 15,
        paddingLeft: 8
    },
    botaoLogin: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.corPrimaria,
        borderRadius: 20,
        marginTop: 30,
        marginBottom: 20
    },
    textoBotaoLogin: {
        color: Colors.branco,
        fontSize: 20,
        fontWeight: 'bold'
    },
    infoCadastro: {
        textAlign: 'center',
        color: Colors.cinzaEscuro2,
        marginVertical: 15
    },
    botaoCadastro: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.corPrimaria,
        borderWidth: 2,
        borderRadius: 20
    },
    textoBotaoCadastro: {
        color: Colors.corPrimaria,
        fontSize: 20,
        fontWeight: 'bold'
    }
})