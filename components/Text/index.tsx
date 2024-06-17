import Colors from "@/constants/Colors";
import * as React from "react";
import { Text as TextNative } from "react-native";
import { TextStyle } from "react-native";

interface TextProps {
  children : any,
  weight?  : 'Regular' | 'Bold' | 'Light' | 'Medium',
  family?  : string,
  size?    : number,
  elipsis? : number,
  style?   : TextStyle[] | TextStyle,
  color?   : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',
  copy?    : boolean,
}

const Text = (props : TextProps) =>{
  let family = "Poppins";
  let weight = "Regular";

  if (props.family) {
    family = props.family;
  }

  if (props.weight) {
    weight = props.weight;
  }

  let font = `${family}${weight}`;

  return (
    <TextNative
        {...props}
        numberOfLines={props.elipsis ? props.elipsis : 0}
        style={[
            {
                fontSize: props.size ? props.size : 14,
                fontFamily: font,
                color: props.color ? Colors[props.color] : Colors.text,
                marginBottom:-3.5,
            },
                props.style,
            ]}
        selectable={props.copy ? true : false}
    />
  );
}

export default Text;