import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapa: {
        height: '100%',
        width: "100%"
    },
    loading: {
        position: "absolute",
        top: 200,
        left: 200
    },
    containerBottomSheet: {
        height: 110,
        backgroundColor: Colors.branco,
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 20
    },
    containerAvatar: {
        width: 75,
        justifyContent: 'center'
    },
    avatar: {
        height: 72,
        width: 72
    },
    containerDescricao: {
        flex: 1
    },
    nome: {
        fontSize: 18,
        fontFamily: "Mulish-Medium",
        fontWeight: "bold",
        marginBottom: 5
    },
    tipoServico: {
        color: Colors.cinzaEscuro,
        fontSize: 16,
        fontFamily: "Mulish-Light"
    },
    precoServico: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Mulish-Light"
    },
    containerSolicitacao: {
        width: 120,
        alignItems: "flex-end",
        justifyContent: "space-between"
    },
    tempoSolicitacao: {
        color: Colors.corPrimaria,
        fontSize: 16,
        fontFamily: "Mulish-Medium",
        fontWeight: "bold"
    },
    botaoSolicitacao: {
        width: 120,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.corPrimaria,
        padding: 10,
        borderRadius: 10
    },
    textoBotaoSolicitacao: {
        color: Colors.branco,
        marginLeft: 5,
        fontSize: 16,
        fontFamily: "Mulish-Medium",
        fontWeight: 'bold'
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
});