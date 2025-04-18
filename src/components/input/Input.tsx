import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { PropsInput } from "../../models/interfaces/Interface";
import { styles } from "./InputStyle";
import { Colors } from "../../../assets/styles/Colors";
import { isNotEmpty } from "../../utils/ValidationUtil";

export default function Input(props: PropsInput) {

    function renderIcone(nomeIcone: string, onPressIconeDireita?: () => void) {
        if (isNotEmpty(nomeIcone)) {
            return (
                <TextInput.Icon icon={nomeIcone} onPress={onPressIconeDireita ? () => onPressIconeDireita() : undefined}/>
            );
        }
    }

    return (
        <View>
            <TextInput
                label={props.label}
                value={props.valor}
                onChangeText={props.onChangeText}
                mode="outlined"
                style={styles.input}
                maxLength={props.maxLength}
                outlineColor={Colors.cinzaClaro}
                activeOutlineColor={Colors.cinzaEscuro2}
                left={renderIcone(props.nomeIconeEsquerda || '')}
                right={renderIcone(props.nomeIconeDireita || '', props.onPressIconeDireita)}
                secureTextEntry={props.mostrarValor}
                theme={{
                    roundness: 20, // borda arredondada
                }}
            />
        </View>
    );
}