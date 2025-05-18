import { StyleSheet } from "react-native";
import { Colors } from "../../../../assets/styles/Colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapa: {
        height: '100%',
        width: "100%"
    },
    containerMarcadorLocalizacao: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circuloExterno: {
        height: 80,
        width: 80,
        backgroundColor: Colors.azulClaroTransparente,
        borderRadius: 40
    },
    marcadorLocalizacao: {
        height: 25,
        width: 25,
        backgroundColor: Colors.corPrimaria,
        borderColor: Colors.branco,
        borderWidth: 4,
        borderRadius: 15,
        position: 'absolute'
    }
})