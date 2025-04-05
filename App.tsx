import React from "react";
import Fonts from './assets/styles/Fonts';
import { useFonts } from "expo-font";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import AppRoute from './src/routes/AppRoute';
import FlashMessage from "react-native-flash-message";
import { StatusBar, StyleSheet, View } from "react-native";

export default function App() {

    // Definição da fonte padrão
    const [fontsLoaded] = useFonts(Fonts);
    if (!fontsLoaded) {
        return null;
    }

    return (
        // Habilitando o MenuProvider para o uso de popup
        <MenuProvider>
            <NavigationContainer>
                <View style={styles.container}>
                    <AppRoute />
                </View>
                <FlashMessage position="top" />
            </NavigationContainer>
        </MenuProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Remove o espaçamento extra que o SafeAreaView tenta aplicar
        marginTop: StatusBar.currentHeight
    },
});
