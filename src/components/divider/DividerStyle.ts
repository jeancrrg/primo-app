import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.cinzaEscuro2
    },
    textoDivider: {
        color: Colors.cinzaEscuro2,
        marginHorizontal: 10
    }
})