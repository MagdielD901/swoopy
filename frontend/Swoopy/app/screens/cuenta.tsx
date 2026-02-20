import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  SafeAreaView, StatusBar, Switch, TouchableOpacity, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const MODES = {
  SYNC: { color: '#00D4FF', label: 'SYNC' },
  BOOST: { color: '#7CFF00', label: 'BOOST' },
  OVERLOAD: { color: '#FF0033', label: 'OVERLOAD' },
};

export default function AccountScreen() {
  const [mode] = useState('SYNC');
  const activeColor = MODES[mode].color;

  // Estados de Configuración
  const [isTwoFactor, setIsTwoFactor] = useState(true);
  const [isPublic, setIsPublic] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        
        {/* --- HEADER DINÁMICO --- */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NÚCLEO <Text style={{color: activeColor}}>ID</Text></Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
          
          {/* --- INFO DE USUARIO (HERO) --- */}
          <View style={styles.profileHero}>
            <View style={[styles.avatarContainer, { borderColor: activeColor }]}>
              <View style={styles.innerAvatar}>
                <Ionicons name="person" size={50} color={activeColor} />
              </View>
              <View style={[styles.statusIndicator, { backgroundColor: activeColor }]} />
            </View>
            <Text style={styles.userName}>Alex_Cipher</Text>
            <Text style={styles.userTag}>@alex.orbital.io</Text>
            
            {/* Métricas Rápidas */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1.2k</Text>
                <Text style={styles.statLabel}>ORBIX</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: activeColor + '40' }]} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>Lv. 24</Text>
                <Text style={styles.statLabel}>RANGO</Text>
              </View>
            </View>
          </View>

          {/* --- GESTIÓN DE CUENTA --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: activeColor }]}>DATOS PERSONALES</Text>
            <View style={styles.settingsWrapper}>
              <TouchableOpacity style={styles.settingRow}>
                <Ionicons name="mail-outline" size={18} color="#aaa" />
                <View style={styles.rowTextContent}>
                  <Text style={styles.settingText}>Email</Text>
                  <Text style={styles.settingSub}>alex***@mail.com</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#444" />
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.settingRow, { borderBottomWidth: 0 }]}>
                <Ionicons name="key-outline" size={18} color="#aaa" />
                <View style={styles.rowTextContent}>
                  <Text style={styles.settingText}>Contraseña</Text>
                  <Text style={styles.settingSub}>Actualizada hace 2 meses</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#444" />
              </TouchableOpacity>
            </View>
          </View>

          {/* --- PRIVACIDAD Y SEGURIDAD --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: activeColor }]}>SEGURIDAD DE ACCESO</Text>
            <View style={styles.settingsWrapper}>
              <View style={styles.settingRow}>
                <Ionicons name="shield-checkmark-outline" size={18} color={activeColor} />
                <View style={styles.rowTextContent}>
                  <Text style={styles.settingText}>Doble Factor (2FA)</Text>
                  <Text style={styles.settingSub}>Protección via SMS/App</Text>
                </View>
                <Switch
                  value={isTwoFactor}
                  onValueChange={setIsTwoFactor}
                  trackColor={{ true: activeColor, false: '#333' }}
                  thumbColor="#fff"
                />
              </View>
              
              <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
                <Ionicons name="eye-outline" size={18} color="#aaa" />
                <View style={styles.rowTextContent}>
                  <Text style={styles.settingText}>Perfil Público</Text>
                  <Text style={styles.settingSub}>Visible para otros usuarios</Text>
                </View>
                <Switch
                  value={isPublic}
                  onValueChange={setIsPublic}
                  trackColor={{ true: activeColor, false: '#333' }}
                  thumbColor="#fff"
                />
              </View>
            </View>
          </View>

          {/* --- SESIONES ACTIVAS --- */}
          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: activeColor }]}>DISPOSITIVOS</Text>
            <BlurView intensity={20} tint="dark" style={styles.deviceCard}>
              <Ionicons name="desktop-outline" size={24} color="#fff" style={{marginRight: 15}} />
              <View style={{flex: 1}}>
                <Text style={styles.deviceTitle}>Windows PC - CDMX</Text>
                <Text style={styles.deviceStatus}>Activo ahora</Text>
              </View>
              <TouchableOpacity>
                <Text style={{color: activeColor, fontSize: 10, fontWeight: '900'}}>CERRAR</Text>
              </TouchableOpacity>
            </BlurView>
          </View>

          {/* --- ACCIONES FINALES --- */}
          <View style={[styles.groupsSection, {marginBottom: 40}]}>
            <TouchableOpacity style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={20} color="#FF0033" />
              <Text style={styles.logoutText}>CERRAR SESIÓN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteBtn}>
              <Text style={styles.deleteText}>Eliminar cuenta de forma permanente</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 2 },
  
  // Perfil Hero
  profileHero: { alignItems: 'center', marginTop: 20, marginBottom: 10 },
  avatarContainer: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 2,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15
  },
  innerAvatar: {
    width: 85, height: 85, borderRadius: 42, 
    backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center'
  },
  statusIndicator: {
    width: 18, height: 18, borderRadius: 9, position: 'absolute',
    bottom: 5, right: 5, borderWidth: 3, borderColor: '#000'
  },
  userName: { color: '#fff', fontSize: 24, fontWeight: '900' },
  userTag: { color: 'rgba(255,255,255,0.4)', fontSize: 14, marginTop: 4 },
  
  // Stats
  statsRow: { flexDirection: 'row', marginTop: 20, alignItems: 'center' },
  statItem: { alignItems: 'center', paddingHorizontal: 25 },
  statValue: { color: '#fff', fontSize: 18, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 10, letterSpacing: 1, marginTop: 2 },
  statDivider: { width: 1, height: 30 },

  // Secciones
  groupsSection: { paddingHorizontal: 25, marginTop: 30 },
  sectionLabel: { fontSize: 10, marginBottom: 15, fontWeight: '900', letterSpacing: 2 },
  settingsWrapper: {
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20,
    paddingHorizontal: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
  },
  settingRow: { 
    flexDirection: 'row', alignItems: 'center', paddingVertical: 15, 
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' 
  },
  rowTextContent: { flex: 1, marginLeft: 15 },
  settingText: { color: '#eee', fontSize: 14, fontWeight: '600' },
  settingSub: { color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 2 },

  // Dispositivos
  deviceCard: {
    flexDirection: 'row', alignItems: 'center', padding: 15,
    borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden'
  },
  deviceTitle: { color: '#fff', fontSize: 14, fontWeight: '700' },
  deviceStatus: { color: '#7CFF00', fontSize: 11, marginTop: 2 },

  // Botones Finales
  logoutBtn: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 18, borderRadius: 20, backgroundColor: 'rgba(255,0,51,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,0,51,0.2)'
  },
  logoutText: { color: '#FF0033', fontWeight: '900', fontSize: 13, marginLeft: 10, letterSpacing: 1 },
  deleteBtn: { marginTop: 20, alignItems: 'center' },
  deleteText: { color: 'rgba(255,255,255,0.2)', fontSize: 12, textDecorationLine: 'underline' }
});