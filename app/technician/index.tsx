import TechnicianPage from "@/components/TechnicianPage";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function technician() {
    return(
        <View style={style.container} >
            <TechnicianPage/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white
    }
})