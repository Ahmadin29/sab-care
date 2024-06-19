import Text from "@/components/Text";
import { Image, StyleSheet, View } from "react-native";

export default function DashboardPageProfile() {
  return(
    <View style={style.container} >
      <Image
        source={{uri:"https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg"}}
        style={style.avatar}
      />
      <Text size={20} weight="Medium" >Hi, Administrator</Text>
      <Text color="textSecondary">Selamat datang di Dashboard</Text>
    </View>
  )
}

const style = StyleSheet.create({
  container:{
    padding:15,
  },
  avatar:{
    width:50,
    height:50,
    borderRadius:100,
    marginBottom:10,
  }
})