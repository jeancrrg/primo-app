import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./LoginScreenStyle";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Animatable from 'react-native-animatable'; 
import { TextInput } from 'react-native-paper';
import { useState } from "react";
import { Colors } from "../../../assets/styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RotasStack } from "../../models/interfaces/Interface";
import Divider from "../../components/divider/Divider";

export default function LoginScreen() {

    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();

    function renderIconeInput(nomeIcone: string) {
        return (
            <TextInput.Icon icon={() => (
                <MaterialCommunityIcons name={nomeIcone} size={25} color={Colors.cinzaEscuro2} />
            )} />
        );
    }

    async function realizarLogin(): Promise<void> {
        const camposValidos: boolean = await validarCampos();
        
    }

    async function validarCampos(): Promise<boolean> {


        return true;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <Image source={require("../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                    <Text style={styles.titulo}> Bem-Vindo(a) </Text>

                    <Text style={styles.texto}> Entre ou cadastre-se no App Primo </Text>

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
                            <TextInput.Icon icon={mostrarSenha ? 'eye' : 'eye-off'} onPress={() => setMostrarSenha(!mostrarSenha)}/>
                        }
                    />
                
                    <Animatable.View animation='fadeInLeft' delay={700}>
                        <TouchableOpacity style={styles.botaoLogin} onPress={() => navigation.replace("tabs")}>
                            <Text style={styles.textoBotaoLogin}> Entrar </Text>    
                        </TouchableOpacity>
                    </Animatable.View>

                    <Divider texto="OU" />

                    <Text style={styles.infoCadastro}> Ainda não possui cadastro? Cadastre-se</Text>

                    <Animatable.View animation='fadeInRight' delay={700}>
                        <TouchableOpacity style={styles.botaoCadastro} onPress={() => navigation.navigate("cadastro")}> 
                            <Text style={styles.textoBotaoCadastro}> Cadastrar </Text>   
                        </TouchableOpacity>
                    </Animatable.View>

                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}