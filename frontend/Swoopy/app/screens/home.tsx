import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Fondo con gradiente simulado por círculos de luz */}
      <View style={styles.glowCircle} />

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>FRI, JAN 30, 2026</Text>
            <Text style={styles.headerTitle}>Feeds</Text>
          </View>
          <TouchableOpacity style={styles.profileWrapper}>
            <View style={styles.profileGlow} />
            <Image 
              source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
              style={styles.profileImage} 
            />
            <View style={styles.addBadge}>
              <Ionicons name="add" size={12} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.mainLayout}>
            {/* COLUMNA PRINCIPAL - POSTS */}
            <View style={styles.postColumn}>
              <View style={styles.glassCard}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} 
                    style={styles.userAvatar} 
                  />
                  <Text style={styles.userName}>Anna_Smith</Text>
                </View>

                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=870' }} 
                  style={styles.postImage} 
                />

                <Text style={styles.postDescription}>
                  Exploring the cyber-capitals of Neo-Terra! Amazing architecture. 
                  <Text style={styles.hashtag}> #FutureTravel #AI</Text>
                </Text>

                <View style={styles.interactions}>
                  <Interaction icon="heart" count="1.2K" color="#FF375F" />
                  <Interaction icon="chatbubble" count="345" color="#32D74B" />
                  <Interaction icon="share-outline" count="120" color="#FFF" />
                </View>
              </View>
            </View>

          
          </View>

        </ScrollView>

        {/* BOTTOM TAB BAR */}
        <View style={styles.tabBar}>
          <TabItem icon="chatbubbles" label="Chats" active />
          <TabItem icon="search" label="Explore" />
          <TabItem icon="people" label="Communities" />
          <TabItem icon="settings" label="Settings" />
        </View>
      </SafeAreaView>
    </View>
  );
}

// Sub-componentes para limpiar el código
const Interaction = ({ icon, count, color }: any) => (
  <View style={styles.interactionItem}>
    <Ionicons name={icon as any} size={18} color={color} />
    <Text style={styles.interactionText}>{count}</Text>
  </View>
);

const TrendItem = ({ tag, count }: any) => (
  <View style={styles.trendItem}>
    <Text style={styles.trendTag}>{tag}</Text>
    <Text style={styles.trendCount}>{count}</Text>
  </View>
);

const TabItem = ({ icon, label, active }: any) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons 
      name={active ? (icon) : (`${icon}-outline` as any)} 
      size={24} 
      color={active ? "#FFF" : "rgba(255,255,255,0.4)"} 
    />
    <Text style={[styles.tabLabel, active && {color: '#FFF'}]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E17' },
  glowCircle: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    zIndex: 0,
  },
  safeArea: { flex: 1, zIndex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dateText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  headerTitle: { color: '#FFF', fontSize: 34, fontWeight: '900' },
  profileWrapper: { position: 'relative', padding: 3 },
  profileImage: { width: 54, height: 54, borderRadius: 27, borderWidth: 1.5, borderColor: '#00D4FF' },
  profileGlow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    opacity: 0.5,
  },
  addBadge: {
    position: 'absolute',
    bottom: 2, right: 2,
    backgroundColor: '#00D4FF',
    width: 20, height: 20,
    borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#0A0E17',
  },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  mainLayout: { flexDirection: 'row', gap: 15 },
  postColumn: { flex: 2 },
  sideColumn: { flex: 1 },
  
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  userAvatar: { width: 32, height: 32, borderRadius: 10, marginRight: 10 },
  userName: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  postImage: { width: '100%', height: 160, borderRadius: 16, marginBottom: 12 },
  postDescription: { color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 18 },
  hashtag: { color: '#00D4FF', fontWeight: '600' },
  interactions: { flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' },
  interactionItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  interactionText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  trendsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  trendsTitle: { color: '#FFF', fontSize: 16, fontWeight: '800', marginBottom: 15 },
  trendItem: { marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between' },
  trendTag: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '500' },
  trendCount: { color: 'rgba(255,255,255,0.3)', fontSize: 11 },

  tabBar: {
    position: 'absolute',
    bottom: 30, left: 20, right: 20,
    height: 75,
    backgroundColor: 'rgba(15, 20, 30, 0.92)',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000', shadowOpacity: 0.5, shadowRadius: 20,
  },
  tabItem: { alignItems: 'center' },
  tabLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 5, fontWeight: '600' },
});