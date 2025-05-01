import { View } from "react-native";
import { styles } from "./LoaderStyle";
import LottieView from 'lottie-react-native';

export default function Loader(): JSX.Element {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('./../../../assets/animations/loading.json')}
                autoPlay={true}
                style={styles.animacao}
            />
        </View>
    );
}