import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Animatable from 'react-native-animatable'; 
import { TextInput } from 'react-native-paper';
import { useState } from "react";
import { Colors } from "../../../assets/styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type StackParamList = {
    login: undefined;
    tabs: undefined;
};

export default function LoginScreen() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    function renderIconeInput(nomeIcone: string) {
        return (
            <TextInput.Icon icon={() => (
                <MaterialCommunityIcons name={nomeIcone} size={25} color={Colors.cinzaEscuro2} />
            )} />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <Image source={require("../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                    <Text style={styles.titulo}> Bem-Vindo(a) </Text>

                    <TextInput 
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={styles.input}
                        maxLength={50}
                        outlineColor={Colors.cinzaClaro}
                        activeOutlineColor={Colors.cinzaEscuro2}
                        left={renderIconeInput('email-outline')}
                        theme={{
                            roundness: 20, // borda arredondada
                        }}
                    />

                    <TextInput 
                        label="Senha"
                        value={senha}
                        onChangeText={setSenha}
                        mode="outlined"
                        style={styles.input}
                        maxLength={20}
                        outlineColor={Colors.cinzaClaro}
                        activeOutlineColor={Colors.cinzaEscuro2}
                        left={renderIconeInput('lock-outline')}
                        theme={{
                            roundness: 20, // borda arredondada
                        }}
                        secureTextEntry={!mostrarSenha}
                        right={
                            <TextInput.Icon
                                icon={mostrarSenha ? 'eye' : 'eye-off'}
                                onPress={() => setMostrarSenha(!mostrarSenha)}
                            />
                        }
                    />
                
                    <TouchableOpacity style={styles.botaoLogin} onPress={() => navigation.replace("tabs")}>
                        <Text style={styles.textoBotaoLogin}> Acessar </Text>    
                    </TouchableOpacity>

                    <View style={styles.containerDivider}>
                        <View style={styles.divider}></View>
                        <Text style={styles.textoDivider}> OU </Text>
                        <View style={styles.divider}></View>
                    </View>

                    <Text style={styles.infoCadastro}> Ainda não possui cadastro? Cadastre-se</Text>

                    <TouchableOpacity style={styles.botaoCadastro} onPress={() => navigation.replace("tabs")}> 
                        <Text style={styles.textoBotaoCadastro}> Cadastrar </Text>    
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}