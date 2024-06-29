import { StyleSheet, View } from "react-native";
import Text from "../Text";
import Colors from "@/constants/Colors";

export default function InstallationPage() {
    return(
        <View style={styles.container} >
            <Text>asd</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white
    }
})