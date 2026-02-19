import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

const MODES = {
  SYNC: { color: '#00D4FF', bg: 'rgba(0, 212, 255, 0.1)', label: 'SYNC' },
  BOOST: { color: '#7CFF00', bg: 'rgba(124, 255, 0, 0.1)', label: 'BOOST' },
  OVERLOAD: { color: '#FF0033', bg: 'rgba(255, 0, 51, 0.1)', label: 'OVERLOAD' },
};

const WaveBackground = () => (
  <View style={styles.waveContainer}>
    <View style={[styles.wave, { top: height * 0.15, left: -width * 0.6 }]} />
    <View
      style={[
        styles.wave,
        { top: height * 0.55, right: -width * 0.6, borderColor: "#00D4FF" },
      ]}
    />
  </View>
);

export default function PerfilScreen() {
  const navigation = useNavigation();
  const mode = "SYNC";
  const activeColor = MODES[mode].color;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <WaveBackground />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          
          {/* HEADER BAR */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>User Profile</Text>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="settings-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* MAIN PROFILE CARD */}
          <View style={styles.cardContainer}>
            <BlurView intensity={25} tint="dark" style={styles.profileBlurCard}>
              <View style={[styles.avatarBorder, { borderColor: activeColor }]}>
                <Image
                  source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
                  style={styles.avatar}
                />
              </View>

              <Text style={styles.name}>Mariana García</Text>
              <View style={styles.badge}>
                <Text style={[styles.phone, { color: activeColor }]}>Verified Member</Text>
              </View>

              {/* QUICK ACTIONS */}
              <View style={styles.actionRow}>
                {[
                  { icon: 'chatbubble-ellipses', color: activeColor },
                  { icon: 'call', color: '#fff' },
                  { icon: 'videocam', color: '#fff' },
                ].map((action, i) => (
                  <TouchableOpacity key={i} style={[styles.actionBtn, i === 0 && { backgroundColor: activeColor }]}>
                    <Ionicons name={action.icon as any} size={20} color={i === 0 ? "#000" : "#fff"} />
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.divider} />

              {/* STATS */}
              <View style={styles.stats}>
                {[
                  { val: '12K', label: 'Chats' },
                  { val: '94', label: 'Orbix' },
                  { val: '48', label: 'Items' }
                ].map((stat, i) => (
                  <View key={i} style={styles.statItem}>
                    <Text style={styles.statNumber}>{stat.val}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            </BlurView>
          </View>

          {/* MEDIA SECTION */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Shared Media</Text>
              <TouchableOpacity>
                <Text style={{ color: activeColor, fontSize: 12 }}>View all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mediaRow}>
              {[1, 2, 3, 4].map((id) => (
                <Image 
                  key={id}
                  source={{ uri: `https://picsum.photos/200?${id}` }} 
                  style={styles.media} 
                />
              ))}
              <TouchableOpacity style={styles.moreMedia}>
                <BlurView intensity={30} tint="light" style={styles.fullBlur}>
                  <Text style={styles.moreMediaText}>+42</Text>
                </BlurView>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* SETTINGS OPTIONS */}
          <View style={styles.cardContainer}>
            <BlurView intensity={25} tint="dark" style={styles.optionsBlurCard}>
              {[
                { icon: "notifications-outline", label: "Notifications", color: '#FFB800' },
                { icon: "shield-checkmark-outline", label: "Privacy & Security", color: '#00FF94' },
                { icon: "color-palette-outline", label: "Appearance", color: '#FF00D6' },
                { icon: "trash-outline", label: "Clear Cache", color: '#FF4B4B' },
              ].map((item, index) => (
                <TouchableOpacity key={index} style={[styles.optionRow, index === 3 && { borderBottomWidth: 0 }]}>
                  <View style={styles.optionLeft}>
                    <View style={[styles.iconBox, { backgroundColor: item.color + '20' }]}>
                      <Ionicons name={item.icon as any} size={18} color={item.color} />
                    </View>
                    <Text style={styles.optionText}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.2)" />
                </TouchableOpacity>
              ))}
            </BlurView>
          </View>

          {/* COMMUNITY FOOTER */}
          <View style={styles.groupsSection}>
            <BlurView intensity={15} tint="dark" style={styles.groupCard}>
              <View style={[styles.dotIndicator, { backgroundColor: activeColor }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.groupName}>CENTRAL DE DATOS</Text>
                <Text style={styles.groupStats}>Energy transfer active • 12 mutuals</Text>
              </View>
              <Ionicons name="flash" size={16} color={activeColor} />
            </BlurView>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05080D" },
  safeArea: { flex: 1 },
  fullBlur: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  
  /* WAVES */
  waveContainer: { ...StyleSheet.absoluteFillObject, overflow: "hidden" },
  wave: {
    position: "absolute",
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.08)",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "700", opacity: 0.8, letterSpacing: 1 },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.03)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  /* CARDS */
  cardContainer: { marginHorizontal: 20, marginTop: 15, borderRadius: 32, overflow: 'hidden' },
  profileBlurCard: { padding: 25, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  optionsBlurCard: { paddingVertical: 10, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },

  /* AVATAR */
  avatarBorder: {
    padding: 4,
    borderRadius: 40,
    borderWidth: 2,
    marginBottom: 15,
    shadowColor: "#00D4FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  avatar: { width: 100, height: 100, borderRadius: 34 },
  name: { color: "#fff", fontSize: 24, fontWeight: "900", letterSpacing: -0.5 },
  badge: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 6 },
  phone: { fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: 'uppercase' },

  /* ACTIONS */
  actionRow: { flexDirection: 'row', gap: 15, marginTop: 20 },
  actionBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },

  divider: { width: '100%', height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 25 },

  stats: { flexDirection: "row", width: '100%', justifyContent: 'space-around' },
  statItem: { alignItems: "center" },
  statNumber: { color: "#fff", fontWeight: "900", fontSize: 18 },
  statLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 2, textTransform: 'uppercase' },

  /* MEDIA */
  section: { marginTop: 30, paddingLeft: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15, paddingRight: 20 },
  sectionTitle: { color: "#fff", fontSize: 17, fontWeight: "800" },
  mediaRow: { flexDirection: "row" },
  media: { width: 90, height: 90, borderRadius: 24, marginRight: 12 },
  moreMedia: { width: 90, height: 90, borderRadius: 24, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' },
  moreMediaText: { color: "#fff", fontWeight: "800", fontSize: 16 },

  /* OPTIONS */
  optionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.05)" },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 15 },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  optionText: { color: "#fff", fontSize: 15, fontWeight: "600", opacity: 0.9 },

  /* FOOTER */
  groupsSection: { paddingHorizontal: 20, marginTop: 25 },
  groupCard: { flexDirection: "row", alignItems: "center", padding: 18, borderRadius: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", overflow: 'hidden' },
  dotIndicator: { width: 6, height: 6, borderRadius: 3, marginRight: 15 },
  groupName: { color: "#fff", fontSize: 13, fontWeight: "800", letterSpacing: 0.5 },
  groupStats: { color: "rgba(255,255,255,0.3)", fontSize: 10, marginTop: 2 },
});