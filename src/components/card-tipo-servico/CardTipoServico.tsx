import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CardTipoServicoStyle";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PropsCardTipoServico } from "../../models/interfaces/props/PropsCardTipoServico.interface";

export default function CardTipoServico(props: PropsCardTipoServico): JSX.Element {
    return (
        <TouchableOpacity style={styles.botao} onPress={props.onPress}>
            <MaterialCommunityIcons name={props.icone || ''} style={styles.icone}/>
            <Text style={styles.texto}> {props.descricaoTipoServico} </Text>
        </TouchableOpacity>
    );
}
