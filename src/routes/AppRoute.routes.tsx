import * as React from "react";
import TabsRoute from "./TabsRoute.routes";
import LoginScreen from "../screens/login/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AppRoute() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="tabs" component={TabsRoute} />
        </Stack.Navigator>
    );
};
