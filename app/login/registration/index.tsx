import { Alert, Image, ScrollView, StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import Text from "@/components/Text";
import { router, Stack } from "expo-router";
import Colors from "@/constants/Colors";
import Input from "@/components/Input";
import Button from "@/components/Button";
import * as DocumentPicker from 'expo-document-picker';
import { Folder } from "iconsax-react-native";
import { useCallback, useMemo, useState } from "react";
import { isEmpty } from "lodash";
import { useAPI } from "@/hooks/useFetcher";

export default function Registration() {

  const [loading,setLoading] = useState<boolean>(false);
  const [name,setName] = useState<string>("");
  const [email,setEmail] = useState<string>("");
  const [phone,setPhone] = useState<string>("");
  const [address,setAddress] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [confirmPassword,setConfirmPassword] = useState<string>("");
  const [documentNumber,setDocumentNumber] = useState<string>("");
  const [document,setDocument] = useState<any>({});

  const onDocumentPick = useCallback(()=>{
    DocumentPicker.getDocumentAsync({
      copyToCacheDirectory:true,
      type:'image/*'
    }).then(file=>{
      if (!file.canceled) {          
        const { name, size, uri } = file.assets[0];
        const nameParts = name.split('.');
        const fileType = nameParts[nameParts.length - 1];
        const fileToUpload = {
          name: name,
          size: size,
          uri: uri,
          type: "application/" + fileType
        };

        setDocument(fileToUpload)
      } 
    })
  },[])

  const renderDocument = useMemo(()=>{
    if (document?.uri) {
      return(
        <Image
          source={{uri:document?.uri}}
          style={style.document}
          resizeMode="cover"
        />
      )
    }else{
      return(
        <>
          <Folder size={24} variant="Bulk" color={Colors.primary} />
          <Text style={style.fileText} >Upload KTP</Text>
        </>
      )
    }
  },[document?.uri])

  const onRegister = useCallback(()=>{
    if (password !== confirmPassword) {
      Alert.alert('Perhatian','Konfirmasi password anda tidak sesuai, perika kembali password dan konfirmasi password anda')
      return;
    }

    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(phone) ||
      isEmpty(address) ||
      isEmpty(documentNumber) ||
      isEmpty(document)) {
      Alert.alert('Perhatian','Pastikan anda sudah mengisi semua data')
      return;
    }

    const params = {
      name,
      email,
      password,
      phone,
      address,
      ktp_number:documentNumber,
      ktp_photo:document,
    }

    setLoading(true)
    useAPI('POST','/api/register',params).then(response=>{
      setLoading(false);
      router.navigate('/login')
      Alert.alert('Berhasil!',`Berhasil melakukan pendaftaran dengan email ${email}, silahkan login untuk melanjutkan`)
    }).catch(error=>{   
      setLoading(false);
      if (error.firstMessage) {
        Alert.alert('Perhatian!', error.firstMessage);
        return;
      }

      Alert.alert('Perhatian!', 'Gagal untuk melakukan pendaftaran, harap hubungi petugas')
    })
    
  },[name,email,password,confirmPassword,phone,address,documentNumber,document])

  return(
    <>
      <Stack.Screen options={{title:'Pendaftaran Baru',headerBackTitle:'Kembali'}} />
      <ScrollView style={style.container} >
        <Input
          label="Nama Lengkap"
          color='primary'
          onChangeText={(value)=>{
            setName(value)
          }}
        />
        <Input
          label="Alamat Email"
          color='primary'
          containerStyle={style.input}
          onChangeText={(value)=>{
            setEmail(value)
          }}
        />
        <Input
          label="Alamat Lengkap"
          color='primary'
          containerStyle={style.input}
          onChangeText={(value)=>{
            setAddress(value)
          }}
        />
        <Input
          label="Nomor Telepon"
          color='primary'
          containerStyle={style.input}
          onChangeText={(value)=>{
            setPhone(value)
          }}
        />
        <Input
          label="Password"
          color='primary'
          isPassword
          containerStyle={style.input}
          onChangeText={(value)=>{
            setPassword(value)
          }}
        />
        <Input
          label="Konfirmasi Password"
          color='primary'
          isPassword
          containerStyle={style.input}
          onChangeText={(value)=>{
            setConfirmPassword(value)
          }}
        />
        <Input
          label="Nomor KTP"
          color='primary'
          containerStyle={style.input}
          onChangeText={(value)=>{
            setDocumentNumber(value)
          }}
        />
        <TouchableOpacity style={style.file} onPress={onDocumentPick} >
          {renderDocument}
        </TouchableOpacity>
        <Button loading={loading} label="Daftar" style={style.button} onPress={()=>{
          Alert.alert('Perhatian!','Apakah anda yakin untuk melanjutkan pendaftaran dengan data ini?',[
            {text:'Batalkan'},
            {text:'Ya, Lanjutkan',onPress:()=>onRegister()}
          ])
        }} />
      </ScrollView>
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
  file:{
    borderWidth:1,
    borderColor:Colors.grey2,
    borderRadius:10,
    marginTop:15,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height:200,
    overflow:"hidden"
  },
  fileText:{
    marginLeft:10,
  },
  document:{
    width:"100%",
    height:200,
  }
})