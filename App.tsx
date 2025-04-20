import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AppRoute from './src/routes/AppRoute.routes';
import FlashMessage from "react-native-flash-message";
import { StatusBar, Text, View } from "react-native";
import { styles } from "./Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "./assets/styles/Colors";
import Fonts from "./assets/styles/Fonts";
import Toast from "react-native-toast-message";
import { ToastMessageConfig } from "./src/components/toast-message/ToastMessageConfig";

export default function App() {

    const [fontes] = useFonts(Fonts);
    if (!fontes) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MenuProvider>
                <NavigationContainer>
                    <View style={styles.container}>
                        <AppRoute />
                    </View>
                    <StatusBar backgroundColor={Colors.corPrimaria} barStyle={"light-content"}/>
                    <FlashMessage position="top" />
                    <Toast config={ToastMessageConfig} />
                </NavigationContainer>
            </MenuProvider>
        </GestureHandlerRootView>
    );
}
