import Button from "@/components/Button";
import Input from "@/components/Input";
import { technicianUrl } from "@/components/TechnicianPage";
import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import useFetcher, { ApiEndpoint, useAPI } from "@/hooks/useFetcher";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import useSWR, { useSWRConfig } from "swr";

export const technicianDetailUrl = (id:string)=>{
    const url  = new ApiEndpoint(`/api/technician/${id}`);
    return url.href
}

export default function AddTechnician() {

  const routeParams = useLocalSearchParams();
  const { mutate } = useSWRConfig();
  const {data} = useSWR(technicianDetailUrl(routeParams.id as string),useFetcher)
    
  const [name,setName] = useState<string>('');
  const [address,setAddress] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [email,setEmail] = useState<string>('');

  const [loading,setLoading] = useState<boolean>(false);

  
  const onEdit = useCallback(()=>{
    const params = {
      name,
      address,
      email,
      phone,
    }

    setLoading(true)
    useAPI('PATCH',`/api/technician/${routeParams.id}`,params).then(response=>{
      setLoading(false);
      Alert.alert('Berhasil!',`Berhasil melakukan pembaharuan data teknisi`);
      mutate(technicianUrl()).then(()=>{
        mutate(technicianDetailUrl(routeParams.id as string))
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

  useEffect(()=>{
    setName(data.data.name)
    setAddress(data.data.email)
    setPhone(data.data.phone)
    setEmail(data.data.email)
  },[data.data])

  return (
    <View style={style.container}>
      <Input
        label="Nama Lengkap"
        color="primary"
        value={name}
        onChangeText={(value) => {
          setName(value)
        }}
        containerStyle={style.input}
      />
      <Input
        label="Alamat Email"
        containerStyle={style.input}
        value={email}
        color="primary"
        onChangeText={(value) => {
          setEmail(value)
        }}
      />
      <Input
        label="Nomor Telepon"
        containerStyle={style.input}
        value={phone}
        color="primary"
        onChangeText={(value) => {
          setPhone(value)
        }}
      />
      <Input
        label="Alamat Lengkap"
        containerStyle={style.input}
        value={address}
        multiline
        color="primary"
        onChangeText={(value) => {
          setAddress(value)
        }}
      />
      <Button label="Tambahkan" onPress={onEdit} loading={loading} />
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
