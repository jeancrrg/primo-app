import React from "react";
import { MenuProvider } from "react-native-popup-menu";
import { NavigationContainer } from "@react-navigation/native";
import AppRoute from './src/routes/AppRoute.routes';
import FlashMessage from "react-native-flash-message";
import { View } from "react-native";
import { styles } from "./Styles";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <MenuProvider>
                <NavigationContainer>
                    <View style={styles.container}>
                        <AppRoute />
                    </View>
                    <FlashMessage position="top" />
                </NavigationContainer>
            </MenuProvider>
        </GestureHandlerRootView>
    );
}
