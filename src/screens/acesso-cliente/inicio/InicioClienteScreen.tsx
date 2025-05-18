import { Image, Text, View } from "react-native";
import CardTipoServico from "../../../components/card-tipo-servico/CardTipoServico";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from "./InicioClienteScreenStyle";
import { RotaTabBar } from "../../../models/types/RotaTabBar";
import Header from "../../../components/header/Header";

export default function InicioClienteScreen(): JSX.Element {

    const navigation = useNavigation<NavigationProp<RotaTabBar>>();

    const tiposServico = [
        { descricaoTipoServico: "Borracheiro", icone: "tire" },
        { descricaoTipoServico: "Chaveiro", icone: "key-variant" },
        { descricaoTipoServico: "Guincho", icone: "tow-truck"},
        { descricaoTipoServico: "Auto Elétrica", icone: "lightning-bolt"}
    ];

    return (
        <View style={styles.container}>
            <Header titulo="Início" />

            <View style={styles.containerCard}>
                <View style={styles.containerTexto}>
                    <Text style={styles.tituloTexto}> Precisando de ajuda? </Text>

                    <Text style={styles.texto}> Encontre agora mesmo um técnico especializado perto de você! </Text>
                </View>            

                <View style={styles.containerImagem}>
                    <Image source={require("../../../../assets/images/ilustracoes/prestador-servico.png")} style={styles.imagem} />
                </View>
            </View>

            <View style={styles.containerTiposServicos}>
                <Text style={styles.textoTipoServico}> Tipos de serviço </Text>

                <View style={styles.tiposServico}>
                    {tiposServico.map(tipoServico => (
                        <CardTipoServico key={tipoServico.descricaoTipoServico} 
                            descricaoTipoServico={tipoServico.descricaoTipoServico} 
                            icone={tipoServico.icone}
                            onPress={() => navigation.navigate('mapa')}/>
                    ))}
                </View>
            </View>
        </View>
    );
}