import { Image, Text, View } from "react-native";
import { styles } from "./InicioPrestadorScreenStyle";
import Header from "../../../components/header/Header";

export default function InicioPrestadorScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <Header titulo="Início" />

            <View style={styles.containerCard}>
                <View style={styles.card}>
                    <View style={styles.containerTexto}>
                        <Text style={styles.tituloTexto}> Precisando de ajuda? </Text>

                        <Text style={styles.texto}> Encontre agora mesmo um técnico especializado perto de você! </Text>
                    </View>            

                    <View style={styles.containerImagem}>
                        <Image source={require("../../../../assets/images/ilustracoes/prestador-servico.png")} style={styles.imagem} />
                    </View>
                </View>
            </View>

        </View>
    );
}