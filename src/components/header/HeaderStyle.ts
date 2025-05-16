import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.corPrimaria,
        height: 120,
        padding: 15,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative'
    },
    titulo: {
        fontSize: 34,
        fontFamily: "Mulish-Medium",
        color: Colors.branco
    }
})