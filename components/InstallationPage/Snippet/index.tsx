import Button from "@/components/Button";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import { Call, More } from "iconsax-react-native";
import { StyleSheet, View } from "react-native";

interface Props {
    item:any
}

export default function InstallationPageSnippet({item}:Props) {
    return(
        <View style={styles.container} >
            <View style={styles.status} >
                <Text style={styles.statusText} >{item.status}</Text>
            </View>
            <View style={styles.installation} >
                <Text>Alamat : {item.address}</Text>
            </View>

            <Text weight="Medium">Customer</Text>
            <View style={styles.customer} >
                <View>
                    <Text>{item.customer.name}</Text>
                    <Text>{item.customer.phone}</Text>
                </View>
                <View style={styles.customerActions} >
                    <Button
                        bordered
                        size="small"
                        style={styles.customerCall}
                    >
                        <Call size={20} variant="Bulk" color={Colors.primary} />
                    </Button>
                    <Button
                        bordered
                        size="small"
                        style={styles.customerCall}
                    >
                        <More size={20} variant="TwoTone" color={Colors.primary} />
                    </Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:15,
        margin:15,
        marginBottom:0,
        borderWidth:1,
        borderRadius:10,
        borderColor:Colors.grey1
    },
    status:{
        flexDirection:"row"
    },
    statusText:{
        padding:1,
        backgroundColor:Colors.primary,
        paddingHorizontal:10,
        fontSize:10,
        borderRadius:10,
        color:Colors.white,
        marginBottom:10,
    },
    installation:{
        marginBottom:10,
    },
    customer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    customerActions:{
        flexDirection:"row",
        gap:10
    },
    customerCall:{
        padding:5,
        paddingHorizontal:15,
        borderRadius:100,
    }
})