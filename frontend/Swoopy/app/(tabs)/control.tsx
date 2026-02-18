import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  SafeAreaView, StatusBar, Switch, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const MODES = {
  SYNC: { color: '#00D4FF', label: 'SYNC' },
  BOOST: { color: '#7CFF00', label: 'BOOST' },
  OVERLOAD: { color: '#FF0033', label: 'OVERLOAD' },
};

export default function ControlScreen() {
  const [mode] = useState<'SYNC' | 'BOOST' | 'OVERLOAD'>('SYNC');
  const [energy] = useState(0);

  // States para los controles
  const [notifications, setNotifications] = useState(true);
  const [autoSync, setAutoSync] = useState(false);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Control <Text style={[styles.coreText, { color: MODES[mode].color }]}>Center</Text>
          </Text>
          <View style={[styles.energyBadge, { borderColor: MODES[mode].color + '50', borderWidth: 1 }]}>
            <Text style={{ color: MODES[mode].color, fontWeight: 'bold', fontSize: 12 }}>{energy} NRG</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* --- SECCIÓN CUENTA --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>PERFIL</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <BlurView intensity={20} tint="light" style={styles.accountCard}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={24} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.accountName}>Mi Cuenta</Text>
                  <Text style={styles.accountSub}>Inicia sesión para sincronizar</Text>
                </View>
                <View style={[styles.loginButton, { backgroundColor: MODES[mode].color }]}>
                  <Text style={styles.loginButtonText}>ENTRAR</Text>
                </View>
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* --- BOTÓN SUSCRIPCIONES --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>MEMBRESÍA</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.subButtonContainer}>
              <View style={styles.gradientCanvas}>
                <View style={[styles.blob, { backgroundColor: MODES[mode].color, top: -20, left: -20 }]} />
                <View style={[styles.blob, { backgroundColor: '#7000FF', bottom: -40, right: -20, width: 150 }]} />
              </View>
              <BlurView intensity={80} tint="dark" style={[styles.subscriptionButton]}>
                <View style={[styles.subscriptionDot, { backgroundColor: MODES[mode].color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.groupName, { color: '#fff' }]}>Gestionar Suscripciones</Text>
                  <Text style={styles.groupStats}>Gratuito, Pro y Premium disponibles</Text>
                </View>
                <View style={styles.chevronBg}>
                  <Ionicons name="chevron-forward" size={16} color="#fff" />
                </View>
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* --- SECCIÓN PERSONALIZAR --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>APARIENCIA</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <BlurView intensity={30} tint="dark" style={styles.customCard}>
                <View style={[styles.customIconBg, { backgroundColor: MODES[mode].color + '20' }]}>
                  <Ionicons name="color-palette" size={22} color={MODES[mode].color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.accountName}>Personalizar App</Text>
                  <Text style={styles.accountSub}>Temas, iconos y acentos neón</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#555" />
              </BlurView>
            </TouchableOpacity>
          </View>

          {/* --- SECCIÓN SEGURIDAD --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>SEGURIDAD</Text>
            <View style={styles.settingsWrapper}>
              <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
                <Ionicons name="finger-print" size={18} color={MODES[mode].color} />
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.settingText}>Bloqueo Biométrico</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>FaceID / Huella dactilar</Text>
                </View>
                <Switch
                  value={biometricsEnabled}
                  onValueChange={setBiometricsEnabled}
                  trackColor={{ true: MODES[mode].color, false: '#333' }}
                  thumbColor="#fff"
                  style={{ marginLeft: 'auto' }}
                />
              </View>
            </View>
          </View>

          {/* --- PANEL DE CONFIGURACIÓN SISTEMA --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>SISTEMA</Text>
            <View style={styles.settingsWrapper}>
              <View style={styles.settingRow}>
                <Ionicons name="notifications-outline" size={18} color="#aaa" />
                <Text style={styles.settingText}>Notificaciones</Text>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ true: MODES[mode].color, false: '#333' }}
                  thumbColor="#fff"
                  style={{ marginLeft: 'auto' }}
                />
              </View>
              <View style={styles.settingRow}>
                <Ionicons name="sync-outline" size={18} color="#aaa" />
                <Text style={styles.settingText}>Auto Sync</Text>
                <Switch
                  value={autoSync}
                  onValueChange={setAutoSync}
                  trackColor={{ true: MODES[mode].color, false: '#333' }}
                  thumbColor="#fff"
                  style={{ marginLeft: 'auto' }}
                />
              </View>
              <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
                <Ionicons name="phone-portrait-outline" size={18} color="#aaa" />
                <Text style={styles.settingText}>Haptic Feedback</Text>
                <Switch
                  value={hapticsEnabled}
                  onValueChange={setHapticsEnabled}
                  trackColor={{ true: MODES[mode].color, false: '#333' }}
                  thumbColor="#fff"
                  style={{ marginLeft: 'auto' }}
                />
              </View>
            </View>
          </View>

          {/* --- SECCIÓN FINAL: RECARGAR ORBIX (ORBIX STORE) --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>ORBIX STORE</Text>
            <TouchableOpacity activeOpacity={0.9}>
              <BlurView intensity={40} tint="dark" style={[styles.orbixCard, { borderColor: MODES[mode].color + '30' }]}>
                <View style={[styles.orbixIconBg, { backgroundColor: MODES[mode].color + '20' }]}>
                  <Ionicons name="diamond" size={24} color={MODES[mode].color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.orbixTitle}>Recargar Orbix</Text>
                  <Text style={styles.orbixSub}>Obtén diamantes para funciones especiales</Text>
                </View>
                <View style={styles.orbixBadge}>
                  <Text style={[styles.orbixBadgeText, { color: MODES[mode].color }]}>HOT</Text>
                </View>
              </BlurView>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  coreText: { fontSize: 14, fontWeight: '400' },
  energyBadge: { backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 20 },

  groupsSection: { width: '100%', paddingHorizontal: 25, marginTop: 30 },
  sectionLabel: { fontSize: 11, marginBottom: 15, fontWeight: '900', letterSpacing: 1.5 },

  // ORBIX CARD (Store)
  orbixCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  orbixIconBg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  orbixTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },
  orbixSub: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  orbixBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  orbixBadgeText: { fontSize: 10, fontWeight: '900' },

  // CUENTA
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: 45, height: 45, borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15,
  },
  accountName: { color: '#fff', fontSize: 16, fontWeight: '700' },
  accountSub: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  loginButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  loginButtonText: { color: '#000', fontSize: 11, fontWeight: '900' },

  // PERSONALIZAR
  customCard: {
    flexDirection: 'row', alignItems: 'center', padding: 18, borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', overflow: 'hidden',
  },
  customIconBg: { width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 15 },

  // SUSCRIPCIONES
  subButtonContainer: { borderRadius: 25, overflow: 'hidden', height: 90, justifyContent: 'center' },
  gradientCanvas: { ...StyleSheet.absoluteFillObject, backgroundColor: '#1a1a1a' },
  blob: { position: 'absolute', width: 120, height: 120, borderRadius: 60, opacity: 0.5 },
  subscriptionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, borderWidth: 1, borderRadius: 25 },
  subscriptionDot: { width: 10, height: 10, borderRadius: 5, marginRight: 15 },
  groupName: { fontSize: 17, fontWeight: '800', color: '#fff' },
  groupStats: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  chevronBg: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 5, borderRadius: 10 },

  // CONFIGURACIÓN (Wrapper para filas)
  settingsWrapper: {
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 25,
    paddingHorizontal: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  settingText: { color: '#eee', fontSize: 15, fontWeight: '500' },
});