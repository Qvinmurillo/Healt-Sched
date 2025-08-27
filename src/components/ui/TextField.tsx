import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface Props extends TextInputProps {
    holder: string;
    value: string;
    onChangeText: (text: string) => void;
}

export default function TextFiel({holder, value, onChangeText, secureTextEntry, keyboardType, ...rest}: Props){
    return(
        <>
        <TextInput 
        style={styles.textInput} 
        placeholder={holder} 
        value={value} 
        onChangeText={onChangeText} 
        secureTextEntry={secureTextEntry} 
        keyboardType={keyboardType}
        {...rest}
        />
        </>
)}

const styles = StyleSheet.create({
    textInput:{
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "rgba(0, 0, 0, 0.05)",
        paddingHorizontal: 14,
        fontSize: 12,
        textAlignVertical: "top", 
        paddingVertical: 10,
    },
})