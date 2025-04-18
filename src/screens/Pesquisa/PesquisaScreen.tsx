import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./PesquisaScreenStyle";
import { useEffect, useState } from "react";
import CardPrestadorServico from "../../components/card-prestador-servico/CardPrestadorServico";
import { RotasTabBar } from "../../models/interfaces/Interface";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PrestadorServico } from "../../models/PrestadorServico";
import { buscarPrestadoresServico } from "../../services/PrestadorServico.service";
import LottieView from 'lottie-react-native';
import { isNotEmpty } from "../../utils/ValidationUtil";
import { Feather } from "@expo/vector-icons";

export default function PesquisaScreen() {

    const [listaPrestadoresServico, setListaPrestadoresServico] = useState<PrestadorServico[]>([]);

    const navigation = useNavigation<NavigationProp<RotasTabBar>>();

    useEffect(() => {
        buscarPrestadores();
    }, []);

    async function buscarPrestadores(): Promise<void> {
        const listaPrestadoresServico: PrestadorServico[] = await buscarPrestadoresServico();
        setListaPrestadoresServico(listaPrestadoresServico);
    }

    function validarPossuiPrestadores(): boolean {
        return isNotEmpty(listaPrestadoresServico);
    }

    function renderCardPrestadorServico(prestador: PrestadorServico) {
        return (
            <CardPrestadorServico
                codigo={prestador.codigo ?? 0}
                nome={prestador.nome ?? 'Desconhecido'}
                descricaoTipoServico={prestador.descricaoTipoServico ?? 'Não informado'}
                logradouro={prestador.endereco?.logradouro || ''}
                nomeBairro={prestador.endereco?.nomeBairro || ''}
                onSelect={() => navigation.navigate('mapa')}
            />
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.containerBarraPesquisa}>
                    <TouchableOpacity style={styles.barraPesquisa}>
                        <Feather name='search' style={styles.iconeBarraPesquisa} />
                        <TextInput style={styles.inputBarraPesquisa} placeholder='Pesquisar' />
                    </TouchableOpacity>
                </View>

                {validarPossuiPrestadores() ?
                    (
                        <View>
                            <FlatList
                                data={listaPrestadoresServico}
                                renderItem={({ item }) => renderCardPrestadorServico(item)}
                                keyExtractor={(item) => item.codigo!.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    ) : (
                        <View style={styles.containerAnimacao}>
                            <LottieView
                                source={require('./../../../assets/animations/nenhum-resultado-encontrado.json')}
                                autoPlay={true}
                                style={styles.animacao}
                            />
                            <Text style={styles.textoAnimacao}> Opss! Nenhum resultado encontrado! </Text>
                        </View>
                    )
                }
                
            </View>
        </TouchableWithoutFeedback>
    );
}