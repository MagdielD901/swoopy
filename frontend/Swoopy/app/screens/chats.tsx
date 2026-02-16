import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const stories = [
  { id: "1", name: "You", image: "https://i.pravatar.cc/100?img=1" },
  { id: "2", name: "Kaja", image: "https://i.pravatar.cc/100?img=2" },
  { id: "3", name: "Imran", image: "https://i.pravatar.cc/100?img=3" },
  { id: "4", name: "Stella", image: "https://i.pravatar.cc/100?img=4" },
  { id: "5", name: "Shee", image: "https://i.pravatar.cc/100?img=5" },
];

const chats = [
  {
    id: "1",
    name: "Visit Denpasar",
    message: "Khai: Are they still open at sunday?",
    time: "24 mins",
    unread: 4,
    image: "https://i.pravatar.cc/100?img=10",
  },
  {
    id: "2",
    name: "Kira Lindegaard",
    message: "Got it, thanks Kira!!",
    time: "2 mins",
    unread: 0,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: "3",
    name: "Kaja Kumar",
    message: "Thanks bro, see you later",
    time: "2 mins",
    unread: 0,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: "4",
    name: "Ayana Izquierdo",
    message: "Sure hahaha",
    time: "5 mins",
    unread: 0,
    image: "https://i.pravatar.cc/100?img=13",
  },
  {
    id: "5",
    name: "Khadija Dubois",
    message: "No, I think we can start at 8pm, wyd?",
    time: "12 mins",
    unread: 2,
    image: "https://i.pravatar.cc/100?img=14",
  },
];

export default function Chats() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const HEADER_HEIGHT = 160; // altura combinada de stories + filtros

  const translateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 1.5],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header fijo */}
      <View style={styles.header}>
        <Text style={styles.title}>Chats</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={22} color="#fff" />
          <Ionicons name="camera-outline" size={22} color="#fff" />
          <TouchableOpacity style={styles.headerPlus}>
            <Ionicons name="add" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Animated Stories + Filters */}
      <Animated.View
        style={[
          styles.animatedTopSection,
          { transform: [{ translateY }], opacity },
        ]}
      >
        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
        >
          {stories.map((item, index) => (
            <View key={item.id} style={styles.storyItem}>
              <View style={styles.storyWrapper}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.storyImage}
                />
                {index === 0 && (
                  <View style={styles.storyPlus}>
                    <Ionicons name="add" size={14} color="#fff" />
                  </View>
                )}
              </View>
              <Text style={styles.storyText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Filters */}
        <View style={styles.filters}>
          {["All", "Favorites", "Work", "Groups"].map((filter) => (
            <TouchableOpacity key={filter} style={styles.filterButton}>
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Chat List */}
      <Animated.FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: HEADER_HEIGHT - 30, // <-- aquí acercamos los chats a los filtros
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.chatItem}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <View style={styles.chatFooter}>
                <Text style={styles.chatMessage} numberOfLines={1}>
                  {item.message}
                </Text>
                {item.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{item.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerPlus: {
    backgroundColor: "#006eff",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  animatedTopSection: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#1e1e1e",
    zIndex: 10,
  },
  storiesContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 16,
  },
  storyWrapper: {
    position: "relative",
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#006eff",
  },
  storyPlus: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#006eff",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1e1e1e",
  },
  storyText: {
    color: "#fff",
    marginTop: 6,
    fontSize: 12,
  },
  filters: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 12,
    gap: 10,
  },
  filterButton: {
    backgroundColor: "#2c2c2c",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterText: {
    color: "#fff",
    fontSize: 13,
  },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  chatName: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  chatTime: {
    color: "#aaa",
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatMessage: {
    color: "#aaa",
    flex: 1,
    marginRight: 8,
    fontSize: 13,
  },
  unreadBadge: {
    backgroundColor: "#006eff",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  unreadText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});
