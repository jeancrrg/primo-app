import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./InicioPrestadorScreenStyle";
import Header from "../../../components/header/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../assets/styles/Colors";
import { useState } from "react";
import { RotaTabBar } from "../../../models/types/RotaTabBar";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function InicioPrestadorScreen(): JSX.Element {

    const [iconeBotaoConexao, setIconeBotaoConexao] = useState<string>('access-point');
    const [textoBotaoConexao, setTextoBotaoConexao] = useState<string>('Conectar');

    const navigation = useNavigation<NavigationProp<RotaTabBar>>();

    function onPressBotaoConexao(): void {
        if (textoBotaoConexao == 'Conectar') {
            setIconeBotaoConexao('access-point-off');
            setTextoBotaoConexao('Desconectar');
            navigation.navigate('mapa');
        } else {
            setIconeBotaoConexao('access-point');
            setTextoBotaoConexao('Conectar');
            navigation.navigate('mapa');
        }
    }

    return (
        <View style={styles.container}>
            <Header titulo="Início" />

            <View style={styles.cardPrincipal}>
                <View style={styles.containerTexto}>
                    <Text style={styles.tituloTexto}> Procurando mais clientes? </Text>
                    <Text style={styles.texto}> Atenda chamados novos todos os dias, pertinho de você e faça sua agenda bombar! </Text>
                </View>            

                <View style={styles.containerImagem}>
                    <Image source={require("../../../../assets/images/ilustracoes/atendimento-prestador.png")} style={styles.imagemCardPrincipal} />
                </View>
            </View>

            <View style={styles.containerConteudo}>

                <View style={styles.cardSecundario}>
                    <View style={styles.containerImagem}>
                        <Image source={require("../../../../assets/images/ilustracoes/conexao.png")} style={styles.imagemCardSecundario} />
                    </View>
                    <View style={styles.containerTexto}>
                        <Text style={styles.texto}> Conecte-se agora mesmo e veja os clientes que precisam dos seus serviços! </Text>
                    </View>
                </View>

                <View style={styles.containerBotaoConexao}>
                    <TouchableOpacity style={styles.botaoConexao} onPress={() => onPressBotaoConexao()}>
                        <MaterialCommunityIcons name={iconeBotaoConexao} color={Colors.branco} size={30} />
                        <Text style={styles.textoBotaoConexao}> {textoBotaoConexao} </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}