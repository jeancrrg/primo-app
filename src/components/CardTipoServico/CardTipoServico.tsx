import { Text, TouchableOpacity } from "react-native";
import { styles } from "./CardTipoServicoStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PropsCardTipoServico } from "../../models/interfaces/Interface";

export default function CardTipoServico({ tipoServico, onPress }: PropsCardTipoServico) {
    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <MaterialCommunityIcons name={tipoServico.icone} style={styles.icone}/>
            <Text style={styles.texto}> {tipoServico.nome} </Text>
        </TouchableOpacity>
    );
}
