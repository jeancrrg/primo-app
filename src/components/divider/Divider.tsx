import { Text, View } from "react-native";
import { styles } from "./DividerStyle";
import { isNotEmpty } from "../../utils/ValidationUtil";

export default function Divider({ texto }: { texto?: string }): JSX.Element {
    return (
        <View style={styles.container}>
            <View style={styles.divider} />

            {isNotEmpty(texto) && (
                <>
                    <Text style={styles.textoDivider}> {texto} </Text>
                    <View style={styles.divider} />
                </>
            )}
        </View>
    );
}