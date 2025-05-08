import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.sombraPreta,
        justifyContent: 'center',
        padding: 20
    },
    containerModal: {
        backgroundColor: Colors.branco,
        borderRadius: 10,
        padding: 15
    },
    cabecalhoModal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titulo: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    checkbox: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        marginHorizontal: 10,
        marginVertical: 5
    },
    descricaoItem: {
        fontSize: 16
    },
    textoRegistroNaoEncontrado: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 15
    }
})