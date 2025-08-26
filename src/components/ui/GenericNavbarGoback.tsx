import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type GenericNavbarProps = {
  title: string;
  iconName: IconSymbolName;
  onPress?: () => void;
  bannerImage?: any;
};

export default function GenericNavbar({
  title,
  iconName,
  onPress,
  bannerImage = require('@/assets/images/Banner-Navbar.png'),
}: GenericNavbarProps) {
  return (
    <>
    <View style={styles.navbarContainer}>
  {/* Línea superior: icono y banner */}
        <View style={styles.topRow}>
            <TouchableOpacity onPress={onPress}>
                <IconSymbol name={iconName} color="#fff" size={24} />
            </TouchableOpacity>
            <View style={styles.bannerContainer}>
            <Image source={bannerImage || null } style={styles.banner} contentFit="contain" />
            </View>
        </View>

  {/* Línea inferior: título centrado */}
        <Text style={styles.title}>{title}</Text>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    navbarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#417584',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  bannerContainer:{
    width: 150,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  banner: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  title: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
});

