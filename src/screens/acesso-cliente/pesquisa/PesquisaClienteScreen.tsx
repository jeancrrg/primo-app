import { FlatList, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./PesquisaClienteScreenStyle";
import { useEffect, useState } from "react";
import LottieView from 'lottie-react-native';
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { PrestadorServico } from "../../../models/cadastro/PrestadorServico.model";
import { buscarPrestadoresServico } from "../../../services/Prestador.service";
import { isEmpty, isNotEmpty } from "../../../utils/ValidationUtil";
import CardPrestadorServico from "../../../components/card-prestador-servico/CardPrestadorServico";
import Loader from "../../../components/loader/Loader";
import { navegarParaTela } from "../../../utils/NavigationUtil";
import { RotaTabsEnum } from "../../../models/enum/RotaTabs.enum";

export default function PesquisaClienteScreen(): JSX.Element {

    const [loading, setLoading] = useState<boolean>(false);
    const [termoPesquisa, setTermoPesquisa] = useState<string>('');
    const [listaPrestadoresServico, setListaPrestadoresServico] = useState<PrestadorServico[]>([]);

    useEffect(() => {
        buscarPrestadores();
    }, []);

    async function buscarPrestadores(): Promise<void> {
        try {
            setLoading(true);
            const listaPrestadoresServico: PrestadorServico[] = await buscarPrestadoresServico();
            setListaPrestadoresServico(listaPrestadoresServico);
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    function validarPossuiPrestadores(): boolean {
        return isNotEmpty(listaPrestadoresServico);
    }

    function renderCardPrestadorServico(prestador: PrestadorServico): JSX.Element {
        return (
            <CardPrestadorServico
                codigo={prestador.codigo ?? 0}
                nome={prestador.nome ?? 'Desconhecido'}
                descricaoTipoServico={prestador.descricaoTipoServico ?? 'Não informado'}
                logradouro={prestador.endereco.logradouro || ''}
                nomeBairro={prestador.endereco.nomeBairro || ''}
                codigoAvatar={prestador.codigoAvatar}
                onSelect={() => navegarParaTela(RotaTabsEnum.MAPA)}
            />
        );
    }

    async function pesquisar(termoPesquisa: string): Promise<void> {
        try {
            const prestadoresServico: PrestadorServico[] = await buscarPrestadoresServico(termoPesquisa);
            if (isEmpty(prestadoresServico)) {
                Toast.show({ type: 'info', text1: 'INFORMAÇÃO', text2: 'Nenhum prestador de serviço encontrado!' });
            }
            setListaPrestadoresServico(prestadoresServico);
        } catch (error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {loading ? (
                <Loader />
            ) : (
                <View style={styles.container}>
                    <View style={styles.barraPesquisa}>
                        <Feather name='search' style={styles.iconeBarraPesquisa} />
                        <TextInput 
                            placeholder='Pesquisar' 
                            returnKeyType="search" 
                            value={termoPesquisa}
                            onChangeText={setTermoPesquisa}
                            style={styles.inputBarraPesquisa}
                            onSubmitEditing={() => pesquisar(termoPesquisa)}
                        />
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
                                    source={require('./../../../../assets/animations/nenhum-resultado-encontrado.json')}
                                    autoPlay={true}
                                    style={styles.animacao}
                                />
                                <Text style={styles.textoAnimacao}> Opss! Nenhum resultado encontrado! </Text>
                            </View>
                        )
                    }
                </View>
            )}
        </TouchableWithoutFeedback>
    );
}