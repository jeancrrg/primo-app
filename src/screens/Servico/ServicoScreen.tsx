import { Image, View } from "react-native";
import { styles } from "./ServicoScreenStyle";

export default function ServicoScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <Image source={require("../../../assets/images/ilustracoes/servico-indisponivel.png")} style={styles.imagem} />
        </View>
    );
}