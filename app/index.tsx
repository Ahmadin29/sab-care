import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import useFetcher from "@/hooks/useFetcher";
import { StyleSheet, View } from "react-native";
import useSWR from "swr";

export default function Index() {

  const {data} = useSWR('/api/users',useFetcher)

  return(
    <View style={style.container} >
      <Text>{JSON.stringify(data)}</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.white
  }
})