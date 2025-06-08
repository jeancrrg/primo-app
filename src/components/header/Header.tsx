import { Text, View } from "react-native";
import { styles } from "./HeaderStyle";
import { PropsHeader } from "../../models/interfaces/props/PropsHeader.interface";

export default function Header(props: PropsHeader): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}> {props.titulo} </Text>
        </View>
    );
}