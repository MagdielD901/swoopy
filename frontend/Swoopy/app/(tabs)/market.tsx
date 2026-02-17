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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
const { width } = Dimensions.get("window");

export default function ShopHome() {
    
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <Ionicons name="menu" size={24} color="#FFF" />
            <Text style={styles.headerTitle}>Marketplace</Text>
            <Ionicons name="cart-outline" size={24} color="#00D4FF" />
          </View>

          {/* HERO BANNER */}
          <View style={styles.heroCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>
                Transforma tu hogar con tranquilidad pura
              </Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>Comprar Ahora</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: "https://content.elmueble.com/medio/2019/09/24/salon-comedor-con-grandes-y-sofa-con-funda-blanca_0214a183_2000x1333.jpg" }}
              style={styles.heroImage}
            />
          </View>

          {/* POPULAR PRODUCTS */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Productos populares</Text>
            <Text style={styles.seeMore}>Ver más</Text>
          </View>

          <View style={styles.grid}>
            <ProductCard
              name="Peluche Snoopy"
              price="$200.00"
              image="https://www.bambibaby.com/cdn/shop/files/plush_snoopy__01141.1601698566.1280.1280.jpg?v=1724318190&width=1000"
             
            />
           <ProductCard
              name="Peluche Stitch"
              price="$200.00"
              image="https://http2.mlstatic.com/D_NQ_NP_742750-MLM95756083698_102025-O.webp"
            />
            <ProductCard
              name="Velas Aromáticas"
              price="$129.99"
              image="https://image.made-in-china.com/2f0j00yZPVEIUsbjkQ/Hot-Sale-Healing-The-Mood-Yoga-SPA-Black-Classic-Glass-Jar-Scented-Candle-in-Gift-Box-with-Hot-Stamp-Sticker-Butterfly-Ribbon.jpg"
            />
            <ProductCard
              name="Productos Limpieza"
              price="$99.99"
              image="https://greenproductosdelimpieza.com/wp-content/uploads/2020/06/quimicos-green.jpg"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const ProductCard = ({ name, price, image }: any) => {
 const router = useRouter();
    return(
  <TouchableOpacity style={styles.card}onPress={() => router.push({
        pathname:"/screens/detalles",
        params: { name, price, image },
    })}>
    <Image source={{ uri: image }} style={styles.cardImage} />
    <View style={styles.cardInfo}>
      <Text style={styles.cardName}>{name}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
    </View>
    <TouchableOpacity style={styles.favoriteBtn}>
      <Ionicons name="heart-outline" size={18} color="#00D4FF" />
    </TouchableOpacity>
  </TouchableOpacity>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080D",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "800",
  },

  heroCard: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  heroTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
    width: width * 0.4,
  },

  buyButton: {
    backgroundColor: "#006EFF",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  buyText: {
    color: "#FFF",
    fontWeight: "700",
  },

  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginLeft: 15,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },

  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
  },

  seeMore: {
    color: "#00D4FF",
    fontSize: 13,
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: 15,
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: 130,
  },

  cardInfo: {
    padding: 12,
  },

  cardName: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "600",
  },

  cardPrice: {
    color: "#00D4FF",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 5,
  },

  favoriteBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,212,255,0.15)",
    padding: 6,
    borderRadius: 20,
  },
});
