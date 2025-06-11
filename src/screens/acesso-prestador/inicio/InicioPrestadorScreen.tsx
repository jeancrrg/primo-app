import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./InicioPrestadorScreenStyle";
import Header from "../../../components/header/Header";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../../assets/styles/Colors";
import { useState } from "react";
import { navegarParaTela } from "../../../utils/NavigationUtil";
import { RotaTabsEnum } from "../../../models/enum/RotaTabs.enum";
import { useConexaoPrestador } from "../../../contexts/ConexaoPrestadorContext";

export default function InicioPrestadorScreen(): JSX.Element {

    const [iconeBotaoConexao, setIconeBotaoConexao] = useState<string>('access-point');
    const [textoBotaoConexao, setTextoBotaoConexao] = useState<string>('Conectar');

    const { setIndicadorConectado } = useConexaoPrestador();

    function onPressBotaoConexao(): void {
        if (textoBotaoConexao == 'Conectar') {
            setIndicadorConectado(true);
            setIconeBotaoConexao('access-point-off');
            setTextoBotaoConexao('Desconectar');
            navegarParaTela(RotaTabsEnum.MAPA);
        } else {
            setIndicadorConectado(false);
            setIconeBotaoConexao('access-point');
            setTextoBotaoConexao('Conectar');
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