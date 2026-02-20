import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions, Image, TextInput, 
  KeyboardAvoidingView, Platform, Animated, Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

type Tab = 'FEED' | 'CHAT';

interface Post {
  id: string;
  user: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  time: string;
}

// --- COMPONENTE DE FONDO ATMOSFÉRICO ---

const PlasmaOrb = ({ delay, color, size }: { delay: number, color: string, size: number }) => {
  // Posición inicial aleatoria
  const moveAnim = useRef(new Animated.ValueXY({ 
    x: Math.random() * width, 
    y: Math.random() * height 
  })).current;

  useEffect(() => {
    const move = () => {
      Animated.timing(moveAnim, {
        toValue: {
          x: Math.random() * (width - size/2),
          y: Math.random() * (height - size/2),
        },
        duration: 8000 + Math.random() * 4000,
        easing: Easing.inOut(Easing.sin),
        useNativeDriver: true,
      }).start(() => move());
    };
    
    const timeout = setTimeout(move, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View 
      style={[
        styles.plasmaOrb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          transform: moveAnim.getTranslateTransform(),
        }
      ]}
    />
  );
};

const TechBackground = () => (
  <View style={StyleSheet.absoluteFill}>
    <View style={styles.darkBase} />
    <View style={styles.gridOverlay} />
    
    {/* ORBES DE FONDO */}
    <PlasmaOrb color="rgba(255, 0, 51, 0.2)" size={width * 0.9} delay={0} />
    <PlasmaOrb color="rgba(0, 212, 255, 0.12)" size={width * 0.7} delay={500} />
    <PlasmaOrb color="rgba(255, 0, 51, 0.08)" size={width * 0.5} delay={1200} />
  </View>
);

const RoleBadge = ({ label, color }: { label: string, color: string }) => (
  <View style={[styles.roleBadge, { borderColor: color + '50', backgroundColor: color + '15' }]}>
    <Text style={[styles.roleText, { color }]}>{label}</Text>
  </View>
);

export default function ComunidadDetalle() {
  const [activeTab, setActiveTab] = useState<Tab>('FEED');
  const [message, setMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchTab = (tab: Tab) => {
    if (tab === activeTab) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setActiveTab(tab);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const posts: Post[] = [
    {
      id: '1',
      user: 'Orbix_Master',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      content: '¡Nueva actualización del sistema! Hemos optimizado la recolección de NRG en un 20%. ⚡️',
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800',
      likes: 124,
      time: '2h'
    },
    {
      id: '2',
      user: 'Swoopy_Admin',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      content: 'El evento de sobrecarga comienza en 30 minutos. Preparen sus núcleos. 🔥',
      likes: 89,
      time: '5h'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TechBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>CENTRAL DE DATOS</Text>
            <View style={styles.statsRow}>
              <View style={styles.onlinePulse} />
              <Text style={styles.statusText}>45 NODOS ONLINE</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* SELECTOR DE TABS */}
        <View style={styles.tabContainer}>
          <View style={styles.tabTrack}>
            <TouchableOpacity 
              onPress={() => switchTab('FEED')}
              style={[styles.tabButton, activeTab === 'FEED' && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === 'FEED' && styles.activeTabText]}>NUCLEO FEED</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => switchTab('CHAT')}
              style={[styles.tabButton, activeTab === 'CHAT' && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === 'CHAT' && styles.activeTabText]}>CORE CHAT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          {activeTab === 'FEED' ? (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
              <View style={styles.pinnedBadge}>
                <Ionicons name="pin" size={12} color="#00D4FF" />
                <Text style={styles.pinnedText}>MENSAJE FIJADO POR ADMIN</Text>
              </View>

              {posts.map(post => (
                <View key={post.id} style={styles.postCard}>
                  <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
                  <View style={styles.postHeader}>
                    <Image source={{ uri: post.avatar }} style={styles.avatar} />
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.postUser}>{post.user}</Text>
                        {post.user.includes('Master') && <RoleBadge label="LVL 99" color="#7CFF00" />}
                      </View>
                      <Text style={styles.postTime}>{post.time} • TRANSMISIÓN</Text>
                    </View>
                  </View>
                  <Text style={styles.postContent}>{post.content}</Text>
                  {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
                  <View style={styles.postFooter}>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Ionicons name="heart" size={18} color="#FF0033" />
                      <Text style={styles.actionText}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn}>
                      <Ionicons name="chatbubble-outline" size={18} color="rgba(255,255,255,0.6)" />
                      <Text style={styles.actionText}>12</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 'auto' }}>
                      <Ionicons name="share-outline" size={18} color="#00D4FF" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          ) : (
            <KeyboardAvoidingView 
              style={{ flex: 1 }} 
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
              <ScrollView contentContainerStyle={styles.chatScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.msgWrapper}>
                  <View style={styles.userRow}>
                    <Text style={[styles.userLabel, { color: '#00D4FF' }]}>OrbixBot</Text>
                    <RoleBadge label="SYSTEM" color="#00D4FF" />
                  </View>
                  <View style={styles.glassBubbleOther}>
                    <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
                    <Text style={styles.msgText}>Bienvenido al canal de sincronización.</Text>
                  </View>
                </View>

                <View style={[styles.msgWrapper, { alignSelf: 'flex-end' }]}>
                  <View style={styles.glassBubbleMe}>
                    <Text style={styles.msgText}>¡Listo para inyectar datos! ⚡️</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 4 }}>
                    <Ionicons name="checkmark-done" size={12} color="#00D4FF" style={{marginRight: 4}} />
                    <Text style={styles.chatTime}>12:05 PM</Text>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.inputArea}>
                <View style={styles.inputWrapper}>
                  <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
                  <TextInput 
                    style={styles.textInput}
                    placeholder="Escribe al núcleo..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={message}
                    onChangeText={setMessage}
                  />
                  <TouchableOpacity 
                    style={[styles.sendButton, { backgroundColor: message ? '#00D4FF' : 'rgba(255,255,255,0.1)' }]} 
                    onPress={() => setMessage('')}
                  >
                    <Ionicons name="flash" size={18} color={message ? "#000" : "#555"} />
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  safeArea: { flex: 1 },
  darkBase: { ...StyleSheet.absoluteFillObject, backgroundColor: '#020202' },
  gridOverlay: { ...StyleSheet.absoluteFillObject, opacity: 0.1, borderWidth: 0.5, borderColor: '#333', borderStyle: 'dashed' },
  plasmaOrb: { position: 'absolute', opacity: 0.6 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  groupInfo: { flex: 1, marginLeft: 10 },
  groupName: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  onlinePulse: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#7CFF00', marginRight: 6 },
  statusText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800' },
  settingsBtn: { width: 38, height: 38, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  backButton: { width: 30 },
  tabContainer: { paddingHorizontal: 20, marginVertical: 15 },
  tabTrack: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: 'rgba(255,255,255,0.1)' },
  tabText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  activeTabText: { color: '#00D4FF' },
  scrollPadding: { padding: 20, paddingTop: 0 },
  postCard: { borderRadius: 24, marginBottom: 20, padding: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 12 },
  postUser: { color: '#fff', fontSize: 14, fontWeight: '800' },
  postTime: { color: 'rgba(255,255,255,0.4)', fontSize: 10 },
  postContent: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20, marginBottom: 15 },
  postImage: { width: '100%', height: 200, borderRadius: 18, marginBottom: 10 },
  postFooter: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 15 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  actionText: { color: '#fff', fontSize: 12, marginLeft: 6, fontWeight: '600' },
  chatScroll: { padding: 20 },
  msgWrapper: { marginBottom: 20, maxWidth: '85%' },
  glassBubbleOther: { padding: 15, borderRadius: 20, borderTopLeftRadius: 4, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  glassBubbleMe: { padding: 15, borderRadius: 20, borderTopRightRadius: 4, backgroundColor: 'rgba(0, 212, 255, 0.15)', borderWidth: 1, borderColor: 'rgba(0, 212, 255, 0.3)' },
  msgText: { color: '#fff', fontSize: 14, lineHeight: 20 },
  chatTime: { fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: '600' },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6, marginLeft: 4 },
  userLabel: { fontSize: 11, fontWeight: '900' },
  inputArea: { padding: 20, paddingBottom: 20 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderRadius: 28, padding: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' },
  textInput: { flex: 1, color: '#fff', paddingHorizontal: 15, height: 45 },
  sendButton: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  roleBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, marginLeft: 8 },
  roleText: { fontSize: 8, fontWeight: '900' },
  pinnedBadge: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, backgroundColor: 'rgba(0, 212, 255, 0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start' },
  pinnedText: { color: '#00D4FF', fontSize: 8, fontWeight: '900', marginLeft: 6 }
});