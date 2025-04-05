import { TextInput, TouchableOpacity } from "react-native";
import { styles } from "./BarraPesquisaStyle";
import { Feather } from "@expo/vector-icons";
import { PropsBarraPesquisa } from "../../models/interfaces/Interface";

export default function BarraPesquisa(props: PropsBarraPesquisa) {
    return (
        <TouchableOpacity style={styles.container}>
            <Feather name='search' style={styles.icone} />
            <TextInput style={styles.input} placeholder={props.label} />
        </TouchableOpacity>
    )
}
