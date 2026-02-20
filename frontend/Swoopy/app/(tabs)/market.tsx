import React, { useState } from "react";
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
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const CATEGORIES = ["Todos", "Peluches", "Hogar", "Limpieza", "Aromas"];

export default function ShopHome() {
  const router = useRouter();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("Seleccionar Ubicación");
  const [step, setStep] = useState(1);

  const locationData: any = {
    "México 🇲🇽": {
      "Chihuahua": ["Chihuahua Capital", "Ciudad Juárez", "Delicias", "Parral"],
      "Jalisco": ["Guadalajara", "Zapopan", "Puerto Vallarta"],
      "Nuevo León": ["Monterrey", "San Nicolás", "Guadalupe"]
    },
    "USA 🇺🇸": {
      "California": ["Los Angeles", "San Diego", "San Francisco"],
      "Texas": ["Houston", "Dallas", "Austin"],
      "Florida": ["Miami", "Orlando", "Tampa"]
    },
    "España 🇪🇸": {
      "Madrid": ["Madrid Centro", "Alcalá", "Getafe"],
      "Cataluña": ["Barcelona", "Girona", "Tarragona"]
    }
  };

  const countries = Object.keys(locationData);

  const handleCountryPress = (country: string) => {
    setSelectedCountry(country);
    setStep(2);
  };

  const handleStatePress = (state: string) => {
    setSelectedState(state);
    setStep(3);
  };

  const handleCityPress = (city: string) => {
    setSelectedCity(`${city}, ${selectedCountry}`);
    setModalVisible(false);
    setStep(1); 
  };

  const resetSelection = () => {
    setModalVisible(false);
    setStep(1);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.waveContainer}>
        <View style={[styles.wave, { top: height * 0.05, left: -width * 0.5 }]} />
        <View style={[styles.wave, { top: height * 0.5, right: -width * 0.6, borderColor: '#00D4FF' }]} />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.dateText}>COLECCIÓN 2026</Text>
            <Text style={styles.headerTitle}>Market<Text style={{color: '#00D4FF'}}>Place</Text></Text>
          </View>
          
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtnHeader} onPress={() => setModalVisible(true)}>
              <Ionicons name="location-outline" size={22} color="#00D4FF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconBtnHeader}>
              <Ionicons name="bag-handle-outline" size={22} color="#FFF" />
              <View style={styles.cartBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          <View style={styles.locDisplay}>
             <Ionicons name="pin" size={12} color="#00D4FF" />
             <Text style={styles.locDisplayText}>{selectedCity}</Text>
          </View>

          <View style={styles.searchWrapper}>
            <BlurView intensity={15} tint="light" style={styles.searchBar}>
              <Ionicons name="search" size={20} color="rgba(255,255,255,0.4)" style={{ marginRight: 10 }} />
              <TextInput 
                placeholder="Buscar productos..." 
                placeholderTextColor="rgba(255,255,255,0.4)" 
                style={styles.searchInput} 
              />
            </BlurView>
          </View>

          <View style={styles.heroContainer}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000" }}
              style={styles.heroImage}
            />
            <BlurView intensity={40} tint="dark" style={styles.heroOverlay}>
              <Text style={styles.heroTag}>NUEVA LLEGADA</Text>
              <Text style={styles.heroTitle}>Decora tu espacio tech</Text>
              <TouchableOpacity style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>Explorar</Text>
              </TouchableOpacity>
            </BlurView>
          </View>

          {/* SECCIÓN TODOS, PELUCHES, HOGAR, ETC. CON BLUR */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity 
                key={index} 
                activeOpacity={0.8}
                style={[styles.catItemContainer, index === 0 && styles.catActiveBorder]}
              >
                <BlurView intensity={index === 0 ? 30 : 10} tint="light" style={[styles.catItemBlur, index === 0 && styles.catActive]}>
                  <Text style={[styles.catText, index === 0 && styles.catTextActive]}>{cat}</Text>
                </BlurView>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Destacados</Text>
            <TouchableOpacity><Text style={styles.seeAll}>Ver todo</Text></TouchableOpacity>
          </View>

          {/* PRODUCTOS DESTACADOS CON BLUR */}
          <View style={styles.grid}>
            <ProductCard name="Peluche Snoopy" price="$200.00" image="https://images.unsplash.com/photo-1764432550495-a0666f5e8c81?q=80&w=1000" />
            <ProductCard name="Peluche Stitch" price="$250.00" image="https://http2.mlstatic.com/D_NQ_NP_742750-MLM95756083698_102025-O.webp" />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={resetSelection}>
        <View style={styles.modalOverlay}>
          <BlurView intensity={100} tint="dark" style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalStepText}>Paso {step} de 3</Text>
                <Text style={styles.modalTitle}>
                  {step === 1 ? "Selecciona País" : step === 2 ? "Selecciona Estado" : "Selecciona Ciudad"}
                </Text>
              </View>
              <TouchableOpacity onPress={resetSelection}>
                <Ionicons name="close-circle" size={32} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              {step === 1 && countries.map((c) => (
                <TouchableOpacity key={c} style={styles.itemRow} onPress={() => handleCountryPress(c)}>
                  <Text style={styles.itemText}>{c}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#00D4FF" />
                </TouchableOpacity>
              ))}

              {step === 2 && Object.keys(locationData[selectedCountry]).map((st) => (
                <TouchableOpacity key={st} style={styles.itemRow} onPress={() => handleStatePress(st)}>
                  <Text style={styles.itemText}>{st}</Text>
                  <Ionicons name="chevron-forward" size={20} color="#00D4FF" />
                </TouchableOpacity>
              ))}

              {step === 3 && locationData[selectedCountry][selectedState].map((ct: string) => (
                <TouchableOpacity key={ct} style={styles.itemRow} onPress={() => handleCityPress(ct)}>
                  <Text style={styles.itemText}>{ct}</Text>
                  <Ionicons name="pin" size={20} color="#00D4FF" />
                </TouchableOpacity>
              ))}

              {step > 1 && (
                <TouchableOpacity style={styles.backBtn} onPress={() => setStep(step - 1)}>
                  <Ionicons name="arrow-back" size={16} color="#00D4FF" />
                  <Text style={styles.backBtnText}>Regresar</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </BlurView>
        </View>
      </Modal>
    </View>
  );
}

const ProductCard = ({ name, price, image }: any) => {
  const router = useRouter();
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={styles.card} 
      onPress={() => router.push({ pathname: "/screens/detalles", params: { name, price, image } })}
    >
      <BlurView intensity={20} tint="dark" style={styles.cardBlur}>
        <View style={styles.cardImageContainer}>
          <Image source={{ uri: image }} style={styles.cardImg} />
        </View>
        <View style={styles.cardInfo}>
          <Text numberOfLines={1} style={styles.cardName}>{name}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardPrice}>{price}</Text>
            <View style={styles.addIcon}><Ionicons name="add" size={18} color="#000" /></View>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#05080D' },
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: 'hidden' },
  wave: { position: 'absolute', width: width * 2, height: width * 2, borderRadius: width, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.03)' },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15 },
  headerRight: { flexDirection: 'row', gap: 10 },
  dateText: { color: '#006EFF', fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  headerTitle: { color: '#FFF', fontSize: 32, fontWeight: '900' },
  iconBtnHeader: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cartBadge: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#00D4FF' },
  locDisplay: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  locDisplayText: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginLeft: 5, fontWeight: '600' },
  searchWrapper: { paddingHorizontal: 20, marginTop: 15 },
  searchBar: { height: 55, borderRadius: 18, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchInput: { flex: 1, color: '#FFF' },
  heroContainer: { marginHorizontal: 20, marginTop: 25, height: 160, borderRadius: 28, overflow: 'hidden' },
  heroImage: { ...StyleSheet.absoluteFillObject },
  heroOverlay: { flex: 1, padding: 20, justifyContent: 'center' },
  heroTag: { color: '#00D4FF', fontSize: 10, fontWeight: '900' },
  heroTitle: { color: '#FFF', fontSize: 22, fontWeight: '900', width: '70%', marginVertical: 8 },
  heroBtn: { backgroundColor: '#FFF', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, alignSelf: 'flex-start' },
  heroBtnText: { color: '#000', fontWeight: '800', fontSize: 12 },
  
  // SECCIÓN CATEGORÍAS (TODOS, PELUCHES, ETC)
  catScroll: { marginTop: 20, paddingLeft: 20 },
  catItemContainer: { marginRight: 10, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  catItemBlur: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.03)' },
  catActive: { backgroundColor: '#006EFF' },
  catActiveBorder: { borderColor: '#006EFF' },
  catText: { color: 'rgba(255,255,255,0.4)', fontWeight: '700' },
  catTextActive: { color: '#FFF' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  seeAll: { color: '#006EFF' },
  
  // SECCIÓN DESTACADOS
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 15 },
  card: { width: '48%', marginBottom: 15, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  cardBlur: { padding: 8, backgroundColor: 'rgba(255,255,255,0.03)' },
  cardImageContainer: { width: '100%', height: 140, borderRadius: 15, overflow: 'hidden' },
  cardImg: { width: '100%', height: '100%' },
  cardInfo: { padding: 8 },
  cardName: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  cardPrice: { color: '#00D4FF', fontWeight: '900' },
  addIcon: { backgroundColor: '#FFF', width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { height: '70%', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 25, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
  modalStepText: { color: '#00D4FF', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  modalTitle: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  itemText: { color: '#FFF', fontSize: 18, fontWeight: '500' },
  backBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: 'rgba(0,212,255,0.1)', paddingVertical: 12, borderRadius: 15 },
  backBtnText: { color: '#00D4FF', fontWeight: '700', marginLeft: 8 }
});