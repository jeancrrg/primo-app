import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./BotaoSecundarioStyle";
import { PropsBotao } from "../../../models/interfaces/props/PropsBotao";

export default function BotaoSecundario(props: PropsBotao) {
    return (
        <View>
            <TouchableOpacity style={styles.botao} onPress={() => props.onPress()}>
                <Text style={styles.labelBotao}> {props.label} </Text>    
            </TouchableOpacity>
        </View>
    );
}