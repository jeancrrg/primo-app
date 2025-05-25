import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./OpcaoCadastroScreenStyle";
import * as Animatable from 'react-native-animatable'; 
import Divider from "../../../components/divider/Divider";
import { Colors } from "../../../../assets/styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BotaoPrincipal from "../../../components/botao/botao-principal/BotaoPrincipal";
import BotaoSecundario from "../../../components/botao/botao-secundario/BotaoSecundario";
import { navegarParaTela, voltarTela } from "../../../utils/NavigationUtil";
import { RotaPrincipalEnum } from "../../../models/enum/RotaPrincipal.enum";

export default function OpcaoCadastroScreen(): JSX.Element {
    return (
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
                <Text style={styles.titulo}> O que deseja? </Text>

                <Text style={styles.texto}> Escolha como deseja utilizar o App Primo </Text>

                <Animatable.View animation='fadeInLeft' delay={700}>
                    <BotaoPrincipal label="Solicitar Serviço" onPress={() => navegarParaTela(RotaPrincipalEnum.CADASTRO_CLIENTE)} />
                </Animatable.View>

                <Animatable.View animation='fadeInRight' delay={700}>
                    <BotaoSecundario label="Oferecer Serviço" onPress={() => navegarParaTela(RotaPrincipalEnum.CADASTRO_PRESTADOR)}/>
                </Animatable.View>

                <Divider texto='OU' />

                <View style={styles.containerPossuiCadastro}>
                    <Text> Já possui cadastro? </Text>
                    <TouchableOpacity onPress={() => voltarTela()}>
                        <Text style={styles.textoEntrar}> ENTRAR </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}