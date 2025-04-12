import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import AppRoute from './src/routes/AppRoute.routes';
import FlashMessage from "react-native-flash-message";
import { StatusBar, View } from "react-native";
import { styles } from "./Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Colors } from "./assets/styles/Colors";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MenuProvider>
                <NavigationContainer>
                    <View style={styles.container}>
                        <AppRoute />
                    </View>
                    <StatusBar backgroundColor={Colors.corPrimaria} barStyle={"light-content"}/>
                    <FlashMessage position="top" />
                </NavigationContainer>
            </MenuProvider>
        </GestureHandlerRootView>
    );
}
