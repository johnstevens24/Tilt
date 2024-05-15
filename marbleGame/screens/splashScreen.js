import { StyleSheet, Text, View, Button, Animated, Dimensions, TouchableOpacity} from 'react-native';


export default function SplashScreen({navigation}) {
    return(
        <View>
            <Text>Hi!</Text>
            <Button title="go to game" onPress={() => {navigation.navigate("SelectMap")}}></Button>
        </View>
    )
}