import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#00D4FF",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarHideOnKeyboard: true, // Importante para que el menú no suba con el teclado
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={80} tint="dark" style={styles.blurStyle} />
          ) : (
            <View style={styles.androidPill} />
          ),
      }}
    >
      {/* INDEX (TOTALMENTE OCULTO: SIN BOTÓN Y SIN BARRA) */}
      <Tabs.Screen
        name="index"
        options={{ 
          href: null,
          tabBarStyle: { display: "none" } // Fuerza a que en el index no exista el layout
        }}
      />

      {/* 1. CHATS */}
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={22}
                color={color}
              />
            </IconWrapper>
          ),
        }}
      />

      {/* 2. HOME */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <Ionicons
                name={focused ? "rocket" : "rocket-outline"}
                size={22}
                color={color}
              />
            </IconWrapper>
          ),
        }}
      />

      {/* 3. EXPLORE */}
      <Tabs.Screen
        name="narket"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <IconWrapper focused={focused}>
              <Ionicons
                name={focused ? "scan" : "scan-outline"}
                size={22}
                color={color}
              />
            </IconWrapper>
          ),
        }}
      />
    </Tabs>
  );
}

function IconWrapper({ focused, children }: any) {
  return (
    <View style={styles.iconContainer}>
      {children}
      {focused && <View style={styles.activeDot} />}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    marginHorizontal: 60,
    height: 60,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 15,
  },
  blurStyle: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 40,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  androidPill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,12,18,0.98)",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 14 : 0,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#00D4FF",
    marginTop: 4,
    shadowColor: "#00D4FF",
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});