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
        textAlign: 'center',
        marginBottom: 40
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
        marginTop: 40
    },
    textoBotaoLogin: {
        color: Colors.branco,
        fontSize: 18,
        fontWeight: 'bold'
    },
    containerDivider: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.cinzaEscuro2
    },
    textoDivider: {
        color: Colors.cinzaEscuro2,
        marginHorizontal: 10
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
        fontSize: 18,
        fontWeight: 'bold'
    }
})