import { Text, View } from "react-native";
import { PropsBotaoSegmentado } from "../../models/interfaces/props/PropsBotaoSegmentado";
import { styles } from "./BotaoSegmentadoStyle";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BotaoSegmentado(props: PropsBotaoSegmentado): JSX.Element {
    return (
        <View style={styles.container}>

            <View style={[
                styles.botaoSelecionado, 
                { left: 100 * props.opcoes.indexOf(props.opcaoSelecionada) }
            ]} />

            {props.opcoes.map((opcao) => {
                const opcaoSelecionada: boolean = opcao === props.opcaoSelecionada;
                return (
                    <View key={opcao} style={styles.botao}>
                        <TouchableOpacity onPress={() => props.onSelecionar(opcao)}>
                            <Text style={[styles.textoBotao, opcaoSelecionada && styles.textoSelecionado]}> {opcao} </Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}
