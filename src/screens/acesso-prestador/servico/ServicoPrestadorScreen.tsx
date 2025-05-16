import { Image, View } from "react-native";
import { styles } from "./ServicoPrestadorScreenStyle";

export default function ServicoPrestadorScreen(): JSX.Element {
    return (
        <View style={styles.container}>
            <Image source={require("../../../../assets/images/ilustracoes/servico-indisponivel.png")} style={styles.imagem} />
        </View>
    )
}