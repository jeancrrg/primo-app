import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "../../../assets/styles/Colors";
import { styles } from "./ModalAvatarStyle";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Surface } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { Avatar } from "../../models/cadastro/Avatar.model";
import { buscarAvatares, obterImagemAvatar } from "../../services/Avatar.service";
import Toast from "react-native-toast-message";
import { PropsModalAvatar } from "../../models/interfaces/props/PropsModalAvatar.interface";

export default function ModalAvatar(props: PropsModalAvatar): JSX.Element {

    const [listaAvatares, setListaAvatares] = useState<Avatar[]>();

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['50%'], []);

    useEffect(() => {
        carregarAvatares();
    }, []);

    async function carregarAvatares(): Promise<void> {
        try {
            const avatares: Avatar[] = await buscarAvatares();
            setListaAvatares(avatares.reverse());
        } catch(error: any) {
            Toast.show({ type: 'erro', text1: 'ERRO', text2: error.message});
        }
    }

    function fecharOpcoesAvatares(): void {
        bottomSheetRef.current?.close();
        props.onClose();
    }

    function renderAvatar(avatar: Avatar): JSX.Element {
        return (
            <TouchableOpacity onPress={() => selecionarAvatar(avatar)}>
                <Image source={obterImagemAvatar(avatar.codigo)} style={styles.avatarOpcao} />
            </TouchableOpacity>
        );
    }

    async function selecionarAvatar(avatar: Avatar): Promise<void> {
        props.onSelecionarAvatar(avatar.codigo!);
        fecharOpcoesAvatares();
    }

    return (
        <View style={styles.containerBottomSheet}>
            <TouchableWithoutFeedback onPress={fecharOpcoesAvatares}>
                <View style={styles.sombraBottomSheet} />
            </TouchableWithoutFeedback>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={() => fecharOpcoesAvatares()}
                backgroundStyle={{ backgroundColor: Colors.cinzaClaro }}>

                <Surface elevation={5} style={styles.containerEscolhaAvatares}>
                    <Text style={styles.tituloEscolhaAvatar}> Escolha seu avatar: </Text>

                    <FlatList
                        data={listaAvatares}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => renderAvatar(item)}
                        keyExtractor={(avatar) => avatar.codigo!.toString()}
                        columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 16 }}
                    />
                </Surface>
            </BottomSheet>
        </View>
    );
}