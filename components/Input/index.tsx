import { KeyboardTypeOptions, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import Text from '../Text';
import Colors from '@/constants/Colors';
import { useState } from 'react';

interface InputProps {
    containerStyle? : ViewStyle,
    inputStyle?     : ViewStyle,
    labelStyle?     : TextStyle,
    messageStyle?    : TextStyle,
    
    label?          : string,
    message?        : string,
    value?          : string,
    icon?           : any,
    placeholder?     : string,
    color?          : 'primary' | 'text' | 'textSecondary' | 'success' | 'danger' | 'warning' | 'white',

    onChangeText?    : (e:any)=>void,
    disabled?        : boolean,
    keyboardType?    : KeyboardTypeOptions,
    isPassword?      : boolean,
    multiline?       : boolean,
}

export default function Input(props:InputProps) {

    const [isFocusued,setIsFocused] = useState<boolean>(false);

    return(
        <View style={[
            props.containerStyle
        ]} >
            <Text style={[props.labelStyle || {},{}]} weight="Medium" color={isFocusued && props.color ? props.color : "text"} size={10} >{props.label}</Text>
            <TextInput
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                style={[
                    props.inputStyle,
                    {
                        borderBottomWidth:1,
                        borderBottomColor:isFocusued && props.color ? Colors[props.color] : Colors.grey2,
                        paddingBottom:5,
                        fontFamily:'PoppinsRegular',
                        color:props.disabled ? Colors.textSecondary : Colors.text,
                    }
                ]}
                onFocus={()=>setIsFocused(true)}
                onBlur={()=>setIsFocused(false)}
                keyboardType={props.keyboardType}
                editable={!props.disabled}
                secureTextEntry={props.isPassword}
                multiline={props.multiline}
            />
            {
                props.message &&
                <View style={{
                    marginTop:5,
                }} >
                    <Text size={10} style={[props.messageStyle || {},{}]} color={props.color ? props.color : "textSecondary"} >{props.message}</Text>
                </View>
            }
        </View>
    )
}