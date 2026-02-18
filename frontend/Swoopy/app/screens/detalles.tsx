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
import { useLocalSearchParams, useRouter } from "expo-router";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { name, price, image } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER - BOTONES FLOTANTES MÁS PEQUEÑOS Y FINOS */}
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.circleBtn} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleBtn}>
            <Ionicons name="heart-outline" size={22} color="#00D4FF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        
        {/* IMAGEN DE PRODUCTO - AHORA SE VE MUCHO MÁS */}
       <View style={styles.imageContainer}>
  {image && typeof image === 'string' ? (
    <Image source={{ uri: image }} style={styles.productImage} />
  ) : (
    <View style={[styles.productImage, { backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center' }]}>
      <Ionicons name="image-outline" size={40} color="white" />
    </View>
  )}
</View>

        {/* CONTENEDOR DE INFORMACIÓN - MÁS ABAJO Y LIMPIO */}
        <View style={styles.infoWrapper}>
          <BlurView intensity={40} tint="dark" style={styles.infoBlur}>
            
            <View style={styles.dragHandle} />

            <View style={styles.mainHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{name}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>4.9</Text>
                  <Text style={styles.reviewCount}>(128 reviews)</Text>
                </View>
              </View>
              <Text style={styles.price}>{price}</Text>
            </View>

            <Text style={styles.sectionTitle}>Detalles del Producto</Text>
            <Text style={styles.description}>
              Descubre la perfección en cada detalle. Este modelo combina materiales 
              premium con un acabado minimalista que se integra a cualquier espacio 
              con sofisticación natural.
            </Text>

            <View style={styles.optionsContainer}>
              <View>
                <Text style={styles.optionLabel}>Colores</Text>
                <View style={styles.colorRow}>
                  <View style={[styles.colorDot, { backgroundColor: "#111", borderColor: '#00D4FF', borderWidth: 2 }]} />
                  <View style={[styles.colorDot, { backgroundColor: "#006EFF" }]} />
                  <View style={[styles.colorDot, { backgroundColor: "#FFF" }]} />
                </View>
              </View>
              
              <View style={styles.stockInfo}>
                <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.stockText}>En Stock</Text>
              </View>
            </View>
            
            {/* Espacio final para que no tape la barra de compra */}
            <View style={{ height: 180 }} />
          </BlurView>
        </View>
      </ScrollView>

      {/* COMPRA RÁPIDA - BARRA INFERIOR MÁS ESTILIZADA */}
      <View style={styles.bottomNav}>
        <BlurView intensity={80} tint="dark" style={styles.bottomBlur}>
          <TouchableOpacity activeOpacity={0.9} style={styles.buyBtn}>
            <Text style={styles.buyBtnText}>Add to cart</Text>
            <View style={styles.buyIcon}>
              <Ionicons name="cart" size={20} color="#006EFF" />
            </View>
          </TouchableOpacity>
        </BlurView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050608",
  },
  safeAreaHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  circleBtn: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  imageContainer: {
    width: width,
    height: height * 0.65, // Aumentamos la altura de la imagen para que luzca
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  infoWrapper: {
    marginTop: -30, // Solo un pequeño solape para dar profundidad
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
  },
  infoBlur: {
    padding: 25,
    paddingTop: 15,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  productName: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 6,
  },
  ratingText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  reviewCount: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
  },
  price: {
    color: "#00D4FF",
    fontSize: 22,
    fontWeight: "800",
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 10,
  },
  description: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  optionLabel: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  colorRow: {
    flexDirection: "row",
    gap: 12,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  stockText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  bottomBlur: {
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  buyBtn: {
    backgroundColor: "#006EFF",
    height: 58,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  buyBtnText: {
    color: "#FFF",
    fontWeight: "900",
    fontSize: 16,
    textTransform: "uppercase",
  },
  buyIcon: {
    backgroundColor: "#FFF",
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});