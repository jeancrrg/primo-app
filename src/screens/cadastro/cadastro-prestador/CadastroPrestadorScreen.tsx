import { Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./CadastroPrestadorScreenStyle";
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../assets/styles/Colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RotasStack } from "../../../models/interfaces/Interface";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import Input from "../../../components/input/Input";
import Divider from "../../../components/divider/Divider";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { validacoesFormularioPrestador } from "../../../validations/PrestadorValidation";

export default function CadastroPrestadorScreen() {

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RotasStack>>();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validacoesFormularioPrestador)
    });

    function cadastrar(dados: any): void {
        console.log('Dados: ', dados)
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
                        <Text style={styles.titulo}> Cadastro Prestador </Text>

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

                        <Divider texto="Serviço"/>

                        <Input
                            control={control}
                            name='cnpj'
                            label='Cnpj'
                            maxLength={18}
                            nomeIconeEsquerda='lock-outline'
                            errosValidacao={errors.cnpj?.message}
                        />

                        <Input
                            control={control}
                            name='endereco'
                            label='Endereço'
                            maxLength={120}
                            nomeIconeEsquerda='lock-outline'
                            errosValidacao={errors.endereco?.message}
                        />

                        <Input
                            control={control}
                            name='endereco'
                            label='Tipo Serviço'
                            maxLength={50}
                            nomeIconeEsquerda='lock-outline'
                            errosValidacao={errors.tipoServico?.message}
                        />

                        <Input
                            control={control}
                            name='endereco'
                            label='Valor Serviço'
                            maxLength={6}
                            nomeIconeEsquerda='lock-outline'
                            errosValidacao={errors.valorServico?.message}
                        />

                        <Animatable.View animation='fadeInLeft' delay={700}>
                            <BotaoPrincipal label="Cadastrar" onPress={() => navigation.navigate("tabs")} />
                        </Animatable.View>
                    </ScrollView>
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    );
}