import TechnicianPageAdd from "@/components/TechnicianPage/Add";
import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function AddTechnician() {
  return (
    <View style={style.container}>
      <TechnicianPageAdd/>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  input:{
    marginBottom:15,
  }
});
