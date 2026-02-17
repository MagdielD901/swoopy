import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
const { width, height } = Dimensions.get("window");

export default function ProductDetailScreen({ route, navigation }: any) {
  //const { product } = route.params;
   const { name, price, image } = useLocalSearchParams();
  /*  const product ={
      name:"Velas Aromáticas",
              price:"$129.99",
              image:"https://image.made-in-china.com/2f0j00yZPVEIUsbjkQ/Hot-Sale-Healing-The-Mood-Yoga-SPA-Black-Classic-Glass-Jar-Scented-Candle-in-Gift-Box-with-Hot-Stamp-Sticker-Butterfly-Ribbon.jpg"
          
    }*/
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>

        {/* HEADER FLOATING */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.favoriteBtn}>
            <Ionicons name="heart-outline" size={20} color="#00D4FF" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* PRODUCT IMAGE */}
          <Image source={{ uri: image }} style={styles.productImage} />

          {/* INFO CARD */}
          <View style={styles.infoCard}>
            <View style={styles.ratingRow}>
              <Text style={styles.productName}>{name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>

            <Text style={styles.price}>{price}</Text>

            <Text style={styles.description}>
              Diseñado para elevar tu espacio con elegancia y tecnología.
              Materiales premium, diseño minimalista y experiencia envolvente.
            </Text>

            {/* COLOR OPTIONS */}
            <View style={styles.colorRow}>
              <View style={[styles.colorDot, { backgroundColor: "#111" }]} />
              <View style={[styles.colorDot, { backgroundColor: "#006EFF" }]} />
              <View style={[styles.colorDot, { backgroundColor: "#00D4FF" }]} />
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM ACTION BAR */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.addToCart}>
            <Text style={styles.addToCartText}>Add to cart</Text>
            <Ionicons name="cart-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080D",
  },

  topBar: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  productImage: {
    width: width,
    height: height * 0.45,
    resizeMode: "cover",
  },

  infoCard: {
    marginTop: -40,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 24,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productName: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "800",
    width: "75%",
  },

  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },

  ratingText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 13,
  },

  price: {
    color: "#00D4FF",
    fontSize: 22,
    fontWeight: "900",
    marginTop: 10,
  },

  description: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 15,
  },

  colorRow: {
    flexDirection: "row",
    marginTop: 20,
    gap: 15,
  },

  colorDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },

  bottomBar: {
    padding: 20,
    backgroundColor: "#05080D",
  },

  addToCart: {
    backgroundColor: "#006EFF",
    paddingVertical: 16,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  addToCartText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
  },

  favoriteBtn: {
    backgroundColor: "rgba(0,212,255,0.15)",
    padding: 8,
    borderRadius: 20,
  },
});
