import React, { useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ACCENT = "#00D4FF";
const PURPLE = "#7000FF";

// --- COMPONENTE PARTÍCULA (MANTENIENDO TU ESENCIA) ---
const Particle = ({ index }: { index: number }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const randomX = useMemo(() => Math.random() * width, []);
  const randomSize = useMemo(() => Math.random() * 3 + 1, []);
  const randomDuration = useMemo(() => Math.random() * 3000 + 5000, []);

  useEffect(() => {
    const startAnimation = () => {
      moveAnim.setValue(0);
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: randomDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) startAnimation();
      });
    };
    const timeout = setTimeout(startAnimation, index * 150);
    return () => clearTimeout(timeout);
  }, [index]);

  const opacity = moveAnim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 0.8, 0.6, 0],
  });

  const translateY = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height + 20, -100],
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: randomX,
          width: randomSize,
          height: randomSize,
          opacity: opacity,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

export default function PerfilGeneralScreen() {
  const navigation = useNavigation();

  // Datos del usuario (En un caso real vendrían por Props)
  const userData = {
    name: "Anne Smith",
    bio: "¡Hola! Estoy usando swoopy :p \nExplorando el metaverso de Orbix.",
    profileImage: "https://i.pravatar.cc/300?img=44",
    totalOrbix: 1247
  };

  const particlesArray = useMemo(() => Array.from({ length: 30 }), []);

  // Cálculos Orbix
  const diamonds = Math.floor(userData.totalOrbix / 100);
  const currentOrbix = userData.totalOrbix % 100;
  const progressPercent = currentOrbix / 100;

  const rank = useMemo(() => {
    if (diamonds >= 30) return "Legendario";
    if (diamonds >= 15) return "Élite Orbix";
    if (diamonds >= 5) return "Ascendente";
    return "Explorador";
  }, [diamonds]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* FONDO DE BOLITAS (TU IDENTIDAD) */}
      <View style={StyleSheet.absoluteFill}>
        {particlesArray.map((_, i) => (
          <Particle key={`p-${i}`} index={i} />
        ))}
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Perfil <Text style={{ color: ACCENT }}>Swoopy</Text></Text>
            <TouchableOpacity style={styles.backBtn}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* PERFIL (VISTA) */}
          <View style={styles.profileSection}>
            <View style={styles.profileWrapper}>
              <View style={[styles.glowCircle, { borderColor: ACCENT }]} />
              <View style={styles.imageContainer}>
                <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
              </View>
            </View>

            <View style={styles.premiumBadgeContainer}>
              <View style={styles.gradientCanvasBadge}>
                <View style={[styles.miniBlob, { backgroundColor: ACCENT, top: -10, left: -10 }]} />
                <View style={[styles.miniBlob, { backgroundColor: PURPLE, bottom: -10, right: -10 }]} />
              </View>
              <BlurView intensity={80} tint="dark" style={styles.badgeBlur}>
                <View style={[styles.statusDot, { backgroundColor: ACCENT }]} />
                <Text style={styles.premiumText}>USUARIO PREMIUM</Text>
              </BlurView>
            </View>

            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>{rank}</Text>
            </View>
          </View>

          {/* INFO CARD (SOLO LECTURA) */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: ACCENT }]}>Identidad</Text>
            <BlurView intensity={20} tint="dark" style={styles.infoCard}>
              <Text style={styles.displayName}>{userData.name}</Text>
              <Text style={styles.displayBio}>{userData.bio}</Text>
            </BlurView>
          </View>

          {/* SISTEMA ORBIX (VISTA PÚBLICA) */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: ACCENT }]}>Estatus Orbix</Text>
            <BlurView intensity={25} tint="dark" style={styles.orbixCard}>
              <View style={styles.orbixRow}>
                <Text style={styles.diamondText}>💎 {diamonds} Diamantes</Text>
                <Text style={styles.orbixText}>⚡ {currentOrbix} Orbix</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={[styles.progressFill, { width: `${progressPercent * 100}%` }]} />
              </View>
              <Text style={styles.progressLabel}>Rango actual: {rank}</Text>
            </BlurView>
          </View>

          {/* ACCIONES DE PERFIL */}
          <View style={[styles.groupsSection, { flexDirection: 'row', gap: 15 }]}>
            <TouchableOpacity activeOpacity={0.8} style={[styles.actionButton, { flex: 2 }]}>
              <View style={styles.gradientCanvasBtn}>
                <View style={[styles.blobBtn, { backgroundColor: ACCENT, top: -20, left: -20 }]} />
                <View style={[styles.blobBtn, { backgroundColor: PURPLE, bottom: -40, right: -20, width: 150 }]} />
              </View>
              <BlurView intensity={60} tint="dark" style={styles.saveButtonBlur}>
                <Text style={styles.saveText}>Seguir</Text>
              </BlurView>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={[styles.actionButton, { flex: 1 }]}>
               <BlurView intensity={20} tint="light" style={styles.messageButtonBlur}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
              </BlurView>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scrollContent: { paddingBottom: 40 },
  
  particle: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },

  header: {
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "900" },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.05)",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  profileSection: { alignItems: "center", marginBottom: 20 },
  profileWrapper: {
    width: 140,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: { width: 130, height: 130, borderRadius: 65, overflow: "hidden" },
  profileImage: { width: "100%", height: "100%" },
  glowCircle: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    shadowColor: ACCENT,
    shadowOpacity: 1,
    shadowRadius: 15,
  },

  premiumBadgeContainer: {
    height: 34,
    borderRadius: 17,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    minWidth: 160,
  },
  gradientCanvasBadge: { ...StyleSheet.absoluteFillObject, backgroundColor: "#1a1a1a" },
  miniBlob: { position: "absolute", width: 40, height: 40, borderRadius: 20, opacity: 0.4 },
  badgeBlur: { flex: 1, flexDirection: "row", alignItems: "center", paddingHorizontal: 15 },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 10 },
  premiumText: { color: "#fff", fontSize: 10, fontWeight: "900", letterSpacing: 1 },

  rankBadge: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(112,0,255,0.15)",
    borderWidth: 1,
    borderColor: PURPLE,
  },
  rankText: { color: "#fff", fontWeight: "800", fontSize: 11 },

  groupsSection: { width: "100%", paddingHorizontal: 25, marginTop: 25 },
  sectionLabel: { fontSize: 11, marginBottom: 12, fontWeight: "900", letterSpacing: 1.5 },

  infoCard: {
    borderRadius: 25,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: 'rgba(255,255,255,0.02)',
    overflow: 'hidden'
  },
  displayName: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 10 },
  displayBio: { color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 20 },

  orbixCard: {
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: 'rgba(255,255,255,0.02)',
    overflow: 'hidden'
  },
  orbixRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  diamondText: { color: "#fff", fontSize: 18, fontWeight: "900" },
  orbixText: { color: ACCENT, fontSize: 16, fontWeight: "700" },
  progressContainer: { height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: ACCENT },
  progressLabel: { marginTop: 10, color: "rgba(255,255,255,0.4)", fontSize: 11 },

  actionButton: { borderRadius: 25, overflow: "hidden", height: 65 },
  gradientCanvasBtn: { ...StyleSheet.absoluteFillObject, backgroundColor: "#111" },
  blobBtn: { position: "absolute", width: 100, height: 100, borderRadius: 50, opacity: 0.6 },
  saveButtonBlur: { flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 25 },
  saveText: { color: "#fff", fontSize: 18, fontWeight: "900" },
  
  messageButtonBlur: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25
  }
});