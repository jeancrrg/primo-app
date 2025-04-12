import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.branco,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        shadowColor: Colors.cinzaEscuro,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        elevation: 6,
        alignItems: "center"
    },
    icone: { 
        paddingHorizontal: 10,
        fontSize: 22,
        color: Colors.cinzaEscuro
    },
    input: {
        flex: 1,
        fontSize: 16
    }
})