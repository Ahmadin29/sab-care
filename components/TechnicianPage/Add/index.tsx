import Button from "@/components/Button";
import Input from "@/components/Input";
import { technicianUrl } from "@/components/TechnicianPage";
import Colors from "@/constants/Colors";
import { useAPI } from "@/hooks/useFetcher";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useSWRConfig } from "swr";

export default function TechnicianPageAdd() {

  const { mutate } = useSWRConfig()
    
  const [name,setName] = useState<string>('');
  const [address,setAddress] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [email,setEmail] = useState<string>('');

  const [loading,setLoading] = useState<boolean>(false);

  const onRegister = useCallback(()=>{
    const params = {
      name,
      address,
      email,
      phone,
    }

    setLoading(true)
    useAPI('POST','/api/technician',params).then(response=>{
      setLoading(false);
      Alert.alert('Berhasil!',`Berhasil melakukan pendaftaran teknisi`);

      setName('')
      setAddress('')
      setPhone('')
      setEmail('')

      mutate(technicianUrl()).then(()=>{
        router.back()
      })
    }).catch(error=>{   
      setLoading(false);
      if (error.firstMessage) {
        Alert.alert('Perhatian!', error.firstMessage);
        return;
      }

      Alert.alert('Perhatian!', 'Gagal untuk melakukan pendaftaran teknisi, harap hubungi developer')
    })
  },[name,address,email,phone])

  return (
    <View style={style.container}>
      <Input
        label="Nama Lengkap"
        color="primary"
        onChangeText={(value) => {
          setName(value)
        }}
        containerStyle={style.input}
      />
      <Input
        label="Alamat Email"
        containerStyle={style.input}
        color="primary"
        onChangeText={(value) => {
          setEmail(value)
        }}
      />
      <Input
        label="Nomor Telepon"
        containerStyle={style.input}
        color="primary"
        onChangeText={(value) => {
          setPhone(value)
        }}
      />
      <Input
        label="Alamat Lengkap"
        containerStyle={style.input}
        multiline
        color="primary"
        onChangeText={(value) => {
          setAddress(value)
        }}
      />
      <Button label="Tambahkan" onPress={onRegister} loading={loading} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding:15,
  },
  input:{
    marginBottom:15,
  }
});
