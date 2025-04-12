import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CardPrestadorServicoStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../assets/styles/Colors";
import { PropsCardPrestadorServico } from "../../models/interfaces/Interface";

export default function CardPrestadorServico(props: PropsCardPrestadorServico) {
    
    const prestadorImages: { [key: string]: any } = {
        '1': require('../../../assets/images/avatares/avatar-5.png'),
        //'2': require('../../../assets/images/avatares/avatar-2.png'),
        //'3': require('../../../assets/images/avatares/avatar-3.png'),
        //'4': require('../../../assets/images/avatares/avatar-4.png'),
        //'5': require('../../../assets/images/avatares/sem-avatar.png'),
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.containerCard}>
                <Image source={prestadorImages[props.codigo]} style={styles.imagem} />

                <View style={styles.containerDescricao}>
                    <View style={styles.containerTitulo}>
                        <Text style={styles.nome}> {props.nome} </Text>
                        <Text style={styles.tipoServico}> {props.descricaoTipoServico} </Text>
                    </View>

                    <View style={styles.containerEndereco}>
                        <MaterialCommunityIcons name='map-marker-outline' size={18} color={Colors.corPrimaria} />
                        <Text style={styles.endereco}> {props.logradouro} </Text>
                    </View>
                </View>
            </View>

            <View style={styles.containerBotao}>
                <TouchableOpacity style={styles.botao} onPress={props.onSelect}>
                    <Text style={styles.textoBotao}> Solicitar </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
