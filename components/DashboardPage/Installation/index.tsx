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

export const installationURL = ()=>{
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
        const installation = data?.data?.[0];
        return(
            <View style={[
                styles.container,
                {
                    backgroundColor:Colors.secondary+22,
                    borderColor:Colors.secondary,
                }
            ]} >
                <Text style={styles.header} size={18} weight="Medium" >Pemasangan Baru</Text>
                <Text>Kami sedang memproses pemasangan kamu, pihak kami akan segera menghubungi kamu bila diperlukan.</Text>

                <View style={styles.installation} >
                    <Text size={15} weight="Medium" >Data Pemasangan</Text>
                    <Text>Alamat : {installation?.address} </Text>
                    <Text>Status : {installation?.status} </Text>
                </View>
            </View>
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
    },
    installation:{
        marginTop:10,
    }
})