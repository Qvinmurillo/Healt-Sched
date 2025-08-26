import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type BtnTabProp= {
    title: String;
    iconName: IconSymbolName;
    onPress?: () => void;
}

export default function TabBarLog ({iconName, title, onPress}: BtnTabProp){
    return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <View style={styles.container} >
            <IconSymbol name={iconName} color='black' size={22} style={styles.icon} />
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    </TouchableOpacity>

)};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 2,
    color: '#FFF'
  },
  title: {
    fontSize: 12,
    marginTop: 0,
    color: '#FFF'
  },
});
