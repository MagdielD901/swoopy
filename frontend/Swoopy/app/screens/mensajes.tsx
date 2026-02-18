import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

/* ---------------- DATOS MOCK ---------------- */
const MESSAGES_MOCK = [
  { id: '1', text: 'Hey! Are they still open at sunday?', time: '10:00 AM', sender: 'other' },
  { id: '2', text: 'I think so, let me check their website real quick 🔍', time: '10:02 AM', sender: 'me' },
  { id: '3', text: 'Thanks bro! I really need that coffee ☕️', time: '10:05 AM', sender: 'other' },
  { id: '4', text: 'Confirmed! They close at 8pm today. Want to go?', time: '10:06 AM', sender: 'me' },
];

const EMOJIS = ["❤️", "👍", "🔥", "😂", "😮", "😢", "🎉", "✨", "🙌", "😎", "🤔", "👀", "🚀", "💡", "✅", "❌", "🌈", "🍕", "🎸", "📱"];
const STICKERS = [
  "https://cdn-icons-png.flaticon.com/512/4721/4721021.png",
  "https://cdn-icons-png.flaticon.com/512/4721/4721028.png",
  "https://cdn-icons-png.flaticon.com/512/4721/4721038.png",
  "https://cdn-icons-png.flaticon.com/512/4721/4721042.png",
  "https://cdn-icons-png.flaticon.com/512/4721/4721051.png",
  "https://cdn-icons-png.flaticon.com/512/4721/4721055.png",
];

/* ---------------- FONDO DE OLAS ORGÁNICAS ---------------- */
const ChatWaveBackground = () => (
  <View style={styles.waveContainer}>
    <View style={[styles.wave, { top: height * 0.1, left: -width * 0.5 }]} />
    <View style={[styles.wave, { top: height * 0.15, left: -width * 0.4, opacity: 0.03 }]} />
    <View style={[styles.wave, { top: height * 0.5, right: -width * 0.6, borderColor: '#006EFF' }]} />
    <View style={[styles.wave, { top: height * 0.55, right: -width * 0.5, borderColor: '#006EFF', opacity: 0.03 }]} />
  </View>
);

/* ---------------- MENSAJE ANIMADO ---------------- */
const AnimatedMessage = ({ item, index }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: index * 100,
      useNativeDriver: true,
      damping: 15,
      stiffness: 100
    }).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [item.sender === 'me' ? 50 : -50, 0]
  });

  return (
    <Animated.View style={[
      styles.msgRow, 
      item.sender === 'me' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' },
      { opacity: animatedValue, transform: [{ translateX }, { scale: animatedValue }] }
    ]}>
      <View style={[styles.msgBubble, item.sender === 'me' ? styles.msgMe : styles.msgOther]}>
        <Text style={styles.msgText}>{item.text}</Text>
        <Text style={[styles.msgTime, item.sender === 'me' ? { color: 'rgba(255,255,255,0.5)' } : { color: 'rgba(255,255,255,0.3)' }]}>
          {item.time}
        </Text>
      </View>
    </Animated.View>
  );
};

