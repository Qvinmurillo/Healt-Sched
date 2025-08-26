import { StyleSheet, Text, TouchableOpacity } from "react-native";

type BtnSent = {
    title: string;
    onPress?: () => void;
}

export default function GenericButton({title, onPress}: BtnSent){
    return(
        <>
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
        </>
)};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#417584',
        alignItems: 'center',
        borderRadius: 15
    },
    text:{
        padding: 12,
        color: '#fff'
    },
})