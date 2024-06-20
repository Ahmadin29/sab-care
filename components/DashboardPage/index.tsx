import Text from "@/components/Text";
import Colors from "@/constants/Colors";
import Layouts from "@/constants/Layouts";
import useSession from "@/hooks/useSession";
import { Additem, Bill, BoxAdd, CardAdd, LocationAdd, Logout, LogoutCurve, NoteRemove, NoteSquare, NoteText, Setting2, UserSearch, UserTick } from "iconsax-react-native";
import { useMemo } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const ALL_MENU = [
  {
    label:'Laporan Bulanan',
    icon:<NoteText size={100} color={Colors.white} variant="Bulk" />,
    route:'/report',
    allowed:['administrator'],
    style:{
      backgroundColor:Colors.primary,
      color:Colors.white
    }
  },
  {
    label:'Teknisi',
    icon:<Setting2 size={100} color={Colors.white} variant="Bulk" />,
    route:'/staff',
    allowed:['administrator'],
    style:{
      backgroundColor:Colors.secondary,
      color:Colors.white
    }
  },
  {
    label:'Pelanggan',
    icon:<UserTick size={100} color={Colors.white} variant="Bulk" />,
    route:'/users',
    allowed:['administrator'],
    style:{
      backgroundColor:Colors.warning,
      color:Colors.white
    }
  },
  {
    label:'Tugas Pemasangan',
    icon:<LocationAdd size={100} color={Colors.white} variant="Bulk" />,
    route:'/task',
    allowed:['staff'],
    style:{
      backgroundColor:Colors.warning,
      color:Colors.white
    }
  },
  {
    label:'Tagihan',
    icon:<Bill size={100} color={Colors.white} variant="Bulk" />,
    route:'/users',
    allowed:['user'],
    style:{
      backgroundColor:Colors.primary,
      color:Colors.white
    }
  },
]

type MenuProps = {
  label:any,
  allowed?:string[],
  icon:any,
  onPress?:()=>void,
  style:any,
}

export default function DashboardPage() {

  const {account,onLoggedOut} = useSession();
  const role = account?.role || 'user';

  const allowedMenu = useMemo(()=>{
    return ALL_MENU.filter(menu=>menu.allowed.includes(role))
  },[])

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
      }} >
        <View style={styles.itemIcon} >
          {item.icon}
        </View>
        <Text size={18} weight="Medium" color="white" >{item.label}</Text>
      </TouchableOpacity>
    ))
  },[])

  return(
    <View style={styles.container} >
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