/* ---------------- COMPONENTE PRINCIPAL ---------------- */
export default function MensajesScreen({ chat, onBack }: any) {
  const [inputText, setInputText] = useState("");
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<'emojis' | 'stickers'>('emojis');
  const panelHeight = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  if (!chat) return null;

  const handleOpenProfile = () => {
    router.push("/screens/perfil");
  };

  const togglePanel = () => {
    if (showPanel) {
      closePanel();
    } else {
      Keyboard.dismiss();
      setShowPanel(true);
      Animated.spring(panelHeight, {
        toValue: 300,
        useNativeDriver: false,
        tension: 40,
        friction: 8
      }).start();
    }
  };

  const closePanel = () => {
    Animated.timing(panelHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => setShowPanel(false));
  };

  return (
    <View style={styles.mainContainer}>
      <ChatWaveBackground />
      
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* HEADER CON BLUR */}
        <BlurView intensity={20} tint="dark" style={styles.headerBlur}>
          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={28} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleOpenProfile}>
              <Image source={{ uri: chat.image }} style={styles.detailAvatar} />
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1 }} onPress={handleOpenProfile}>
              <Text style={styles.detailName}>{chat.name}</Text>
              <View style={styles.onlineRow}>
                <View style={styles.miniOnlineDot} />
                <Text style={styles.detailStatus}>En línea</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.headerIconsRow}>
              <TouchableOpacity style={styles.iconCircleSmall}>
                <Ionicons name="call-outline" size={20} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconCircleSmall}>
                <Ionicons name="videocam-outline" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>

        {/* LISTA DE MENSAJES */}
        <FlatList
          data={MESSAGES_MOCK}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <AnimatedMessage item={item} index={index} />
          )}
          onScrollBeginDrag={closePanel}
        />

        {/* INPUT AREA Y PANEL */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <BlurView intensity={30} tint="dark" style={[styles.inputBlurContainer, showPanel && { position: 'relative' }]}>
            <View style={styles.inputArea}>
              <View style={styles.inputBox}>
                <TouchableOpacity>
                  <Ionicons name="add-circle" size={26} color="#006EFF" />
                </TouchableOpacity>
                <TextInput 
                  placeholder="Mensaje..." 
                  placeholderTextColor="rgba(255,255,255,0.4)" 
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  onFocus={closePanel}
                  multiline
                />
               <TouchableOpacity onPress={togglePanel}>
  <Ionicons
    name={(showPanel ? "keyboard-outline" : "happy-outline") as any}
    size={24}
    color={showPanel ? "#006EFF" : "rgba(255,255,255,0.5)"}
  />
</TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.sendCircle, { backgroundColor: inputText ? '#006EFF' : 'rgba(255,255,255,0.1)' }]}
              >
                <Ionicons name={inputText ? "send" : "mic"} size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          </BlurView>

          {/* PANEL DE EMOJIS Y STICKERS SEPARADOS */}
          <Animated.View style={[styles.panelContainer, { height: panelHeight }]}>
            <View style={styles.tabBar}>
              <TouchableOpacity 
                onPress={() => setActiveTab('emojis')} 
                style={[styles.tabItem, activeTab === 'emojis' && styles.tabActive]}
              >
                <Text style={[styles.tabText, activeTab === 'emojis' && styles.tabTextActive]}>Emojis</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setActiveTab('stickers')} 
                style={[styles.tabItem, activeTab === 'stickers' && styles.tabActive]}
              >
                <Text style={[styles.tabText, activeTab === 'stickers' && styles.tabTextActive]}>Stickers</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              key={activeTab} // Crucial para que no explote al cambiar numColumns
              data={activeTab === 'emojis' ? EMOJIS : STICKERS}
              numColumns={activeTab === 'emojis' ? 6 : 3}
              keyExtractor={(item, index) => `${activeTab}-${index}`}
              renderItem={({ item }) => (
                activeTab === 'emojis' ? (
                  <TouchableOpacity onPress={() => setInputText(p => p + item)} style={styles.emojiItem}>
                    <Text style={{ fontSize: 28 }}>{item}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.stickerItem}>
                    <Image source={{ uri: item }} style={styles.stickerImg} />
                  </TouchableOpacity>
                )
              )}
              contentContainerStyle={{ padding: 10, paddingBottom: 30 }}
            />
          </Animated.View>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
}

/* ---------------- ESTILOS ---------------- */
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#05080D' },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', zIndex: 0 },
  wave: { position: 'absolute', width: width * 2, height: width * 2, borderRadius: width, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  headerBlur: {
    paddingTop: Platform.OS === 'android' ? 10 : 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  detailHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingVertical: 10,
  },
  backBtn: { marginRight: 5 },
  detailAvatar: { width: 42, height: 42, borderRadius: 12, marginRight: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  detailName: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  onlineRow: { flexDirection: 'row', alignItems: 'center', marginTop: 1 },
  miniOnlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#7CFF00', marginRight: 5 }, 
  detailStatus: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  headerIconsRow: { flexDirection: 'row', gap: 8 },
  iconCircleSmall: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.08)', justifyContent: 'center', alignItems: 'center' },
  msgRow: { marginBottom: 12, flexDirection: 'row' },
  msgBubble: { 
    maxWidth: '80%', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20 
  },
  msgMe: { backgroundColor: '#006EFF', borderBottomRightRadius: 4 },
  msgOther: { 
    backgroundColor: 'rgba(255,255,255,0.08)', 
    borderBottomLeftRadius: 4, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.05)' 
  },
  msgText: { color: '#FFF', fontSize: 15, lineHeight: 21 },
  msgTime: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end', fontWeight: '500' },

  inputBlurContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 25 : 15,
  },
  inputArea: { 
    flexDirection: 'row', 
    paddingHorizontal: 15, 
    alignItems: 'center', 
    gap: 10 
  },
  inputBox: { 
    flex: 1, 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.08)', 
    borderRadius: 25, 
    paddingHorizontal: 12, 
    alignItems: 'center', 
    minHeight: 48, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },
  textInput: { flex: 1, color: '#FFF', marginHorizontal: 8, fontSize: 15, paddingTop: 10, paddingBottom: 10 },
  sendCircle: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  /* NUEVOS ESTILOS DEL PANEL */
  panelContainer: { backgroundColor: '#0A0E14', overflow: 'hidden' },
  tabBar: { flexDirection: 'row', height: 45, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#006EFF' },
  tabText: { color: 'rgba(255,255,255,0.4)', fontWeight: '600', fontSize: 13 },
  tabTextActive: { color: '#FFF' },
  emojiItem: { flex: 1/6, height: 50, justifyContent: 'center', alignItems: 'center' },
  stickerItem: { flex: 1/3, height: 100, padding: 10, justifyContent: 'center', alignItems: 'center' },
  stickerImg: { width: '100%', height: '100%', resizeMode: 'contain' }
});