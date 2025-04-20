import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    input: {
        height: 55,
        backgroundColor: Colors.cinzaClaro,
        paddingLeft: 8,
        marginTop: 10
    },
    mensagemErro: {
        color: Colors.vermelhoErro
    }
})