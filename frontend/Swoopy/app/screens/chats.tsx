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
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// --- DATOS ---
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
  { id: "4", name: "Ayana Izquierdo", message: "Sure hahaha", time: "5 mins", unread: 0, image: "https://i.pravatar.cc/100?img=13" },
  { id: "5", name: "Khadija Dubois", message: "No, I think we can start at 8pm, wyd?", time: "12 mins", unread: 2, image: "https://i.pravatar.cc/100?img=14" },
];

const MESSAGES_MOCK = [
  { id: '1', text: 'Hey! Are they still open at sunday?', time: '10:00 AM', sender: 'other' },
  { id: '2', text: 'I think so, let me check their website real quick 🔍', time: '10:02 AM', sender: 'me' },
  { id: '3', text: 'Thanks bro! I really need that coffee ☕️', time: '10:05 AM', sender: 'other' },
  { id: '4', text: 'Confirmed! They close at 8pm today. Want to go?', time: '10:06 AM', sender: 'me' },
];

// --- COMPONENTE: FONDO DE OLAS (ORIGINAL PARA LA LISTA) ---
const WaveBackground = () => (
  <View style={styles.waveContainer}>
    <View style={[styles.wave, { top: height * 0.1, left: -width * 0.5 }]} />
    <View style={[styles.wave, { top: height * 0.15, left: -width * 0.4, opacity: 0.03 }]} />
    <View style={[styles.wave, { top: height * 0.5, right: -width * 0.6, borderColor: '#006EFF' }]} />
    <View style={[styles.wave, { top: height * 0.55, right: -width * 0.5, borderColor: '#006EFF', opacity: 0.03 }]} />
  </View>
);

// --- COMPONENTE: FONDO DE OLAS ENTRELAZADAS (SOLO PARA EL INTERIOR DEL CHAT) ---
const ChatWaveBackground = () => (
  <View style={styles.waveContainer}>
    <View style={[styles.chatWave, { 
      top: -height * 0.1, 
      left: -width * 0.2, 
      width: width * 1.5, 
      height: height * 0.4, 
      borderRadius: width,
      transform: [{ rotate: '-15deg' }],
      borderColor: '#006EFF',
      opacity: 0.1
    }]} />
    <View style={[styles.chatWave, { 
      bottom: height * 0.2, 
      right: -width * 0.5, 
      width: width * 1.8, 
      height: height * 0.6, 
      borderRadius: width,
      transform: [{ rotate: '20deg' }],
      borderColor: '#00D4FF',
      opacity: 0.05
    }]} />
    <View style={[styles.chatWave, { 
      bottom: -height * 0.05, 
      left: -width * 0.3, 
      width: width * 1.2, 
      height: width * 1.2, 
      borderRadius: width,
      borderColor: '#006EFF',
      opacity: 0.08
    }]} />
  </View>
);

// --- COMPONENTE: MENSAJE CON ANIMACIÓN INDIVIDUAL ---
const AnimatedMessage = ({ item, index, isVisible }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(animatedValue, {
        toValue: 1,
        delay: index * 120,
        useNativeDriver: true,
        tension: 50,
        friction: 8
      }).start();
    } else {
      animatedValue.setValue(0);
    }
  }, [isVisible]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0]
  });

  return (
    <Animated.View style={[
      styles.msgRow, 
      item.sender === 'me' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' },
      { opacity: animatedValue, transform: [{ translateY }, { scale: animatedValue }] }
    ]}>
      <View style={[styles.msgBubble, item.sender === 'me' ? styles.msgMe : styles.msgOther]}>
        <Text style={styles.msgText}>{item.text}</Text>
        <Text style={styles.msgTime}>{item.time}</Text>
      </View>
    </Animated.View>
  );
};

