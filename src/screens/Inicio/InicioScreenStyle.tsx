import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 48,
        marginBottom: 120,
        paddingHorizontal: 24
    },
    containerTitulo: {
        marginVertical: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    titulo: {
        fontSize: 34,
        fontFamily: "Mulish-Medium",
        color: Colors.cor_primaria,
        flex: 1,
    },
    containerCard: {


    },

    card: {
        flex: 1,
        flexDirection: "row",
        width: 400,
        height: 400,
        borderRadius: 20,
        backgroundColor: Colors.branco,
        shadowColor: Colors.cinza_escuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 4,
        alignSelf: "flex-end"
    },
    button_box: {
        position: "absolute",
        justifyContent: "flex-end",
        bottom: 0,
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: Colors.cor_primaria,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignSelf: "flex-start",
    },
    button_text: {
        fontSize: 16,
        fontFamily: "Mulish-Bold",
        color: Colors.branco,
    },
    image_box: {
        flex: 1,
        paddingVertical: 24,
        height: 200
    },
    category_image: {
        flex: 1,
        resizeMode: "contain",
    },


    containerTiposServicos: {
        flex: 1,
        paddingHorizontal: 24,
        marginTop: 280,
        alignItems: "center"
    },
    textoTipoServico: {
        flex: 1,
        fontSize: 18,
        fontFamily: "Mulish-Medium",
    },
    tiposServico: {
        marginVertical:8,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
});