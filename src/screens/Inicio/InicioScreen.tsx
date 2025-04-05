import { Image, Text, View } from "react-native";
import CardTipoServico from "../../components/CardTipoServico/CardTipoServico";
import { Rotas, TipoServico } from "../../models/interfaces/Interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { styles } from "./InicioScreenStyle";

export default function InicioScreen() {

    const navigation = useNavigation<NavigationProp<Rotas>>();

    const listaTiposServico: TipoServico[] = [
        { nome: "Borracheiro", icone: "tire" },
        { nome: "Chaveiro", icone: "key-variant" },
        { nome: "Guincho", icone: "tow-truck"},
        { nome: "Auto Elétrica", icone: "lightning-bolt"}
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> Primo </Text>

            <View style={styles.containerCard}>
                <View style={styles.card}>
                    <View style={styles.containerTexto}>
                        <Text style={styles.tituloTexto}> Precisa de ajuda? </Text>

                        <Text style={styles.texto}> Encontre agora mesmo um técnico especializado perto de você, disponível 24h! </Text>
                    </View>            

                    <View style={styles.containerImagem}>
                        <Image source={require("../../../assets/images/ilustracoes/servico-24h.png")} style={styles.imagem} />
                    </View>
                </View>
            </View>

            <View style={styles.containerTiposServicos}>
                <Text style={styles.textoTipoServico}> Tipos de serviço </Text>

                <View style={styles.tiposServico}>
                    {listaTiposServico.map(tipoServico => (
                        <CardTipoServico key={tipoServico.nome} tipoServico={tipoServico} onPress={() => navigation.navigate('mapa')}/>
                    ))}
                </View>
            </View>
        </View>
    );
}