// --- COMPONENTE: ITEM DE CHAT SWIPEABLE ---
const SwipeableChatItem = ({ item, openChatId, setOpenChatId, onOpenChat }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(0);

  useEffect(() => {
    if (openChatId !== item.id && openChatId !== null) close();
  }, [openChatId]);

  const close = () => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true, tension: 60, friction: 10 }).start(() => { lastOffset.current = 0; });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 15 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderGrant: () => setOpenChatId(item.id),
      onPanResponderMove: (_, gesture) => {
        let newX = gesture.dx + lastOffset.current;
        if (newX > 80) newX = 80;
        if (newX < -140) newX = -140;
        translateX.setValue(newX);
      },
      onPanResponderRelease: (_, gesture) => {
        const x = gesture.dx + lastOffset.current;
        if (x < -60) {
          Animated.spring(translateX, { toValue: -140, useNativeDriver: true, bounciness: 4 }).start();
          lastOffset.current = -140;
        } else if (x > 60) {
          Animated.spring(translateX, { toValue: 80, useNativeDriver: true, bounciness: 4 }).start();
          lastOffset.current = 80;
        } else {
          close();
        }
      },
    })
  ).current;

  return (
    <View style={styles.chatWrapper}>
      <View style={styles.backgroundActions}>
        <View style={styles.leftAction}><Ionicons name="pin" size={22} color="#006EFF" /></View>
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionIcon}><Ionicons name="ban-outline" size={22} color="#555" /></TouchableOpacity>
          <TouchableOpacity style={styles.actionIcon}><Ionicons name="trash-outline" size={22} color="#FF375F" /></TouchableOpacity>
        </View>
      </View>

      <Animated.View 
        {...panResponder.panHandlers} 
        style={[styles.chatCard, { transform: [{ translateX }] }]}
      >
        <TouchableOpacity 
          activeOpacity={0.8} 
          onPress={() => onOpenChat(item)} 
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        >
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            {item.unread > 0 && <View style={styles.onlineStatus} />}
          </View>
          <View style={styles.chatContent}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
            <View style={styles.chatFooter}>
              <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
              {item.unread > 0 && (
                <View style={styles.unreadBadge}><Text style={styles.unreadText}>{item.unread}</Text></View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messagesVisible, setMessagesVisible] = useState(false);
  const [openChatId, setOpenChatId] = useState(null);
  const [inputText, setInputText] = useState("");

  const slideAnim = useRef(new Animated.Value(height)).current;

  const handleOpenChat = (chat: any) => {
    setSelectedChat(chat);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setMessagesVisible(true);
    });
  };

  const handleCloseChat = () => {
    setMessagesVisible(false);
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedChat(null);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <WaveBackground />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>MENSAJES RECIENTES</Text>
            <Text style={styles.headerTitle}>Chats</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconCircle}><Ionicons name="search" size={20} color="#fff" /></TouchableOpacity>
            <TouchableOpacity style={[styles.iconCircle, styles.plusBtn]}><Ionicons name="add" size={22} color="#fff" /></TouchableOpacity>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
            {stories.map((item, index) => (
              <View key={item.id} style={styles.storyItem}>
                <View style={[styles.storyCircle, index === 0 && styles.userStory]}>
                  <Image source={{ uri: item.image }} style={styles.storyImage} />
                </View>
                <Text style={styles.storyName}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.filters}>
            {["All", "Favorites", "Work"].map((f, i) => (
              <TouchableOpacity key={f} style={[styles.filterButton, i === 0 && styles.activeFilter]}>
                <Text style={[styles.filterText, i === 0 && styles.activeFilterText]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ paddingHorizontal: 16, marginTop: 25, paddingBottom: 100 }}>
            {chatsData.map((item) => (
              <SwipeableChatItem 
                key={item.id}
                item={item} 
                openChatId={openChatId} 
                setOpenChatId={setOpenChatId} 
                onOpenChat={handleOpenChat}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedChat && (
        <Animated.View style={[
          StyleSheet.absoluteFillObject, 
          styles.chatDetailOverlay,
          { transform: [{ translateY: slideAnim }] }
        ]}>
          {/* Aquí cambiamos al nuevo fondo solo para el interior */}
          <ChatWaveBackground />
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.detailHeader}>
              <TouchableOpacity onPress={handleCloseChat} style={styles.backBtn}>
                <Ionicons name="chevron-back" size={28} color="#FFF" />
              </TouchableOpacity>
              <Image source={{ uri: selectedChat.image }} style={styles.detailAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.detailName}>{selectedChat.name}</Text>
                <View style={styles.onlineRow}>
                  <View style={styles.miniOnlineDot} />
                  <Text style={styles.detailStatus}>En línea</Text>
                </View>
              </View>
              <View style={styles.headerIconsRow}>
                <TouchableOpacity style={styles.iconCircleSmall}><Ionicons name="call-outline" size={20} color="#FFF" /></TouchableOpacity>
                <TouchableOpacity style={styles.iconCircleSmall}><Ionicons name="videocam-outline" size={20} color="#FFF" /></TouchableOpacity>
              </View>
            </View>

            <FlatList
              data={MESSAGES_MOCK}
              keyExtractor={item => item.id}
              contentContainerStyle={{ padding: 20 }}
              renderItem={({ item, index }) => (
                <AnimatedMessage item={item} index={index} isVisible={messagesVisible} />
              )}
            />

           <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
  <View style={styles.inputArea}>
    <View style={styles.inputBox}>
      {/* Icono de adjuntar (+) a la izquierda */}
      <TouchableOpacity>
        <Ionicons name="add" size={24} color="#006EFF" />
      </TouchableOpacity>

      <TextInput 
        placeholder="Escribe algo..." 
        placeholderTextColor="rgba(255,255,255,0.3)" 
        style={styles.textInput}
        value={inputText}
        onChangeText={setInputText}
      />

      {/* NUEVO: Icono de Stickers / Carita a la derecha */}
      <TouchableOpacity style={{ marginLeft: 8 }}>
        <Ionicons name="happy-outline" size={24} color="rgba(255,255,255,0.5)" />
      </TouchableOpacity>
    </View>

    <TouchableOpacity style={styles.sendCircle}>
      <Ionicons name={inputText ? "send" : "mic"} size={22} color="#FFF" />
    </TouchableOpacity>
  </View>
</KeyboardAvoidingView>
          </SafeAreaView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05080D' },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', zIndex: 0 },
  wave: { position: 'absolute', width: width * 2, height: width * 2, borderRadius: width, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  chatWave: { position: 'absolute', borderWidth: 1.5 }, // Estilo para las ondas nuevas
  safeArea: { flex: 1, zIndex: 1 },
  chatDetailOverlay: { backgroundColor: '#05080D', zIndex: 100 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 15 },
  dateText: { color: '#006EFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { color: '#FFF', fontSize: 32, fontWeight: '900' },
  headerIcons: { flexDirection: "row", gap: 12 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  plusBtn: { backgroundColor: '#006EFF', borderColor: '#006EFF' },
  storiesContainer: { paddingLeft: 20, marginBottom: 20 },
  storyItem: { alignItems: "center", marginRight: 18 },
  storyCircle: { width: 66, height: 66, borderRadius: 33, padding: 3, borderWidth: 2, borderColor: '#00D4FF' },
  userStory: { borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed' },
  storyImage: { width: '100%', height: '100%', borderRadius: 30 },
  storyName: { color: 'rgba(255,255,255,0.5)', fontSize: 11, marginTop: 6 },
  filters: { flexDirection: "row", paddingHorizontal: 20, gap: 10 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)' },
  activeFilter: { backgroundColor: '#00D4FF' },
  filterText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '600' },
  activeFilterText: { color: '#000' },
  chatWrapper: { marginBottom: 12, position: 'relative', justifyContent: 'center' },
  backgroundActions: { ...StyleSheet.absoluteFillObject, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25 },
  leftAction: { width: 40, alignItems: 'center' },
  rightActions: { flexDirection: 'row', gap: 15 },
  actionIcon: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  chatCard: { backgroundColor: '#0D1117', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)', padding: 15 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 55, height: 55, borderRadius: 20, marginRight: 15 },
  onlineStatus: { position: 'absolute', top: -2, right: 12, width: 14, height: 14, borderRadius: 7, backgroundColor: '#00D4FF', borderWidth: 3, borderColor: '#0D1117' },
  chatContent: { flex: 1 },
  chatHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  chatName: { color: "#fff", fontWeight: "700", fontSize: 16 },
  chatTime: { color: "rgba(255,255,255,0.3)", fontSize: 12 },
  chatFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  chatMessage: { color: "rgba(255,255,255,0.5)", flex: 1, fontSize: 13 },
  unreadBadge: { backgroundColor: "#FF375F", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  unreadText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  detailHeader: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', backgroundColor: '#0D1117' },
  backBtn: { marginRight: 5 },
  detailAvatar: { width: 45, height: 45, borderRadius: 16, marginRight: 12 },
  detailName: { color: '#FFF', fontWeight: '700', fontSize: 17 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  miniOnlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: '#00D4FF', marginRight: 5 },
  detailStatus: { color: 'rgba(255,255,255,0.4)', fontSize: 12 },
  headerIconsRow: { flexDirection: 'row', gap: 10 },
  iconCircleSmall: { width: 38, height: 38, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  msgRow: { marginBottom: 20, flexDirection: 'row' },
  msgBubble: { maxWidth: '80%', padding: 14, borderRadius: 22 },
  msgMe: { backgroundColor: '#006EFF', borderBottomRightRadius: 4 },
  msgOther: { backgroundColor: 'rgba(255,255,255,0.08)', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  msgText: { color: '#FFF', fontSize: 15, lineHeight: 20 },
  msgTime: { color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 5, alignSelf: 'flex-end' },
  inputArea: { flexDirection: 'row', padding: 15, alignItems: 'center', gap: 10 },
  inputBox: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 25, paddingHorizontal: 15, alignItems: 'center', height: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  textInput: { flex: 1, color: '#FFF', marginHorizontal: 10, fontSize: 15 },
  sendCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#006EFF', justifyContent: 'center', alignItems: 'center' }
});