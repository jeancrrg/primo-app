import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardPrincipal: {
        height: 240,
        marginBottom: 20,
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
        zIndex: 10,        
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: Colors.branco,
        elevation: 4,
        shadowColor: Colors.preto,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        alignSelf: "flex-start",
        justifyContent: "space-between"
    },
    containerTexto: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    tituloTexto: {
        fontSize: 21,
        fontWeight: 'bold',
        fontFamily: "Mulish-Medium",
        color: Colors.corPrimaria,
        marginTop: 5,
        marginBottom: 15
    },
    texto: {
        fontSize: 15,
        fontFamily: "Mulish-Medium",
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 8
    },
    containerImagem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagemCardPrincipal: {
        height: 200,
        width: 160,
        resizeMode: "contain"
    },
    containerConteudo: {
        flex: 1,
        padding: 20,
        marginTop: 200,
        marginBottom: 110
    },
    cardSecundario: {
        height: 160,
        flexDirection: 'row',
        backgroundColor: Colors.branco,
        borderRadius: 20,
        elevation: 4,
        shadowColor: Colors.preto,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        marginVertical: 20
    },
    imagemCardSecundario: {
        height: 150,
        width: 140,
        resizeMode: "contain"
    },
    containerBotaoConexao: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botaoConexao: {
        height: 55,
        width: 180,
        backgroundColor: Colors.corPrimaria,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 4,
        shadowColor: Colors.preto,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4
    },
    textoBotaoConexao: {
        color: Colors.branco,
        fontSize: 18,
        fontFamily: "Mulish-Medium",
        fontWeight: 'bold',
        marginLeft: 10
    }
})