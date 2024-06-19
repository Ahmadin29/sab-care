import { StyleSheet, View } from "react-native";
import Text from "@/components/Text";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Registration() {
  return(
    <>
      <Stack.Screen options={{title:'Pendaftaran Baru'}} />
      <View style={style.container} >
        <Input
          label="Nama Lengkap"
          color='primary'
        />
        <Input
          label="Alamat Email"
          color='primary'
          containerStyle={style.input}
        />
        <Input
          label="Nomor Telepon"
          color='primary'
          containerStyle={style.input}
        />
        <Input
          label="Password"
          color='primary'
          isPassword
          containerStyle={style.input}
        />
        <Input
          label="Konfirmasi Password"
          color='primary'
          isPassword
          containerStyle={style.input}
        />
        <Button label="Daftar" style={style.button} />
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    padding:15,
    backgroundColor:Colors.white
  },
  input:{
    marginTop:15,
  },
  button:{
    marginTop:30,
  },
})