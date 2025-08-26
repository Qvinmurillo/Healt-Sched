import { StyleSheet, Text } from "react-native";

interface Props {
    label: String;
}

export default function LabelField ({label}: Props){
    return(
        <>
        <Text style={styles.labelInput}>{label}</Text>
        </>
)}

const styles = StyleSheet.create({
    labelInput:{
        paddingHorizontal: 10,
        fontSize: 15,
    },
})