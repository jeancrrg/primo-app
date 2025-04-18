import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./BotaoPrincipalStyle";
import { PropsBotao } from "../../../models/interfaces/Interface";

export default function BotaoPrincipal(props: PropsBotao) {
    return (
        <View>
            <TouchableOpacity style={styles.botao} onPress={() => props.onPress()}>
                <Text style={styles.labelBotao}> {props.label} </Text>    
            </TouchableOpacity>
        </View>
    );
}