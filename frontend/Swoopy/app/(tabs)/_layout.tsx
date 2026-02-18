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
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#00D4FF",
        tabBarInactiveTintColor: "rgba(255,255,255,0.3)",
        tabBarHideOnKeyboard: true,
        // 1. Quitamos los márgenes del texto para que no empujen hacia abajo
        tabBarLabelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 0,
          fontWeight: '500',
        },
        tabBarStyle: styles.tabBar,
        // 2. Forzamos a que el contenedor de cada icono/texto use todo el alto y se centre
        tabBarItemStyle: {
          height: 60, // Misma altura que la barra
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 4, 
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={80} tint="dark" style={styles.blurStyle} />
          ) : (
            <View style={styles.androidPill} />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ 
          href: null,
          tabBarStyle: { display: "none" } 
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "chatbubbles" : "chatbubbles-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "rocket" : "rocket-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="market"
        options={{
          tabBarLabel: "Market",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "scan" : "scan-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orbix"
        options={{
          tabBarLabel: "Orbix",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "scan" : "scan-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20, // Subí esto un poco para que flote mejor y no pegue al borde del cel
    marginHorizontal: 60,
    height: 60,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    // 3. MUY IMPORTANTE: Elimina el relleno automático de iOS/Android
    paddingBottom: 0,
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
});