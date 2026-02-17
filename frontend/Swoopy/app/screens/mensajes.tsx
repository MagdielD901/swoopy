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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// --- DATOS MOCK (Puedes moverlos a un archivo de constantes luego) ---
const MESSAGES_MOCK = [
  { id: '1', text: 'Hey! Are they still open at sunday?', time: '10:00 AM', sender: 'other' },
  { id: '2', text: 'I think so, let me check their website real quick 🔍', time: '10:02 AM', sender: 'me' },
  { id: '3', text: 'Thanks bro! I really need that coffee ☕️', time: '10:05 AM', sender: 'other' },
  { id: '4', text: 'Confirmed! They close at 8pm today. Want to go?', time: '10:06 AM', sender: 'me' },
];

// --- COMPONENTE: FONDO DE OLAS ENTRELAZADAS ---
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

// --- COMPONENTE: BURBUJA DE MENSAJE ANIMADA ---
const AnimatedMessage = ({ item, index }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: 1,
      delay: index * 120,
      useNativeDriver: true,
      tension: 50,
      friction: 8
    }).start();
  }, []);

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

// --- COMPONENTE PRINCIPAL ---
export default function MensajesScreen({ chat, onBack }: any) {
  const [inputText, setInputText] = useState("");

  if (!chat) return null;

  return (
    <View style={styles.mainContainer}>
      <ChatWaveBackground />
      
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Detallado */}
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={28} color="#FFF" />
          </TouchableOpacity>
          
          <Image source={{ uri: chat.image }} style={styles.detailAvatar} />
          
          <View style={{ flex: 1 }}>
            <Text style={styles.detailName}>{chat.name}</Text>
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

        {/* Lista de Mensajes */}
        <FlatList
          data={MESSAGES_MOCK}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <AnimatedMessage item={item} index={index} />
          )}
        />

        {/* Input de Texto */}
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.inputArea}>
            <View style={styles.inputBox}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#05080D' },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', zIndex: 0 },
  chatWave: { position: 'absolute', borderWidth: 1.5 },
  detailHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.05)', 
    backgroundColor: '#0D1117' 
  },
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
  inputArea: { flexDirection: 'row', padding: 15, alignItems: 'center', gap: 10, paddingBottom: Platform.OS === 'ios' ? 20 : 15 },
  inputBox: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 25, paddingHorizontal: 15, alignItems: 'center', height: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  textInput: { flex: 1, color: '#FFF', marginHorizontal: 10, fontSize: 15 },
  sendCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#006EFF', justifyContent: 'center', alignItems: 'center' }
});