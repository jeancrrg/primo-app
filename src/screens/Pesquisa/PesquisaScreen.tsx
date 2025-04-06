import { FlatList, View } from "react-native";
import { styles } from "./PesquisaScreenStyle";
import BarraPesquisa from "../../components/BarraPesquisa/BarraPesquisa";
import { useEffect, useState } from "react";
import CardPrestadorServico from "../../components/CardPrestadorServico/CardPrestadorServico";
import { PropsCardPrestadorServico, Rotas } from "../../models/interfaces/Interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function PesquisaScreen() {

    const [listaPrestadoresServico, setListaPrestadoresServico] = useState<PropsCardPrestadorServico[]>([]);

    const navigation = useNavigation<NavigationProp<Rotas>>();

    useEffect(() => {
        const prestadorServico1 = { codigo: 1, nome: "Welligton Cardoso", tipoServico: "Chaveiro", 
                                    endereco: "Rua Cesário Alvim 1406 - Aparecida", onSelect: () => navigation.navigate('mapa') };

        const prestadorServico2 = { codigo: 2, nome: "Mariana Ribeiro", tipoServico: "Auto Elétrica",
                                    endereco: "Av Rondom Pacheco 202 - Tibery", onSelect: () => navigation.navigate('mapa') };

        const prestadorServico3 = { codigo: 3, nome: "Victor Hugo", tipoServico: "Borracheiro",
                                    endereco: "Av João Pinheiro 1022 - Centro", onSelect: () => navigation.navigate('mapa') };

        const prestadorServico4 = { codigo: 4, nome: "João Pedro", tipoServico: "Guincho",
                                    endereco: "Av Europa 867 - Bairro Brasil", onSelect: () => navigation.navigate('mapa') };

        const prestadorServico5 = { codigo: 5, nome: "Pedro Barbosa", tipoServico: "Mecânico",
                                    endereco: "Av Nicomedes 275 - Saraiva", onSelect: () => navigation.navigate('mapa') };
    
        setListaPrestadoresServico([prestadorServico1, prestadorServico2, prestadorServico3, prestadorServico4, prestadorServico5]);
    }, []);

    const renderCardPrestadorServico = (item: PropsCardPrestadorServico) => (
        <CardPrestadorServico
            codigo={item.codigo}
            nome={item.nome}
            tipoServico={item.tipoServico}
            endereco={item.endereco}
            onSelect={item.onSelect}
        /> 
    );

    return (
        <View style={styles.container}>
            <View style={styles.search_container}>
                <BarraPesquisa label="Pesquisar" />
            </View>

            <View>
                <FlatList
                    data={listaPrestadoresServico}
                    renderItem={({ item }) => renderCardPrestadorServico(item)}
                    keyExtractor={(item) => item.codigo.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}