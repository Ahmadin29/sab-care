import Colors from "@/constants/Colors";
import { EmojiSad } from "iconsax-react-native";
import { StyleSheet, View } from "react-native";
import Text from "../Text";

interface Props{
    noun?:string
}

export default function Empty({noun}:Props) {
    return(
        <View style={style.container} >
            <EmojiSad size={48} variant="Bulk" color={Colors.grey2} />
            <Text weight="Medium" size={20} >Tidak ada {noun || 'Data'}</Text>
            <Text style={style.message} color="textSecondary" size={15} >Kami tidak memiliki {noun || 'Data'} untuk ditampilkan</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:50,
    },
    message:{
        textAlign:"center"
    }
})