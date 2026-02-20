import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { BlurView } from "expo-blur"; // Importado
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import MensajesScreen from "../screens/mensajes";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get("window");
const ACCENT = "#00D4FF";

/* ---------------- MOCK DATA ---------------- */

const stories = [
  { id: "1", name: "You", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "2", name: "Kaja", image: "https://i.pravatar.cc/100?img=2" },
  { id: "3", name: "Imran", image: "https://i.pravatar.cc/100?img=3" },
  { id: "4", name: "Stella", image: "https://i.pravatar.cc/100?img=4" },
  { id: "5", name: "Shee", image: "https://i.pravatar.cc/100?img=5" },
];

const chatsData = [
  { id: "1", name: "Visit Denpasar", message: "Khai: Are they still open at sunday?", time: "24 mins", unread: 4, image: "https://i.pravatar.cc/100?img=10" },
  { id: "2", name: "Kira Lindegaard", message: "Got it, thanks Kira!!", time: "2 mins", unread: 0, image: "https://i.pravatar.cc/100?img=11" },
  { id: "3", name: "Kaja Kumar", message: "Thanks bro, see you later", time: "2 mins", unread: 0, image: "https://i.pravatar.cc/100?img=12" },
];

/* ---------------- BACKGROUND ---------------- */

const WaveBackground = () => (
  <View style={styles.waveContainer}>
    <View style={[styles.wave, { top: height * 0.1, left: -width * 0.5 }]} />
    <View
      style={[
        styles.wave,
        { top: height * 0.55, right: -width * 0.6, borderColor: ACCENT },
      ]}
    />
  </View>
);

/* ---------------- CHAT ITEM (CON BLUR LIGERO) ---------------- */

const ChatItem = ({ item, onPress }: any) => {
  return (
    <View style={styles.chatWrapper}>
      <BlurView 
        intensity={10} // Muy ligero como pediste
        tint="dark" 
        style={styles.blurWrapper}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPress(item)}
          style={styles.chatInner}
        >
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            {item.unread > 0 && <View style={styles.onlineDot} />}
          </View>

          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={[styles.chatTime, item.unread > 0 && { color: ACCENT }]}>
                {item.time}
              </Text>
            </View>

            <View style={styles.chatFooter}>
              <Text numberOfLines={1} style={styles.chatMessage}>
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
        <View style={styles.separator} />
      </BlurView>
    </View>
  );
};

/* ---------------- MAIN ---------------- */

export default function ChatsScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=44");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: selectedChat ? { display: "none" } : styles.tabBarConfig,
    });
  }, [selectedChat]);

  const handleOpenChat = (chat: any) => {
    setSelectedChat(chat);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseChat = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setSelectedChat(null));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <WaveBackground />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.sectionMini}>MENSAJES RECIENTES</Text>
            <Text style={styles.headerTitle}>Chats</Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="search" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.iconCircle, styles.plusBtn]}>
              <Ionicons name="add" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.profileWrapper}
              activeOpacity={0.8}
              onPress={() => router.push({ pathname: "/screens/editarp" })}
            >
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
              <View style={styles.profileDot} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* STORIES */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.storiesContainer}
          >
            {stories.map((item, index) => (
              <View key={item.id} style={styles.storyItem}>
                <View style={[styles.storyCircle, index === 0 && styles.userStory]}>
                  <Image source={{ uri: item.image }} style={styles.storyImage} />
                </View>
                <Text style={styles.storyName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* FILTERS */}
          <View style={styles.filters}>
            {["All", "Favorites", "Marketplace"].map((f, i) => (
              <TouchableOpacity
                key={f}
                style={[styles.filterButton, i === 0 && styles.activeFilter]}
              >
                <Text style={[styles.filterText, i === 0 && styles.activeFilterText]}>
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CHAT LIST */}
          <View style={styles.chatListContainer}>
            {chatsData.map((item) => (
              <ChatItem
                key={item.id}
                item={item}
                onPress={handleOpenChat}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedChat && (
        <Animated.View
          style={[
            styles.messageViewWrapper,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <MensajesScreen chat={selectedChat} onBack={handleCloseChat} />
        </Animated.View>
      )}
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05080D" },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: "hidden" },
  wave: {
    position: "absolute",
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sectionMini: { color: ACCENT, fontSize: 9, fontWeight: "800", letterSpacing: 1.5, marginBottom: 2 },
  headerTitle: { color: "#FFF", fontSize: 28, fontWeight: "900" },
  headerIcons: { flexDirection: "row", gap: 10, alignItems: 'center' },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  plusBtn: { backgroundColor: ACCENT, borderColor: ACCENT },
  storiesContainer: { paddingLeft: 20, marginBottom: 18 },
  storyItem: { alignItems: "center", marginRight: 14 },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 3,
    borderWidth: 2,
    borderColor: ACCENT,
  },
  userStory: { borderColor: "rgba(255,255,255,0.2)", borderStyle: "dashed" },
  storyImage: { width: "100%", height: "100%", borderRadius: 26 },
  storyName: { color: "rgba(255,255,255,0.5)", fontSize: 10, marginTop: 4 },
  filters: { flexDirection: "row", paddingHorizontal: 20, gap: 8 },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  activeFilter: { backgroundColor: ACCENT },
  filterText: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "600" },
  activeFilterText: { color: "#000" },
  profileImage: { width: "100%", height: "100%", borderRadius: 19 },
  
  chatListContainer: {
    marginTop: 15,
    paddingBottom: 120,
    paddingHorizontal: 10, // Margen para que el blur no toque los bordes
  },
  chatWrapper: {
    marginBottom: 4,
    borderRadius: 20,
    overflow: 'hidden', // Para que el blur no se salga de las esquinas
  },
  blurWrapper: {
    paddingVertical: 4,
  },
  chatInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  avatarWrapper: { position: "relative" },
  avatar: { width: 54, height: 54, borderRadius: 27, marginRight: 15 },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 18,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ACCENT,
    borderWidth: 2,
    borderColor: "#05080D",
  },
  chatContent: { flex: 1 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  chatName: { color: "#fff", fontWeight: "700", fontSize: 16 },
  chatTime: { color: "rgba(255,255,255,0.4)", fontSize: 12 },
  chatFooter: { flexDirection: "row", alignItems: "center" },
  chatMessage: { color: "rgba(255,255,255,0.5)", flex: 1, fontSize: 14 },
  unreadBadge: { backgroundColor: ACCENT, borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  unreadText: { color: "#000", fontSize: 10, fontWeight: "800" },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.03)",
    marginLeft: 80,
    marginRight: 15,
  },
  messageViewWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#05080D",
    zIndex: 999,
  },
  tabBarConfig: {
    position: "absolute",
    bottom: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    height: 60,
    backgroundColor: "transparent",
    borderTopWidth: 0,
  },
  profileWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    position: "relative",
    borderWidth: 2,
    borderColor: ACCENT,
  },
  profileDot: {
    position: "absolute",
    right: -4,
    bottom: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ACCENT,
    borderWidth: 2,
    borderColor: "#05080D",
  },
});