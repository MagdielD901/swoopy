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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const { width, height } = Dimensions.get("window");

/* ---------- WAVES ---------- */
const WaveBackground = () => (
  <View style={styles.waveContainer}>
    <View style={[styles.wave, { top: height * 0.15, left: -width * 0.6 }]} />
    <View
      style={[
        styles.wave,
        { top: height * 0.55, right: -width * 0.6, borderColor: "#006EFF" },
      ]}
    />
  </View>
);

export default function PerfilScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <WaveBackground />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Profile</Text>

            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/44.jpg",
              }}
              style={styles.avatar}
            />

            <Text style={styles.name}>Khadija Dubois</Text>
            <Text style={styles.phone}>+12-6541-1234</Text>

            {/* STATS */}
            <View style={styles.stats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12,145</Text>
                <Text style={styles.statLabel}>Message</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>94</Text>
                <Text style={styles.statLabel}>Group</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statNumber}>48</Text>
                <Text style={styles.statLabel}>Spaces</Text>
              </View>
            </View>
          </View>

          {/* MEDIA */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Media and photos</Text>
              <Ionicons name="chevron-forward" size={18} color="#777" />
            </View>

            <View style={styles.mediaRow}>
              <Image source={{ uri: "https://picsum.photos/200?1" }} style={styles.media} />
              <Image source={{ uri: "https://picsum.photos/200?2" }} style={styles.media} />
              <Image source={{ uri: "https://picsum.photos/200?3" }} style={styles.media} />
              <View style={styles.moreMedia}>
                <Text style={styles.moreMediaText}>+42</Text>
              </View>
            </View>
          </View>

          {/* OPTIONS CARD */}
          <View style={styles.optionsCard}>
            {[
              { icon: "notifications-outline", label: "Notification" },
              { icon: "image-outline", label: "Media visibility" },
              { icon: "bookmark-outline", label: "Bookmarked" },
              { icon: "lock-closed-outline", label: "Lock Chat", toggle: true },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.optionRow}>
                <View style={styles.optionLeft}>
                  <Ionicons name={item.icon as any} size={20} color="#aaa" />
                  <Text style={styles.optionText}>{item.label}</Text>
                </View>

                {item.toggle ? (
                  <View style={styles.toggle} />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#555" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05080D",
  },
  safeArea: {
    flex: 1,
    zIndex: 1,
  },

  /* WAVES */
  waveContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  wave: {
    position: "absolute",
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },

  /* PROFILE */
  profileCard: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 25,
    borderRadius: 28,
    backgroundColor: "#0D1117",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 35,
    marginBottom: 14,
  },
  name: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  phone: {
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
    fontSize: 14,
  },

  stats: {
    flexDirection: "row",
    marginTop: 25,
    gap: 30,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 17,
  },
  statLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    marginTop: 3,
  },

  /* SECTION */
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  mediaRow: {
    flexDirection: "row",
    gap: 10,
  },
  media: {
    width: 75,
    height: 75,
    borderRadius: 16,
  },
  moreMedia: {
    width: 75,
    height: 75,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreMediaText: {
    color: "#fff",
    fontWeight: "700",
  },

  /* OPTIONS */
  optionsCard: {
    marginTop: 35,
    marginHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#0D1117",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  toggle: {
    width: 38,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
});