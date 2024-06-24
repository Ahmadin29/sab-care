import { Alert, Image, StyleSheet, View } from "react-native";
import { Stack,router } from 'expo-router';
import Text from "@/components/Text";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useCallback, useState } from "react";
import useSession from "@/hooks/useSession";
import useFetcher, { useAPI } from "@/hooks/useFetcher";

export default function Login() {

  const [email,setEmail] = useState<string>('');
  const [password,setPassword] = useState<string>('');

  const {setSession} = useSession()

  const onRegister = useCallback(()=>{
    return router.push('/login/registration')
  },[])

  const onLogin = useCallback(()=>{
    useAPI('POST','/api/login',{
      email:email,
      password:password,
    }).then(response=>{
      console.log(response,'asda');
    }).catch(error=>{      
      if (error.firstMessage) {
        Alert.alert('Perhatian!', error.firstMessage)
      }
    })
  },[email,password])

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
              onChangeText={(value)=>{
                setEmail(value)
              }}
            />
            <Input
              color='primary'
              label="Password"
              containerStyle={style.input}
              isPassword
              onChangeText={(value)=>{
                setPassword(value)
              }}
            />
            <Button label="Masuk" style={style.button} onPress={onLogin} />
            <View style={style.divider} >
              <Text size={12} color="textSecondary" >Atau</Text>
            </View>
            <Button onPress={onRegister} bordered label="Pendaftaran Baru"/>
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