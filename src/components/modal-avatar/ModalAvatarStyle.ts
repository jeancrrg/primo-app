import { StyleSheet } from "react-native";
import { Colors } from "../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    containerBottomSheet: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        elevation: 100
    },
    containerEscolhaAvatares: {
        flex: 1,
        height: 110,
        backgroundColor: Colors.branco,
        padding: 10,
        marginHorizontal: 20,
        marginBottom: 120,
        borderRadius: 20
    },
    tituloEscolhaAvatar: {
        fontSize: 20,
        marginLeft: 10,
        marginBottom: 20
    },
    avatarOpcao: {
        width: 72,
        height: 72,
        borderRadius: 50
    },
    sombraBottomSheet: {
        flex: 1,
        backgroundColor: Colors.sombraPreta
    }
})