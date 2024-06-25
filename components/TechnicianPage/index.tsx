import { FlatList, StyleSheet, View } from "react-native";
import Text from "../Text";
import useSWR from "swr";
import useFetcher, { ApiEndpoint } from "@/hooks/useFetcher";
import TechnicianPageSnippet from "./Snippet";
import { technicianModel } from "@/models/technician";
import Empty from "../Error/Empty";
import Button from "../Button";
import { Add, AddCircle } from "iconsax-react-native";
import Colors from "@/constants/Colors";

const technicianUrl = ()=>{
    const url  = new ApiEndpoint('/api/technician');
    return url.href
}

export default function TechnicianPage() {

    const {data,isLoading} = useSWR(technicianUrl(),useFetcher);

    if (isLoading) {
        return (
            <View>
                <Text>Tunggu sebentar...</Text>
            </View>
        )
    }

    return(
        <View style={style.container} >
            <FlatList
                data={data.data.data}
                renderItem={({item})=><TechnicianPageSnippet item={item}/>}
                style={style.container}
                ListEmptyComponent={()=><Empty noun="Teknisi" />}
            />
            <View style={style.fab} >
                <Button style={style.fabButton} rounded="x-large" >
                    <AddCircle size={24} color={Colors.white} variant="Bulk" />
                    <Text color="white" style={style.fabText} >Baru</Text>
                </Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    fab:{
        padding:15,
        position:"absolute",
        bottom:20,
        right:0,
    },
    fabButton:{
        flexDirection:"row",
        paddingHorizontal:20,
        paddingVertical:10,
    },
    fabText:{
        marginLeft:10,
    }
})