import Button from "@/components/Button";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import Layouts from "@/constants/Layouts";
import useFetcher, { ApiEndpoint } from "@/hooks/useFetcher";
import useSession from "@/hooks/useSession";
import { router } from "expo-router";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import useSWR from "swr";

const installationURL = ()=>{
    const url  = new ApiEndpoint('/api/installation-request');
    return url.href
}

export default function Installation() {

    const {account} = useSession();

    const {data} = useSWR(installationURL(),useFetcher);
    const isHasInstallation = useMemo(()=>{
        if (data?.data) {
            return Boolean(data?.data?.[0])
        }

        return false
    },[data?.data])

    if (account?.role !== 'customer') {
        return null
    }

    if (isHasInstallation) {
        return(
            <Text>asd</Text>
        )
    }

    return(
        <View style={styles.container} >
            <Text style={styles.header} size={18} weight="Medium" >Pemasangan Baru</Text>
            <Text>Anda belum mengajukan pemasangan saluran, ajukan pemasangan saluran Air baru ke rumah anda sekarang!</Text>
            <Button
                style={styles.button}
                label="Ajukan Sekarang"
                onPress={()=>router.navigate('/installation/request')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:Layouts.width - 30,
        padding:15,
        backgroundColor:Colors.primary + 33,
        borderRadius:5,
        borderWidth:1,
        borderColor:Colors.primary,
    },
    header:{
        marginBottom:5,
    },
    button:{
        marginTop:15,
    }
})