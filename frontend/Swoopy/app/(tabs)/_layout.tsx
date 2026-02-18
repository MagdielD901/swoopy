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
        tabBarLabelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 0,
          fontWeight: '500',
        },
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: {
          height: 60, 
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
      {/* Ocultar Index de la barra */}
      <Tabs.Screen
        name="index"
        options={{ 
          href: null,
          tabBarStyle: { display: "none" } 
        }}
      />

      {/* CHATS */}
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

      {/* FEED (HOME) */}
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

      {/* MARKET */}
      <Tabs.Screen
        name="market"
        options={{
          tabBarLabel: "Market",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      {/* ORBIX (Sugerencia: Planeta o Red) */}
      <Tabs.Screen
        name="orbix"
        options={{
          tabBarLabel: "Orbix",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "planet" : "planet-outline"}
              size={20}
              color={color}
            />
          ),
        }}
      />

      {/* CONTROL (Sugerencia: Ajustes o Switch) */}
    <Tabs.Screen
  name="control"
  options={{
    tabBarLabel: "Control",
    tabBarIcon: ({ color, focused }) => (
      <Ionicons
        name={focused ? "settings" : "settings-outline"} // Aquí cambiamos a la tuerca
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
    bottom: 20, 
    marginHorizontal: 20, // Reduje el margen lateral para que quepan bien los 5 iconos
    height: 60,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
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