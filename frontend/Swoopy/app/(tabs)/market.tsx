import React from "react";
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
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const CATEGORIES = ["Todos", "Peluches", "Hogar", "Limpieza", "Aromas"];

export default function ShopHome() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* FONDO DE OLAS ORGÁNICAS (Igual que en tu Home) */}
      <View style={styles.waveContainer}>
        <View style={[styles.wave, { top: height * 0.05, left: -width * 0.5 }]} />
        <View style={[styles.wave, { top: height * 0.5, right: -width * 0.6, borderColor: '#00D4FF' }]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        {/* HEADER CON TU TÍTULO MARKETPLACE */}
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>COLECCIÓN 2026</Text>
            <Text style={styles.headerTitle}>Market<Text style={{color: '#00D4FF'}}>Place</Text></Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="bag-handle" size={24} color="#00D4FF" />
            <View style={styles.cartBadge} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* SEARCH BAR GLASSMORPHISM */}
          <View style={styles.searchWrapper}>
            <BlurView intensity={10} tint="light" style={styles.searchBar}>
              <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" style={{ marginRight: 10 }} />
              <TextInput 
                placeholder="Buscar productos..." 
                placeholderTextColor="rgba(255,255,255,0.4)" 
                style={styles.searchInput} 
              />
            </BlurView>
          </View>

          {/* HERO BANNER ESTILO FEED */}
          <View style={styles.heroContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000" }}
              style={styles.heroImage}
            />
            <BlurView intensity={30} tint="dark" style={styles.heroOverlay}>
              <Text style={styles.heroTag}>NUEVA LLEGADA</Text>
              <Text style={styles.heroTitle}>Decora tu espacio tech</Text>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>Explorar</Text>
              </TouchableOpacity>
            </BlurView>
          </View>

          {/* CATEGORIES HORIZONTAL */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity key={index} style={[styles.catItem, index === 0 && styles.catActive]}>
                <Text style={[styles.catText, index === 0 && styles.catTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* SECTION HEADER */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destacados</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Ver todo</Text></TouchableOpacity>
          </View>

          {/* PRODUCT GRID */}
          <View style={styles.grid}>
            <ProductCard
              name="Peluche Snoopy"
              price="$200.00"
              image="https://images.unsplash.com/photo-1764432550495-a0666f5e8c81?q=80&w=1000"
            />
            <ProductCard
              name="Peluche Stitch"
              price="$250.00"
              image="https://http2.mlstatic.com/D_NQ_NP_742750-MLM95756083698_102025-O.webp"
            />
            <ProductCard
              name="Velas Zen"
              price="$129.99"
              image="https://image.made-in-china.com/2f0j00yZPVEIUsbjkQ/Hot-Sale-Healing-The-Mood-Yoga-SPA-Black-Classic-Glass-Jar-Scented-Candle-in-Gift-Box-with-Hot-Stamp-Sticker-Butterfly-Ribbon.jpg"
            />
            <ProductCard
              name="Kit Limpieza"
              price="$99.99"
              image="https://greenproductosdelimpieza.com/wp-content/uploads/2020/06/quimicos-green.jpg"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// COMPONENTE DE TARJETA ESTILO "GLASS"
const ProductCard = ({ name, price, image }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={styles.card} 
      onPress={() => router.push({ pathname: "/screens/detalles", params: { name, price, image } })}
    >
      <View style={styles.cardImageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.cardImg} />
        ) : (
          <View style={[styles.cardImg, { backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }]}>
            <Ionicons name="image-outline" size={30} color="rgba(255,255,255,0.2)" />
          </View>
        )}
        <BlurView intensity={40} tint="dark" style={styles.favBadge}>
          <Ionicons name="heart" size={14} color="#00D4FF" />
        </BlurView>
      </View>
      
      <View style={styles.cardInfo}>
        <Text numberOfLines={1} style={styles.cardName}>{name}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{price}</Text>
          <View style={styles.addIcon}>
            <Ionicons name="add" size={18} color="#000" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05080D' },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  wave: { position: 'absolute', width: width * 2, height: width * 2, borderRadius: width, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.03)' },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15 },
  dateText: { color: '#006EFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { color: '#FFF', fontSize: 32, fontWeight: '900' },
  iconBtn: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cartBadge: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#00D4FF', borderWidth: 2, borderColor: '#05080D' },
  
  searchWrapper: { paddingHorizontal: 20, marginTop: 25 },
  searchBar: { height: 55, borderRadius: 18, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  searchInput: { flex: 1, color: '#FFF', fontSize: 15 },
  
  heroContainer: { marginHorizontal: 20, marginTop: 25, height: 180, borderRadius: 28, overflow: 'hidden' },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  heroOverlay: { flex: 1, padding: 22, justifyContent: 'center' },
  heroTag: { color: '#00D4FF', fontSize: 11, fontWeight: '900', marginBottom: 8 },
  heroTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', width: '70%', marginBottom: 15 },
  heroBtn: { backgroundColor: '#FFF', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 12, alignSelf: 'flex-start' },
  heroBtnText: { color: '#000', fontWeight: '800', fontSize: 13 },

  catScroll: { marginTop: 25, paddingLeft: 20 },
  catItem: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 15, marginRight: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  catActive: { backgroundColor: '#006EFF', borderColor: '#006EFF' },
  catText: { color: 'rgba(255,255,255,0.4)', fontWeight: '700' },
  catTextActive: { color: '#FFF' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, paddingHorizontal: 20 },
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  seeAll: { color: '#006EFF', fontWeight: '600' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20 },
  card: { width: '47%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 8, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cardImageContainer: { width: '100%', height: 160, borderRadius: 20, overflow: 'hidden' },
  cardImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  favBadge: { position: 'absolute', top: 10, right: 10, padding: 8, borderRadius: 12, overflow: 'hidden' },
  cardInfo: { padding: 10 },
  cardName: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  cardPrice: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  addIcon: { backgroundColor: '#FFF', width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
});