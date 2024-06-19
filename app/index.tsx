import DashboardPageAdministrator from "@/components/DashboardPage/Administrator";
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

export default function Index() {

  const {data} = useSWR('/api/users',useFetcher);
  const {account} = useSession()

  const content = useMemo(()=>{
    switch (account?.level) {
      case 'administrator':
        return <DashboardPageAdministrator/>
      case 'staff':
        return <View><Text>administrator</Text></View>
      case 'user':
        return <View><Text>administrator</Text></View>
      default:
        return <DashboardPageAdministrator/>
    }
  },[])

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