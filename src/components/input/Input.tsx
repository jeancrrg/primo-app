import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "./InputStyle";
import { Colors } from "../../../assets/styles/Colors";
import { isNotEmpty } from "../../utils/ValidationUtil";
import { Controller } from "react-hook-form";
import { PropsInput } from "../../models/interfaces/props/PropsInput";

export default function Input(props: PropsInput) {

    function renderIcone(nomeIcone: string, onPressIconeDireita?: () => void) {
        if (isNotEmpty(nomeIcone)) {
            return (
                <TextInput.Icon 
                    icon={nomeIcone}
                    color={isNotEmpty(props.errosValidacao) ? Colors.vermelhoErro : Colors.cinzaEscuro2} 
                    onPress={onPressIconeDireita ? () => onPressIconeDireita() : undefined}
                />
            );
        }
    }

    return (
        <Controller
            control={props.control}
            name={props.name}
            render={({ field: { onChange, value } }) => (
                <View>
                    <TextInput
                        label={props.label}
                        value={value}
                        onChangeText={(textoDigitado) => {
                            const apenasNumeros: string = textoDigitado.replace(/\D/g, "");
                            const textoFormatado: string = props.mascara ? props.mascara(apenasNumeros) : textoDigitado;
                            onChange(textoFormatado);
                        }}
                        mode="outlined"
                        style={styles.input}
                        keyboardType={props.tipoTeclado || 'default'}
                        maxLength={props.maxLength}
                        outlineColor={Colors.cinzaClaro}
                        activeOutlineColor={Colors.cinzaEscuro2}
                        left={renderIcone(props.nomeIconeEsquerda || '')}
                        right={renderIcone(props.nomeIconeDireita || '', props.onPressIconeDireita)}
                        secureTextEntry={props.mostrarValor}
                        theme={{roundness: 20}} // Borda arredondada
                    />
    
                    {isNotEmpty(props.errosValidacao) && (
                        <Text style={styles.mensagemErro}> {props.errosValidacao} </Text>
                    )}
                </View>
            )}
        />
    );
}