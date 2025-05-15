import { TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from "./PickerStyle";
import { TextInput } from "react-native-paper";
import PopupModal from "../popup-modal/PopupModal";
import { PropsPicker } from "../../models/interfaces/props/PropsPicker";
import { Colors } from "../../../assets/styles/Colors";
import { isNotEmpty } from "../../utils/ValidationUtil";

export default function Picker<T>(props: PropsPicker<T>): JSX.Element {

    const [exibirModal, setExibirModal] = useState<boolean>(false);

    function renderIcone(nomeIcone: string) {
        if (isNotEmpty(nomeIcone)) {
            return (
                <TextInput.Icon 
                    icon={nomeIcone}
                    color={Colors.cinzaEscuro2} 
                />
            );
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setExibirModal(true)}>
                <TextInput
                    label={props.label}
                    value={props.valorSelecionado ? props.getLabel(props.valorSelecionado) : ''}
                    mode="outlined"
                    style={styles.input}
                    outlineColor={Colors.cinzaClaro}
                    activeOutlineColor={Colors.cinzaEscuro2}
                    editable={false}
                    pointerEvents="none"
                    left={renderIcone(props.icone || '')}
                    right={renderIcone('chevron-down')}
                    theme={{roundness: 20}} // Borda arredondada
                />
            </TouchableOpacity>

            <PopupModal
                exibirModal={exibirModal}
                titulo={props.label}
                listaDados={props.listaDados}
                getLabel={props.getLabel}
                onSelecionar={(item: T) => {
                    props.onSelecionar(item);
                    setExibirModal(false);
                }}
                onClose={() => setExibirModal(false)}
            />
        </View>
    ); 
}