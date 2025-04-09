import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapa: {
        height: '100%',
        width: "100%"
    },
    containerInfoLocalizacao: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.corPrimaria,
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: Colors.preto,
    },
    callout_button: {
        justifyContent: "center",
        alignItems: "center",
        padding: 8
    },
    callout_title: {
        fontFamily: "Mulish-Medium",
        paddingBottom: 12,
        fontSize: 18
    },
    callout_text: {
        fontFamily: "Mulish-Light",
        fontSize: 13
    },
    loading: {
        position: "absolute",
        top: 200,
        left: 200
    }
});