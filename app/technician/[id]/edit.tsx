import TechnicianPageEdit from "@/components/TechnicianPage/Edit";
import Colors from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function AddTechnician() {
  return (
    <View style={style.container}>
      <TechnicianPageEdit/>
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
