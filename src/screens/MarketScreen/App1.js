import { StyleSheet, View } from 'react-native';
import UploadScreen from './UploadScreen';

export default function App1() {
    return (
        <View style={styles.container}>
            <UploadScreen/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})