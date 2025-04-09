import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Remove o espaçamento extra que o SafeAreaView tenta aplicar
        marginTop: StatusBar.currentHeight
    },
});