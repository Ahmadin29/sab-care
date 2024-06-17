import { Image, StyleSheet, View } from "react-native";
import { Stack } from 'expo-router';
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Login() {
  return(
    <>
      <Stack.Screen options={{headerShown:false}} />
      <View style={style.container} >
        <Image
          source={require('@/assets/images/login/background.jpeg')}
          style={{
            width:"100%",
            height:200,
            objectFit:'cover',
          }}
        />
        <View style={style.content} >
          <Text weight="Medium" size={20}>Login</Text>
          <Text color="textSecondary">Anda harus login untuk bisa melanjutkan</Text>
          <View style={style.form} >
            <Input
              label="Alamat Email"
              color='primary'
            />
            <Input
              color='primary'
              label="Password"
              containerStyle={style.input}
              isPassword
            />
            <Button label="Masuk" style={style.button} />
            <View style={style.divider} >
              <Text color="textSecondary" >Atau</Text>
            </View>
            <Button bordered label="Daftar"/>
          </View>
        </View>
      </View>
    </>
  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
  },
  content:{
    padding:15,
  },
  form:{
    marginTop:20,
  },
  input:{
    marginTop:10,
  },
  button:{
    marginTop:30,
  },
  divider:{
    marginVertical:15,
    alignItems:"center"
  }
})