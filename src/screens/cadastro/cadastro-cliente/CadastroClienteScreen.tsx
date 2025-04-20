import { Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from 'react-native-animatable'; 
import { styles } from "./CadastroClienteScreenStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FormularioCadastroCliente, RotasStack } from "../../../models/interfaces/Interface";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../../assets/styles/Colors";
import { useState } from "react";
import Divider from "../../../components/divider/Divider";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import Input from "../../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validacoesFormularioCliente } from "../../../validations/ClienteValidation";

export default function CadastroClienteScreen() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();
    const { control, handleSubmit, formState: { errors } } = useForm<FormularioCadastroCliente>({
        resolver: yupResolver(validacoesFormularioCliente)
    });

    function cadastrar(formulario: FormularioCadastroCliente): void {
        console.log('Dados: ', formulario)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerLogo}>
                    <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='arrow-left-circle-outline' color={Colors.branco} size={38} />
                    </TouchableOpacity>

                    <Image source={require("../../../../assets/logo-primo.png")} style={styles.logo} />
                </Animatable.View>

                <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.titulo}> Cadastro Cliente </Text>
                    
                        <Input
                            control={control}
                            name='nome'
                            label='Nome'
                            maxLength={15}
                            nomeIconeEsquerda='clipboard-text-outline'
                            errosValidacao={errors.nome?.message}
                        />

                        <Input
                            control={control}
                            name='telefone'
                            label='Telefone'
                            maxLength={15}
                            nomeIconeEsquerda='phone'
                            errosValidacao={errors.telefone?.message}
                        />

                        <Input
                            control={control}
                            name='email'
                            label='Email'
                            maxLength={50}
                            nomeIconeEsquerda='email-outline'
                            errosValidacao={errors.email?.message}
                        />

                        <Input
                            control={control}
                            name='senha'
                            label='Senha'
                            maxLength={15}
                            nomeIconeEsquerda='lock-outline'
                            nomeIconeDireita={mostrarSenha ? 'eye' : 'eye-off'}
                            onPressIconeDireita={() => setMostrarSenha(!mostrarSenha)}
                            mostrarValor={!mostrarSenha}
                            errosValidacao={errors.senha?.message}
                        />

                        <Divider texto="Veículo"/>

                        <Input
                            control={control}
                            name='modeloVeiculo'
                            label='Modelo Veículo'
                            maxLength={50}
                            nomeIconeEsquerda='car-outline'
                            errosValidacao={errors.modeloVeiculo?.message}
                        />

                        <Input
                            control={control}
                            name='anoVeiculo'
                            label='Ano Veículo'
                            maxLength={4}
                            nomeIconeEsquerda='calendar-range'
                            errosValidacao={errors.anoVeiculo?.message}
                        />

                        <Animatable.View animation='fadeInLeft' delay={700}>
                            <BotaoPrincipal label="Cadastrar" onPress={handleSubmit(cadastrar)} />
                        </Animatable.View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}