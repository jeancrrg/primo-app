import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.corPrimaria
    },
    containerLogo: {
        flexDirection: 'row'
    },
    botaoVoltar: {
        paddingTop: 20,
        paddingLeft: 25
    },
    logo: {
        height: 110,
        width: 110,
        marginLeft: 70
    },
    containerFormulario: {
        flex: 1,
        backgroundColor: Colors.branco,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 16,
        paddingHorizontal: 40
    },
    titulo: {
        color: Colors.corPrimaria,
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 11
    },
    containerBotaoCadastro: {
        marginVertical: 10
    },
    loading: {
        position: "absolute",
        top: 500,
        left: 200
    }
})