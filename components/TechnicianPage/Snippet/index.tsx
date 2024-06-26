import Button from "@/components/Button";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import { useAPI } from "@/hooks/useFetcher";
import { Call, Edit, Edit2, PenTool, Trash } from "iconsax-react-native";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { technicianUrl } from "../index";
import { useSWRConfig } from "swr";
import { router } from "expo-router";

interface Props {
    item:any
}

export default function TechnicianPageSnippet({item}:Props) {

    const [deleted,setDeleted] = useState<boolean>(false);
    const {mutate} = useSWRConfig()

    const onDelete = useCallback(()=>{
        Alert.alert('Perhatian','Apakah anda yakin untuk menghapus data ini?',[
            {
                text:'Batalkan'
            },
            {
                text:'Ya, Lanjutkan',
                onPress:()=>{
                    setDeleted(true)
                    useAPI('DELETE',`/api/technician/${item.id}`).then(()=>{
                        mutate(technicianUrl())
                    }).catch(e=>{
                        Alert.alert('Terjadi Kesalahan',`Gagal untuk menghapus data ini, ${e.firstMessage}`);
                        setDeleted(false)
                    })
                }
            }
        ])
    },[]);

    if (deleted) {
        return null
    }

    return(
        <View style={style.container} >
            <TouchableOpacity style={style.content} >
                <Text weight="Medium" size={18} >{item.name}</Text>
                <Text color="textSecondary" size={12} >{item.phone || 'Tidak ada nomor telepon'}</Text>
            </TouchableOpacity>
            <View style={style.action} >
                {
                    item.phone && 
                    <Button bordered rounded="x-large" size="small" style={style.call} >
                        <Call size={15} variant="Bulk" color={Colors.primary} />
                    </Button>
                }
                <Button onPress={()=>router.navigate({pathname:'/technician/[id]/edit',params:{id:item.id}})} bordered rounded="x-large" size="small" style={style.call} >
                    <Edit2 size={15} variant="Bulk" color={Colors.primary} />
                </Button>
                <Button onPress={onDelete} bordered rounded="x-large" size="small" style={style.call} color="danger" >
                    <Trash size={15} variant="Bulk" color={Colors.danger} />
                </Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        margin:15,
        borderBottomWidth:1,
        borderBlockColor:Colors.grey1,
        paddingBottom:15,
        marginBottom:0,
    },
    content:{
        flex:1,
    },
    action:{
        flexDirection:"row",
        alignItems:"center",
        gap:10,
    },
    call:{
        paddingHorizontal:15,
        paddingVertical:10,
    }
})