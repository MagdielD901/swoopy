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
  PanResponder,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import MensajesScreen from "./mensajes";
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

/* ---------------- SWIPE ITEM ---------------- */

const SwipeableChatItem = ({ item, openChatId, setOpenChatId, onPress }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  useEffect(() => {
    if (openChatId !== item.id && openChatId !== null) close();
  }, [openChatId]);

  const close = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 60,
      friction: 10,
    }).start(() => (lastOffset.current = 0));
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 10 && Math.abs(g.dx) > Math.abs(g.dy),

      onPanResponderGrant: () => setOpenChatId(item.id),

      onPanResponderMove: (_, g) => {
        let newX = g.dx + lastOffset.current;
        if (newX > 70) newX = 70;
        if (newX < -100) newX = -100;
        translateX.setValue(newX);
      },

      onPanResponderRelease: (_, g) => {
        const x = g.dx + lastOffset.current;

        if (x < -50) {
          Animated.spring(translateX, {
            toValue: -100,
            useNativeDriver: true,
          }).start();
          lastOffset.current = -100;
        } else if (x > 50) {
          Animated.spring(translateX, {
            toValue: 70,
            useNativeDriver: true,
          }).start();
          lastOffset.current = 70;
        } else {
          close();
        }
      },
    })
  ).current;

  return (
    <View style={styles.chatWrapper}>
      <View style={styles.backgroundActions}>
        <Ionicons name="pin" size={18} color={ACCENT} />
        <Ionicons name="trash-outline" size={18} color="#FF375F" />
      </View>

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.chatCard, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPress(item)}
          style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
        >
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            {item.unread > 0 && <View style={styles.onlineDot} />}
          </View>

          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatTime}>{item.time}</Text>
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
      </Animated.View>
    </View>
  );
};

/* ---------------- MAIN ---------------- */

export default function ChatsScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/300?img=44");
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [openChatId, setOpenChatId] = useState(null);
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
    {/* FOTO DE PERFIL EDITABLE */}
  <TouchableOpacity
    style={styles.profileWrapper}
    activeOpacity={0.8}
    onPress={() => router.push({ pathname: "/screens/editarp"})}
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
                <View
                  style={[
                    styles.storyCircle,
                    index === 0 && styles.userStory,
                  ]}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.storyImage}
                  />
                </View>
                <Text style={styles.storyName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>

          {/* FILTERS */}
          <View style={styles.filters}>
            {["All", "Favorites", "Work"].map((f, i) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterButton,
                  i === 0 && styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    i === 0 && styles.activeFilterText,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* CHAT LIST */}
          <View style={styles.chatListContainer}>
            {chatsData.map((item) => (
              <SwipeableChatItem
                key={item.id}
                item={item}
                openChatId={openChatId}
                setOpenChatId={setOpenChatId}
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

  waveContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },

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

  sectionMini: {
    color: ACCENT,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 2,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "900",
  },

  headerIcons: { flexDirection: "row", gap: 10 },

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

  storiesContainer: {
    paddingLeft: 20,
    marginBottom: 18,
  },

  storyItem: { alignItems: "center", marginRight: 14 },

  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 3,
    borderWidth: 2,
    borderColor: ACCENT,
  },

  userStory: {
    borderColor: "rgba(255,255,255,0.2)",
    borderStyle: "dashed",
  },

  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 26,
  },

  storyName: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    marginTop: 4,
  },

  filters: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  activeFilter: { backgroundColor: ACCENT },

  filterText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "600",
  },
profileImage: {
  width: "100%",
  height: "100%",
  borderRadius: 19,
},
  activeFilterText: { color: "#000" },

  chatListContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
    paddingBottom: 120,
  },

  chatWrapper: {
    marginBottom: 6, // 🔥 más pegados
    position: "relative",
  },

  backgroundActions: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  chatCard: {
    backgroundColor: "#0D1117",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  avatarWrapper: { position: "relative" },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    marginRight: 10,
  },

  onlineDot: {
    position: "absolute",
    top: -2,
    right: 8,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: ACCENT,
    borderWidth: 2,
    borderColor: "#0D1117",
  },

  chatContent: { flex: 1 },

  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  chatName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  chatTime: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 10,
  },

  chatFooter: {
    flexDirection: "row",
    alignItems: "center",
  },

  chatMessage: {
    color: "rgba(255,255,255,0.5)",
    flex: 1,
    fontSize: 12,
  },

  unreadBadge: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },

  unreadText: {
    color: "#000",
    fontSize: 9,
    fontWeight: "800",
  },

  messageViewWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#05080D",
    zIndex: 999,
  },

  tabBarConfig: {
    position: "absolute",
    bottom: 10,
    marginHorizontal: 60,
    height: 60,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    display: "flex",
  },
 profileWrapper: {
  width: 38,
  height: 38,
  borderRadius: 19,
  position: "relative",
  borderWidth: 2,
  borderColor: ACCENT,
  // NO overflow: "visible"
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
  borderColor: "#05080D", // igual que el fondo
},

editBadge: {
  position: "absolute",
  bottom: -2,
  right: -2,
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: ACCENT,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#05080D",
},

});
