import { FlatList, StyleSheet, View } from "react-native";
import Text from "../Text";
import useSWR from "swr";
import useFetcher, { ApiEndpoint } from "@/hooks/useFetcher";
import TechnicianPageSnippet from "./Snippet";
import Empty from "../Error/Empty";
import Button from "../Button";
import { AddCircle } from "iconsax-react-native";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useCallback } from "react";

export const technicianUrl = ()=>{
    const url  = new ApiEndpoint('/api/technician');
    return url.href
}

export default function TechnicianPage() {

    const {data,isLoading,mutate} = useSWR(technicianUrl(),useFetcher);

    const onRefresh = useCallback(()=>{
        mutate()
    },[mutate])

    if (isLoading) {
        return (
            <View style={[style.container,style.loading]} >
                <Text>Tunggu sebentar...</Text>
            </View>
        )
    }

    return(
        <View style={style.container} >
            <FlatList
                data={data.data}
                renderItem={({item})=><TechnicianPageSnippet item={item}/>}
                style={style.container}
                refreshing={isLoading}
                ListEmptyComponent={()=><Empty noun="Teknisi" />}
                onRefresh={()=>onRefresh()}
            />
            <View style={style.fab} >
                <Button style={style.fabButton} rounded="x-large" onPress={()=>router.navigate('/technician/add')} >
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
    loading:{
        alignItems:"center",
        justifyContent:"center",
        padding:10,
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