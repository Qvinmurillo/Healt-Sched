import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BtnEntryProps ={
    text: String;
    subtext: String;
    iconName: IconSymbolName;
    onPress?: () => void;
}

export default function BtnEntry ({iconName ,text, subtext, onPress}: BtnEntryProps) {
    return(
        <TouchableOpacity onPress={onPress} style={styles.button}>

        <View style={styles.container}>
            <IconSymbol name={iconName} color='black' size={36} style={styles.btnicon} />

            <View style={styles.textcontent}>
                <Text style={styles.title}>{text}</Text>
                <Text style={styles.subtitle}>{subtext}</Text>
            </View>
        </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "rgba(168, 168, 168, 0.04)",
        borderRadius: 5,
        width: 'auto',
        boxShadow: 'black',
        padding: 15,
        borderWidth: 1,
        borderColor: "rgba(168, 168, 168, 0.07)"
    },
    btnicon:{
        marginRight: 15,
    },
    container:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    textcontent:{
        flexDirection: 'column',
    },
    title:{
        fontSize: 20,
        color: 'black',
        marginTop: 5, 
    },
    subtitle:{
        fontSize: 12,
        color: '#8C8C8C',
        marginBottom: 5,
        width: 247,

    },

});