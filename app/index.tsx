import DashboardPageProfile from "@/components/DashboardPage/Profile";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import useFetcher from "@/hooks/useFetcher";
import useSession from "@/hooks/useSession";
import { router } from "expo-router";
import { useMemo, version } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Constants from 'expo-constants';
import useSWR from "swr";
import DashboardPage from "@/components/DashboardPage";

export default function Index() {

  const {data} = useSWR('/api/users',useFetcher);

  const content = useMemo(()=><DashboardPage/>,[])

  return (
    <View style={style.container} >
      <DashboardPageProfile/>
      {content}
      <View style={style.version} >
        <Text size={10} color="textSecondary" >SAB Care - v{Constants.expoConfig?.version}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.white,
    paddingTop:50,
  },
  version:{
    padding:10,
    alignItems:"center"
  }
})