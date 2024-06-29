import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import Layouts from "@/constants/Layouts";
import useSession from "@/hooks/useSession";
import { router } from "expo-router";
import { Bill, LocationAdd, LogoutCurve, NoteText, Setting2, UserTick } from "iconsax-react-native";
import { useMemo } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import Installation from "./Installation";

type MenuProps = {
  label:any,
  allowed?:string[],
  icon:any,
  onPress?:()=>void,
  style:any,
  route?:string,
}

const ALL_MENU:MenuProps[] = [
  {
    label:'Laporan Bulanan',
    icon:<NoteText size={100} color={Colors.white} variant="Bulk" />,
    route:'/report',
    allowed:['admin'],
    style:{
      backgroundColor:Colors.primary,
      color:Colors.white
    }
  },
  {
    label:'Teknisi',
    icon:<Setting2 size={100} color={Colors.white} variant="Bulk" />,
    route:'/technician',
    allowed:['admin'],
    style:{
      backgroundColor:Colors.secondary,
      color:Colors.white
    }
  },
  {
    label:'Pelanggan',
    icon:<UserTick size={100} color={Colors.white} variant="Bulk" />,
    route:'/users',
    allowed:['admin'],
    style:{
      backgroundColor:Colors.warning,
      color:Colors.white
    }
  },
  {
    label:'Tugas Pemasangan',
    icon:<LocationAdd size={100} color={Colors.white} variant="Bulk" />,
    route:'/installation',
    allowed:['technician'],
    style:{
      backgroundColor:Colors.warning,
      color:Colors.white
    }
  },
  {
    label:'Tagihan',
    icon:<Bill size={100} color={Colors.white} variant="Bulk" />,
    route:'/users',
    allowed:['customer'],
    style:{
      backgroundColor:Colors.warning,
      color:Colors.white
    }
  },
]

export default function DashboardPage() {

  const {account,onLoggedOut} = useSession();  
  const role = account?.role || 'administrator';

  const allowedMenu = useMemo(()=>{
    return ALL_MENU.filter(menu=>menu.allowed?.includes(role))
  },[role])

  const MENU:MenuProps[] = [
    ...allowedMenu,
    {
      label:'Keluar',
      icon:<LogoutCurve scaleX={-1} size={100} color={Colors.white} variant="Bulk" />,
      onPress:()=>{
        Alert.alert('Perhatian!','Apakah anda yakin untuk keluar?',[
          {
            text:'Batalkan',
          },
          {
            text:'Ya, Keluar',
            onPress:()=>onLoggedOut()
          }
        ])
      },
      style:{
        backgroundColor:Colors.danger,
        color:Colors.white
      }
    }
  ]

  const renderMenu = useMemo(()=>{
    return MENU.map((item,index)=>(
      <TouchableOpacity key={index} style={[
        styles.item,
        item.style,
      ]} onPress={()=>{
        if (item.onPress) {
          item.onPress();
          return;
        }
        router.navigate(item.route as string)
      }} >
        <View style={styles.itemIcon} >
          {item.icon}
        </View>
        <Text size={18} weight="Medium" color="white" >{item.label}</Text>
      </TouchableOpacity>
    ))
  },[MENU]);

  return(
    <View style={styles.container} >
      <Installation/>
      {renderMenu}
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:15,
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between",
    columnGap:20,
    rowGap:20,
  },
  item:{
    padding:10,
    alignItems:"baseline",
    justifyContent:"flex-end",
    flex:1,
    minWidth:(Layouts.width / 2) - 25,
    height:(Layouts.width / 2) - 25,
    borderRadius:5,
    overflow:"hidden",
  },
  itemIcon:{
    position:"absolute",
    top:-50,
    right:-50,
    backgroundColor:Colors.white+'22',
    borderRadius:100,
    width:200,
    height:200,
    alignItems:"center",
    justifyContent:"center",
    borderWidth:30,
    borderColor:Colors.white+'11'
  }
})