import { View } from "react-native";
import { styles } from "./LoadingStyle";
import LottieView from 'lottie-react-native';

export default function Loading() {
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