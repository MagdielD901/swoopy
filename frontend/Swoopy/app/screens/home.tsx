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
            <Text style={styles.headerTitle}>Feed</Text>
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
          <View style={styles.discoverySection}>
            <Text style={styles.discoveryTitle}>Descubrimiento</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 10}}>
                <View style={styles.discoveryCard}>
                  <Image source={require("../../assets/images/swoopy.png")} style={styles.discoveryAvatar} />
                    <Text style={styles.discoveryName}>@swoopy</Text>
                </View>
                <View style={styles.discoveryCard}>
                  <Image source={{ uri: 'https://randomuser.me/api/portraits/women/55.jpg' }} style={styles.discoveryAvatar} />
                    <Text style={styles.discoveryName}>@diane.m</Text>
                </View>
              </ScrollView>
          </View>

          <View style={styles.mainLayout}>
            {/* COLUMNA PRINCIPAL - POSTS */}
            <View style={styles.postColumn}>
              <View style={styles.glassCard}>
                <View style={styles.userInfo}>
                  <Image 
                    source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} 
                    style={styles.userAvatar} 
                  />
                  <Text style={styles.userName}>@annasmith</Text>
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

          <View style={styles.mainLayout}>
            {}
              <View style={styles.postColumn}>
                <View style={styles.glassCard}>
                  <View style={styles.userInfo}>
                    <Image 
                      source={require("../../assets/images/swoopy.png")} 
                      style={styles.userAvatar} 
                    />
                    <Text style={styles.userName}>@swoopy</Text>
                  </View>
                <Text style={styles.postDescription}>
                  "Nomás no te rajes."
                  <Text style={styles.hashtag}> #Motivación</Text>
                </Text>
                <View style={styles.interactions}>
                  <Interaction icon="heart" count="1.2K" color="#FF375F" />
                  <Interaction icon="chatbubble" count="345" color="#32D74B" />
                  <Interaction icon="share-outline" count="120" color="#FFF" />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.factCard}>
            <Text style={styles.factTitle}>¿Sabías que…?</Text>
              <Text style={styles.factText}>
                El primer mensaje enviado por Internet fue “LO” en 1969. 😲
              </Text>
              <View style={styles.interactions}>
                <Interaction icon="heart" count="1.2K" color="#FF375F" />
                <Interaction icon="chatbubble" count="345" color="#32D74B" />
                <Interaction icon="share-outline" count="120" color="#FFF" />
              </View>
          </View>

          <View style={styles.marketplaceSection}>
  <Text style={styles.marketplaceTitle}>Marketplace</Text>
  <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false} 
    style={{ marginTop: 10 }}
  >
    {/* Producto 1 */}
    <View style={styles.marketplaceCard}>
      <Image 
        source={require("../../assets/images/sushi.jpg")} 
        style={styles.marketplaceImage} 
        resizeMode="cover" 
      />
      <Text style={styles.marketplaceName}>Sushi</Text>
      <Text style={styles.marketplacePrice}>$99.99</Text>
    </View>

    {/* Producto 2 */}
    <View style={styles.marketplaceCard}>
      <Image 
        source={require("../../assets/images/reloj.jpg")}  
        style={styles.marketplaceImage} 
      />
      <Text style={styles.marketplaceName}>Smartwatch Pro</Text>
      <Text style={styles.marketplacePrice}>$129.99</Text>
    </View>

    {/* Producto 3 */}
    <View style={styles.marketplaceCard}>
      <Image 
        source={require("../../assets/images/bonsai.jpg")} 
        style={styles.marketplaceImage} 
      />
      <Text style={styles.marketplaceName}>Bonsái</Text>
      <Text style={styles.marketplacePrice}>$199.99</Text>
    </View>
  </ScrollView>
</View>


        </ScrollView>

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
  profileImage: { width: 54, height: 54, borderRadius: 27, borderWidth: 1.5, borderColor: '#006EFF' },
  profileGlow: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#006EFF',
    opacity: 0.5,
  },
  addBadge: {
    position: 'absolute',
    bottom: 2, right: 2,
    backgroundColor: '#006EFF',
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
    marginBottom: 20,
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
  factCard: {
  backgroundColor: 'rgba(0, 212, 255, 0.1)',
  borderRadius: 20,
  padding: 16,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: 'rgba(0, 212, 255, 0.3)',
},
factTitle: { color: '#00D4FF', fontWeight: '900', fontSize: 16, marginBottom: 8 },
factText: { color: '#FFF', fontSize: 13, lineHeight: 18 },
discoverySection: { marginBottom:20 },
discoveryTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },
discoveryCard: { alignItems: 'center', marginRight: 16 },
discoveryAvatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 6, borderWidth: 2, borderColor: '#006EFF' },
discoveryName: { color: '#FFF', fontSize: 12, fontWeight: '600' },
marketplaceSection: { marginTop: 30 },
marketplaceTitle: { color: '#FFF', fontSize: 16, fontWeight: '800', marginBottom: 10 },
marketplaceCard: { 
  width: 140, 
  marginRight: 16, 
  backgroundColor: 'rgba(255,255,255,0.07)', 
  borderRadius: 20, 
  padding: 10, 
  alignItems: 'center', 
  borderWidth: 1, 
  borderColor: 'rgba(255,255,255,0.12)',
},
marketplaceImage: { width: "100%", flex:1, height: 100, borderRadius: 16, marginBottom: 8 },
marketplaceName: { color: '#FFF', fontSize: 12, fontWeight: '600', textAlign: 'center' },
marketplacePrice: { color: '#00D4FF', fontSize: 12, fontWeight: '700', marginTop: 4 },
});