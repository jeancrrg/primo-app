import { Text, View } from "react-native";
import { styles } from "./CardSmallStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { PropsCardSmall } from "../../models/interfaces/props/PropsCardSmall";

export default function CardSmall(props: PropsCardSmall): JSX.Element {
    return (
        <View style={styles.card}>
            <MaterialCommunityIcons name={props.nomeIcone} style={styles.icone} />

            <View style={styles.containerInfoCard}>
                <Text style={styles.tipoInformacao}> {props.tipoInformacao} </Text>
                <Text style={styles.informacao}> {props.informacao} </Text>
            </View>
        </View>
    );
}
