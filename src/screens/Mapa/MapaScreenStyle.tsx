import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: "100%",
        height: "100%"
    },
    callout_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.branco,
        paddingLeft: 8
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
    }

});