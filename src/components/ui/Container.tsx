import { ReactElement } from "react";
import { StyleSheet, View } from "react-native";

interface Props{
    //children: ReactElement;
    children: ReactElement;
}

export default function Container ({children}: Props){
    return( 
        <View style={styles.container}>{children}</View>
)}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        gap: 10,
        position: 'relative',
        
    },
})
