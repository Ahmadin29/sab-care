import { FlatList, StyleSheet, View } from "react-native";
import Text from "../Text";
import Colors from "@/constants/Colors";
import useFetcher, { ApiEndpoint } from "@/hooks/useFetcher";
import useSWR from "swr";
import InstallationPageSnippet from "./Snippet";

const installationURL = ()=>{
    const url  = new ApiEndpoint('/api/installation-request');
    return url.href
}

export default function InstallationPage() {

    const {data,isLoading,mutate} = useSWR(installationURL(),useFetcher)

    return(
        <View style={styles.container} >
            <FlatList
                data={data.data}
                renderItem={({item})=><InstallationPageSnippet item={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.white
    }
})