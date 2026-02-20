import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

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

export default function ComunidadDetalle() {
  const [activeTab, setActiveTab] = useState<Tab>('FEED');
  const [message, setMessage] = useState('');

  const switchTab = (tab: Tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  // Datos de ejemplo para el Feed
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
      <SafeAreaView style={styles.safeArea}>
        
        {/* HEADER CON MINI ORB */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>CENTRAL DE DATOS</Text>
            <Text style={styles.statusText}>45 Nodos Activos</Text>
          </View>
          <View style={styles.miniOrb}>
             <View style={[styles.miniOrbInner, { borderColor: '#00D4FF' }]} />
          </View>
        </View>

        {/* SELECTOR DE TABS ESTILO CRISTAL */}
        <View style={styles.tabContainer}>
          <BlurView intensity={10} tint="dark" style={styles.tabBlur}>
            <TouchableOpacity 
              onPress={() => switchTab('FEED')}
              style={[styles.tabButton, activeTab === 'FEED' && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === 'FEED' && styles.activeTabText]}>FEED</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => switchTab('CHAT')}
              style={[styles.tabButton, activeTab === 'CHAT' && styles.activeTab]}
            >
              <Text style={[styles.tabText, activeTab === 'CHAT' && styles.activeTabText]}>CORE CHAT</Text>
            </TouchableOpacity>
          </BlurView>
        </View>

        {activeTab === 'FEED' ? (
          /* SECCIÓN DE PUBLICACIONES */
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
            {posts.map(post => (
              <View key={post.id} style={styles.postCard}>
                <BlurView intensity={12} tint="dark" style={StyleSheet.absoluteFill} />
                <View style={styles.postHeader}>
                  <Image source={{ uri: post.avatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.postUser}>{post.user}</Text>
                    <Text style={styles.postTime}>{post.time}</Text>
                  </View>
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}
                <View style={styles.postFooter}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="heart-outline" size={20} color="#FF0033" />
                    <Text style={styles.actionText}>{post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="share-social-outline" size={20} color="#00D4FF" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          /* SECCIÓN DE CHAT (TU FAVORITO) */
          <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
          >
            <ScrollView contentContainerStyle={styles.chatScroll}>
              <View style={styles.msgWrapper}>
                <Text style={[styles.userLabel, { color: '#00D4FF' }]}>OrbixBot</Text>
                <View style={styles.glassBubbleContainer}>
                  <BlurView intensity={10} tint="dark" style={StyleSheet.absoluteFill} />
                  <View style={styles.glassBubble}>
                    <Text style={styles.msgText}>Bienvenido al canal de sincronización directa.</Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.inputArea}>
              <View style={styles.inputGlassContainer}>
                <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                <View style={styles.inputInner}>
                  <TextInput 
                    style={styles.textInput}
                    placeholder="Inyectar mensaje..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={message}
                    onChangeText={setMessage}
                  />
                  <TouchableOpacity style={styles.sendButton}>
                    <Ionicons name="flash" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  safeArea: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 15,
  },
  backButton: { width: 40 },
  groupInfo: { flex: 1 },
  groupName: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  statusText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' },
  miniOrb: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#02131f', justifyContent: 'center', alignItems: 'center' },
  miniOrbInner: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5 },

  /* TABS */
  tabContainer: { paddingHorizontal: 20, marginBottom: 10 },
  tabBlur: { flexDirection: 'row', borderRadius: 15, padding: 4, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  tabButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: 'rgba(255,255,255,0.1)' },
  tabText: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '900' },
  activeTabText: { color: '#00D4FF' },

  /* FEED POSTS */
  scrollPadding: { padding: 20 },
  postCard: { borderRadius: 24, marginBottom: 20, padding: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 12, marginRight: 10 },
  postUser: { color: '#fff', fontSize: 14, fontWeight: '700' },
  postTime: { color: 'rgba(255,255,255,0.3)', fontSize: 10 },
  postContent: { color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 18, marginBottom: 12 },
  postImage: { width: '100%', height: 180, borderRadius: 16, marginBottom: 12 },
  postFooter: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  actionText: { color: '#fff', fontSize: 12, marginLeft: 6 },

  /* CHAT STYLES */
  chatScroll: { padding: 20 },
  msgWrapper: { marginBottom: 20, alignSelf: 'flex-start', maxWidth: '80%' },
  userLabel: { fontSize: 10, fontWeight: '900', marginBottom: 4, marginLeft: 4 },
  glassBubbleContainer: { borderRadius: 18, overflow: 'hidden' },
  glassBubble: { padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  msgText: { color: '#fff', fontSize: 14 },
  
  inputArea: { padding: 20, marginBottom: Platform.OS === 'ios' ? 0 : 10 },
  inputGlassContainer: { borderRadius: 25, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  inputInner: { flexDirection: 'row', alignItems: 'center', padding: 6, paddingHorizontal: 15 },
  textInput: { flex: 1, color: '#fff', height: 40, fontSize: 14 },
  sendButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#00D4FF', justifyContent: 'center', alignItems: 'center' }
});