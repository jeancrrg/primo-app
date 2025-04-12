import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StackParamList = {
    login: undefined;
    tabs: undefined;
};

export default function LoginScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    return (
        <View style={styles.container}>
            <Text> Login </Text>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.replace("tabs")}>
                <Text> Entrar </Text>    
            </TouchableOpacity>
        </View>
    );
}