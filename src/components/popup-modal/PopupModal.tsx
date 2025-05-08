import { FlatList, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../assets/styles/Colors";
import { PropsPopupModal } from "../../models/interfaces/props/PropsPopupModal";
import { styles } from "./PopupModalStyle";
import Divider from "../divider/Divider";
import { Checkbox } from "react-native-paper";
import { useState } from "react";
import { isEmpty, isNotEmpty } from "../../utils/ValidationUtil";

export default function PopupModal<T>(props: PropsPopupModal<T>) {

    const [indexValorSelecionado, setIndexValorSelecionado] = useState<number | null>(null);

    return (
        <Modal transparent visible={props.exibirModal} onRequestClose={props.onClose}>
            <TouchableWithoutFeedback onPress={props.onClose}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback>

                        <View style={styles.containerModal}>
                            <View style={styles.cabecalhoModal}>
                                <Text style={styles.titulo}> {props.titulo} </Text>

                                <TouchableOpacity onPress={props.onClose}>
                                    <MaterialCommunityIcons name='close' color={Colors.preto} size={30} />
                                </TouchableOpacity>
                            </View>

                            <Divider/>

                            <View>
                                {isEmpty(props.listaDados) ? (
                                    <Text style={styles.textoRegistroNaoEncontrado}> Nenhum registro encontrado! </Text>
                                ) : (
                                    <FlatList
                                        data={props.listaDados}
                                        keyExtractor={(_, index) => index.toString()}
                                        renderItem={({ item, index }) => {
                                            const estaSelecionado: boolean = indexValorSelecionado === index;
    
                                            return (
                                                <TouchableOpacity
                                                    style={styles.item}
                                                    onPress={() => {
                                                        setIndexValorSelecionado(index);
                                                        props.onSelecionar(item);
                                                    }}>
    
                                                    <View style={styles.checkbox}>
                                                        <Checkbox
                                                            color={Colors.corPrimaria}
                                                            status={estaSelecionado  ? 'checked' : 'unchecked'}
                                                            onPress={() => {
                                                                setIndexValorSelecionado(index);
                                                                props.onSelecionar(item);
                                                            }}
                                                        />
                                                    </View>
                                                    <Text style={styles.descricaoItem}> {props.getLabel(item)} </Text>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                )}
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}