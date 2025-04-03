import { Text, View } from "react-native";
import { styles } from "./InicioScreenStyle";
import CardTipoServico from "../../components/CardTipoServico/CardTipoServico";
import { TipoServico } from "../../models/interfaces/Interface";

export default function InicioScreen() {

    const listaTiposServico: TipoServico[] = [
        { nome: "Borracheiro", icone: "tire" },
        { nome: "Mecânico", icone: "tools" },
        { nome: "Guincho", icone: "tow-truck"},
        { nome: "Auto Elétrica", icone: "lightning-bolt"}
    ];

    function onPressTipoServico(tipoServico: TipoServico) {
        console.log('Tipo serviço: ', tipoServico.nome);
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerTitulo}>
                <Text style={styles.titulo}> Primo </Text>
            </View>

            <View style={styles.containerTiposServicos}>
                <Text style={styles.textoTipoServico}> Tipos de serviço </Text>

                <View style={styles.tiposServico}>
                    {listaTiposServico.map(tipoServico => (
                        <CardTipoServico key={tipoServico.nome} tipoServico={tipoServico} onPress={() => onPressTipoServico(tipoServico)}/>
                    ))}
                </View>
            </View>

        </View>
    );
}