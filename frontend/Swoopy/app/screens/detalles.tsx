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
      
      {/* HEADER - BOTONES FLOTANTES */}
      <SafeAreaView style={styles.safeAreaHeader}>
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.circleBtn} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="share-outline" size={22} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="heart-outline" size={22} color="#00D4FF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
        
        {/* IMAGEN DE PRODUCTO */}
        <View style={styles.imageContainer}>
          {image && typeof image === 'string' ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={[styles.productImage, styles.placeholderImage]}>
              <Ionicons name="image-outline" size={60} color="rgba(255,255,255,0.2)" />
            </View>
          )}
        </View>

        {/* CONTENEDOR DE INFORMACIÓN */}
        <View style={styles.infoWrapper}>
          <BlurView intensity={60} tint="dark" style={styles.infoBlur}>
            
            <View style={styles.dragHandle} />

            <View style={styles.mainHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{name || "Producto Premium"}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color="#00D4FF" />
                  <Text style={styles.locationText}>Ciudad de México, MX</Text>
                </View>
              </View>
              <Text style={styles.price}>{price || "$0.00"}</Text>
            </View>

            {/* SECCIÓN DEL VENDEDOR - LE DA VIDA AL MARKETPLACE */}
            <View style={styles.sellerCard}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/100' }} 
                style={styles.sellerAvatar} 
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.sellerName}>Carlos Mendoza</Text>
                <Text style={styles.sellerStatus}>Vendedor Verificado • 4.8★</Text>
              </View>
              <TouchableOpacity style={styles.msgSmallBtn}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color="#00D4FF" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>
              Disponible para entrega inmediata. El producto se encuentra en excelentes 
              condiciones, incluye empaque original y garantía de 3 meses directamente conmigo. 
              No acepto cambios, solo venta directa.
            </Text>

            <View style={styles.tagsRow}>
              <View style={styles.tag}><Text style={styles.tagText}>Nuevo</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Garantía</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>Envío Gratis</Text></View>
            </View>
            
            {/* Espacio final para que no tape la barra de compra */}
            <View style={{ height: 140 }} />
          </BlurView>
        </View>
      </ScrollView>

      {/* COMPRA RÁPIDA Y CHAT - BARRA INFERIOR */}
      <View style={styles.bottomNav}>
        <BlurView intensity={90} tint="dark" style={styles.bottomBlur}>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.messageBtn}>
              <Ionicons name="chatbubble-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            
            <TouchableOpacity activeOpacity={0.8} style={styles.buyBtn}>
              <Text style={styles.buyBtnText}>Lo quiero ahora</Text>
              <Ionicons name="flash" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  imageContainer: {
    width: width,
    height: height * 0.6,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderImage: {
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWrapper: {
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  infoBlur: {
    padding: 25,
    paddingTop: 12,
  },
  dragHandle: {
    width: 35,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 25,
  },
  mainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  productName: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 4,
  },
  locationText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 13,
  },
  price: {
    color: "#00D4FF",
    fontSize: 24,
    fontWeight: "900",
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  sellerAvatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
  },
  sellerName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sellerStatus: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    marginTop: 2,
  },
  msgSmallBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: width,
  },
  bottomBlur: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 15,
  },
  messageBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "#006EFF",
    height: 60,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#006EFF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  buyBtnText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
  },
});