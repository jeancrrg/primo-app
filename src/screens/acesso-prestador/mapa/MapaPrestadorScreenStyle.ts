import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerConexao: {
        position: 'absolute',
        height: 55,
        width: '80%',
        backgroundColor: Colors.branco,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 4,
        shadowColor: Colors.preto,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 10
    },
    textoHeaderConexao: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.cinzaEscuro,
        marginLeft: 5
    },
    mapa: {
        flex: 1
    },
    containerMarcadorLocalizacao: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circuloExterno: {
        height: 80,
        width: 80,
        backgroundColor: Colors.azulClaroTransparente,
        borderRadius: 40
    },
    marcadorLocalizacao: {
        height: 25,
        width: 25,
        backgroundColor: Colors.corPrimaria,
        borderColor: Colors.branco,
        borderWidth: 4,
        borderRadius: 15,
        position: 'absolute'
    }
})