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
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur"; // Asegúrate de tener: npx expo install expo-blur

const { width, height } = Dimensions.get('window');

// Paleta de colores "Esencia Swoopy"
const COLORS = {
  bg: '#05080D',
  accent: '#00D4FF',
  primary: '#006EFF',
  purple: '#7000FF',
  white: '#FFFFFF',
  glass: 'rgba(255, 255, 255, 0.05)',
  border: 'rgba(255, 255, 255, 0.1)'
};

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* FONDO DE OLAS ORGÁNICAS */}
      <View style={styles.waveContainer}>
        <View style={[styles.wave, { top: height * 0.1, left: -width * 0.5 }]} />
        <View style={[styles.wave, { top: height * 0.5, right: -width * 0.6, borderColor: COLORS.primary }]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>VIERNES, 30 ENE. 2026</Text>
            <Text style={styles.headerTitle}>Feed</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileContainer}
            onPress={() => router.push("/screens/perfil_general")}
          >
            <Image source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} style={styles.profileImage} />
            <View style={styles.addBadge}><Ionicons name="add" size={14} color="#FFF" /></View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* SECCIÓN DESCUBRIMIENTO (STORIES) */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Descubrimiento</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <StoryCard name="Tu Story" isUser uri="https://randomuser.me/api/portraits/women/44.jpg" />
              <StoryCard name="swoopy" img={require("../../assets/images/swoopy.png")} />
              <StoryCard name="diane.m" uri="https://randomuser.me/api/portraits/women/55.jpg" />
              <StoryCard name="alex_v" uri="https://randomuser.me/api/portraits/men/32.jpg" />
            </ScrollView>
          </View>

          {/* 1. POST PRINCIPAL CON BLUR */}
          <View style={styles.postWrapper}>
            <View style={styles.glassCardContainer}>
              <BlurView intensity={12} tint="dark" style={styles.absoluteBlur} />
              <View style={styles.cardHeader}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg' }} style={styles.userAvatar} />
                <View>
                  <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/screens/perfil_general")}>
                    <Text style={styles.userName}>@annasmith</Text>
                  </TouchableOpacity>
                  <Text style={styles.userLocation}>Neo-Terra City</Text>
                </View>
                <TouchableOpacity style={styles.moreOptions}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="rgba(255,255,255,0.4)" />
                </TouchableOpacity>
              </View>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=870' }} style={styles.postImage} />
              <View style={styles.cardContent}>
                <Text style={styles.postDescription}>Explorando las ciber-capitales. <Text style={styles.hashtag}>#FutureTravel</Text></Text>
                <View style={styles.divider} />
                <View style={styles.interactions}>
                  <Interaction icon="heart" count="1.2K" color="#FF375F" />
                  <Interaction icon="chatbubble-outline" count="345" color="#FFF" />
                </View>
              </View>
            </View>
          </View>

          {/* 2. POST DINÁMICO (VARIAS IMÁGENES) */}
          <View style={styles.postWrapper}>
            <View style={styles.glassCardContainer}>
              <BlurView intensity={12} tint="dark" style={styles.absoluteBlur} />
              <View style={styles.cardHeader}>
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/22.jpg' }} style={styles.userAvatar} />
                <View>
                  <Text style={styles.userName}>@kyle_lab</Text>
                  <Text style={styles.userLocation}>Research Center</Text>
                </View>
              </View>
              <View style={styles.multiImageContainer}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500' }} style={styles.imageMain} />
                <View style={styles.imageSideCol}>
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=500' }} style={styles.imageSmall} />
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500' }} style={styles.imageSmall} />
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.postDescription}>Nuevos horizontes capturados. ✨</Text>
                <View style={[styles.interactions, { marginTop: 10 }]}>
                  <Interaction icon="heart-outline" count="4.8K" color="#FFF" />
                  <Interaction icon="share-social-outline" count="21" color="#FFF" />
                </View>
              </View>
            </View>
          </View>

          {/* 3. POST DE TEXTO */}
          <View style={styles.postWrapper}>
            <View style={styles.glassCardContainer}>
              <BlurView intensity={12} tint="dark" style={styles.absoluteBlur} />
              <View style={[styles.cardHeader, { paddingTop: 20 }]}>
                <Image source={require("../../assets/images/swoopy.png")} style={styles.userAvatar} />
                <Text style={styles.userName}>@swoopy</Text>
              </View>
              <Text style={styles.quoteText}>"Nomás no te rajes."</Text>
              <View style={[styles.cardContent, { paddingBottom: 20 }]}>
                <Text style={styles.hashtag}>#Motivación #DailyQuote</Text>
              </View>
            </View>
          </View>

          {/* MARKETPLACE CON BLUR Y BADGES */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitleNoMargin}>Marketplace</Text>
              <TouchableOpacity><Text style={styles.seeAllText}>Ver todo</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <MarketItem name="Sushi Premium" price="$99.99" rarity="Legendary" img={{uri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500'}} />
              <MarketItem name="Smartwatch Pro" price="$129.99" rarity="Rare" img={{uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'}} />
              <MarketItem name="Bonsái Zen" price="$199.99" rarity="Common" img={{uri: 'https://images.unsplash.com/photo-1512428813833-df4d23730013?w=500'}} />
            </ScrollView>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// --- COMPONENTES AUXILIARES ---

const Interaction = ({ icon, count, color }: any) => (
  <TouchableOpacity style={styles.interactionItem}>
    <Ionicons name={icon as any} size={20} color={color} />
    <Text style={[styles.interactionText, { color: color === '#FFF' ? 'rgba(255,255,255,0.7)' : color }]}>{count}</Text>
  </TouchableOpacity>
);

const StoryCard = ({ name, uri, img, isUser }: any) => (
  <View style={styles.storyWrapper}>
    <View style={[styles.storyCircle, isUser && styles.userStoryBorder]}>
      <Image source={img ? img : { uri }} style={styles.storyImage} />
    </View>
    <Text style={styles.storyName} numberOfLines={1}>{name}</Text>
  </View>
);

const MarketItem = ({ name, price, img, rarity }: any) => (
  <TouchableOpacity style={styles.marketCard} activeOpacity={0.8}>
    <BlurView intensity={12} tint="dark" style={styles.absoluteBlur} />
    <View style={styles.marketImageWrapper}>
      <Image source={img} style={styles.marketImage} />
      <View style={[styles.rarityBadge, { backgroundColor: rarity === 'Legendary' ? COLORS.purple : rarity === 'Rare' ? COLORS.accent : 'rgba(255,255,255,0.2)' }]}>
        <Text style={styles.rarityText}>{rarity}</Text>
      </View>
    </View>
    <View style={styles.marketInfo}>
      <Text style={styles.marketName} numberOfLines={1}>{name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.marketPrice}>{price}</Text>
        <Ionicons name="flash" size={12} color={COLORS.accent} />
      </View>
    </View>
  </TouchableOpacity>
);

// --- ESTILOS ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  absoluteBlur: { ...StyleSheet.absoluteFillObject },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden', zIndex: 0 },
  wave: { position: 'absolute', width: width * 2, height: width * 2, borderRadius: width, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  safeArea: { flex: 1, zIndex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  dateText: { color: COLORS.primary, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { color: COLORS.white, fontSize: 32, fontWeight: '900' },
  profileContainer: { position: 'relative' },
  profileImage: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: COLORS.primary },
  addBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.primary, width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: COLORS.bg },
  scrollContent: { paddingBottom: 50 },
  sectionContainer: { marginTop: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitle: { color: COLORS.white, fontSize: 18, fontWeight: '800', paddingHorizontal: 20, marginBottom: 15 },
  sectionTitleNoMargin: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
  seeAllText: { color: COLORS.primary, fontWeight: '600', fontSize: 13 },
  horizontalScroll: { paddingLeft: 20 },
  storyWrapper: { alignItems: 'center', marginRight: 18 },
  storyCircle: { width: 66, height: 66, borderRadius: 33, padding: 3, borderWidth: 2, borderColor: COLORS.accent, marginBottom: 8, justifyContent: 'center', alignItems: 'center' },
  userStoryBorder: { borderColor: 'rgba(255,255,255,0.2)', borderStyle: 'dashed' },
  storyImage: { width: '100%', height: '100%', borderRadius: 30 },
  storyName: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '500', width: 70, textAlign: 'center' },
  
  // POSTS CON GLASSMORPHISM
  postWrapper: { paddingHorizontal: 16, marginTop: 20 },
  glassCardContainer: { 
    borderRadius: 28, 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    overflow: 'hidden', 
    backgroundColor: 'transparent' 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  userAvatar: { width: 36, height: 36, borderRadius: 12, marginRight: 12 },
  userName: { color: COLORS.white, fontWeight: '700', fontSize: 15 },
  userLocation: { color: 'rgba(255,255,255,0.4)', fontSize: 11 },
  moreOptions: { marginLeft: 'auto' },
  postImage: { width: '92%', height: 240, borderRadius: 20, alignSelf: 'center' },
  cardContent: { padding: 16 },
  postDescription: { color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 20 },
  hashtag: { color: COLORS.accent, fontWeight: '700' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 15 },
  interactions: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  interactionItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  interactionText: { fontSize: 13, fontWeight: '600' },
  quoteText: { color: COLORS.white, fontSize: 22, fontWeight: '800', paddingHorizontal: 16, fontStyle: 'italic', marginVertical: 10 },

  // MARKETPLACE
  marketCard: { width: 170, marginRight: 16, borderRadius: 24, padding: 8, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
  marketImageWrapper: { width: '100%', height: 120, borderRadius: 18, overflow: 'hidden' },
  marketImage: { width: '100%', height: '100%' },
  rarityBadge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  rarityText: { color: COLORS.white, fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  marketInfo: { paddingHorizontal: 4, marginTop: 10 },
  marketName: { color: COLORS.white, fontSize: 13, fontWeight: '600' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  marketPrice: { color: COLORS.accent, fontSize: 14, fontWeight: '800' },

  multiImageContainer: { flexDirection: 'row', height: 250, width: '92%', alignSelf: 'center', gap: 10 },
  imageMain: { flex: 1.5, height: '100%', borderRadius: 20 },
  imageSideCol: { flex: 1, gap: 10 },
  imageSmall: { flex: 1, width: '100%', borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.05)' },
});