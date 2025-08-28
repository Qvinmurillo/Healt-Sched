import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const NAVBAR_HEIGHT = 96; // 40 (status+padding) + 40 (fila) + 16 (espacio título)

type GenericNavbarProps = {
  title: string;
  iconName?: IconSymbolName;
  onPress?: () => void;
  bannerImage?: any;
};

export default function GenericNavbar({
  title,
  iconName = "arrow.left",
  onPress,
  bannerImage = require("@/assets/images/Banner-Navbar.png"),
}: GenericNavbarProps) {
  return (
    <View style={styles.navbarContainer}>
      {/* fila superior: flecha + banner */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onPress} style={styles.left} hitSlop={10}>
          {iconName && <IconSymbol name={iconName} color="#fff" size={24} />}
        </TouchableOpacity>

        <View style={styles.right}>
          {bannerImage && (
            <Image source={bannerImage} style={styles.banner} contentFit="contain" />
          )}
        </View>
      </View>

      {/* fila inferior: título centrado */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 40, // notch/status bar
    backgroundColor: "#417584",
    zIndex: 1000,   // 🔑 asegura que quede encima
    elevation: 4,   // Android shadow
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    height: 40,
  },
  left: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  right: {
    width: 120,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  banner: {
    width: "100%",
    height: 30,
  },
  title: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
});
