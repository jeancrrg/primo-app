import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./CardPrestadorServicoStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../assets/styles/Colors";
import { PropsCardPrestadorServico } from "../../models/interfaces/props/PropsCardPrestadorServico.interface";
import { obterImagemAvatar } from "../../services/Avatar.service";
import { formatarNome } from "../../utils/FormatterUtil";

export default function CardPrestadorServico(props: PropsCardPrestadorServico): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.containerCard}>
                <Image source={obterImagemAvatar(props.codigoAvatar)} style={styles.imagem} />

                <View style={styles.containerDescricao}>
                    <View style={styles.containerTitulo}>
                        <Text style={styles.nome}> {formatarNome(props.nome)} </Text>
                        <Text style={styles.tipoServico}> {formatarNome(props.descricaoTipoServico)} </Text>
                    </View>

                    <View style={styles.containerEndereco}>
                        <MaterialCommunityIcons name='map-marker-outline' size={18} color={Colors.corPrimaria} />
                        <Text style={styles.endereco}> {formatarNome(props.logradouro)} </Text>
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
