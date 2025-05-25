import { Image, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./EsqueciSenhaScreenStyle";
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../assets/styles/Colors";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import Input from "../../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";
import { validacaoEmail } from "../../../validations/EmailValidation";
import { FormularioEsqueciSenha } from "../../../models/interfaces/formularios/FormularioEsqueciSenha";
import { redefinirSenha } from "../../../services/Autenticacao.service";
import { useState } from "react";
import Loader from "../../../components/loader/Loader";
import { navegarParaTela, voltarTela } from "../../../utils/NavigationUtil";
import { RotaPrincipalEnum } from "../../../models/enum/RotaPrincipal.enum";

export default function EsqueciSenhaScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormularioEsqueciSenha>({
        resolver: yupResolver(validacaoEmail)
    });

    async function enviar(formulario: FormularioEsqueciSenha): Promise<void> {
        try {
            setLoading(true);
            await redefinirSenha(formulario.email);
            setLoading(false);
            Toast.show({ type: 'sucesso', text1: 'SUCESSO', text2: 'Email enviado com sucesso!' });
            navegarParaTela(RotaPrincipalEnum.LOGIN);
        } catch (error: any) {
            setLoading(false);
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            {loading ? (
                <Loader/>
            ) : (
                <View style={styles.container}>
                    <Animatable.View animation='fadeInLeft' delay={500}>
                        <TouchableOpacity style={styles.botaoVoltar} onPress={() => voltarTela()}>
                            <MaterialCommunityIcons name='arrow-left-circle-outline' color={Colors.branco} size={40} />
                        </TouchableOpacity>

                        <View style={styles.containerLogo}>
                            <Image source={require("../../../../assets/images/logos/logo-primo-branco.png")} style={styles.logo} />
                        </View>
                    </Animatable.View>

                    <Animatable.View animation='fadeInUp' delay={500} style={styles.containerFormulario}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.formulario}>
                                <Text style={styles.titulo}> Esqueceu sua senha? </Text>

                                <Text style={styles.texto}> Não se preocupe, enviaremos um email para redefinir a senha </Text>

                                <Input
                                    control={control}
                                    name='email'
                                    label='Email'
                                    maxLength={50}
                                    nomeIconeEsquerda='email-outline'
                                    errosValidacao={errors.email?.message}
                                />

                                <Animatable.View animation='fadeInLeft' delay={700} style={styles.containerBotao}>
                                    <BotaoPrincipal label="Enviar" onPress={handleSubmit(enviar)} />
                                </Animatable.View>
                            </View>
                        </ScrollView>
                    </Animatable.View>
                </View>
            )}
        </TouchableWithoutFeedback>
    );
}