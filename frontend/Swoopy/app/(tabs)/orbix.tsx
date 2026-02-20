import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, StatusBar, Dimensions, Animated, PanResponder, Modal, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from "expo-router";
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');
const ORB_SIZE = 260;

// Detectamos si es Android para aplicar estilos de respaldo
const isAndroid = Platform.OS === 'android';

type ModeKey = 'SYNC' | 'BOOST' | 'OVERLOAD';

interface ModeConfig {
  color: string;
  bg: string;
  label: string;
}

const MODES: Record<ModeKey, ModeConfig> = {
  SYNC: { color: '#00D4FF', bg: '#02131f', label: 'SYNC' },
  BOOST: { color: '#7CFF00', bg: '#102100', label: 'BOOST' },
  OVERLOAD: { color: '#FF0033', bg: '#220008', label: 'OVERLOAD' },
};

const ExplosionParticle = ({ color }: { color: string }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const angle = useMemo(() => Math.random() * Math.PI * 2, []);
  const distance = useMemo(() => Math.random() * width * 0.8, []);
  const size = useMemo(() => Math.random() * 4 + 2, []);

  useEffect(() => {
    Animated.timing(moveAnim, { toValue: 1, duration: 1200, useNativeDriver: true }).start();
  }, [moveAnim]);

  const translateX = moveAnim.interpolate({ inputRange: [0, 1], outputRange: [0, Math.cos(angle) * distance] });
  const translateY = moveAnim.interpolate({ inputRange: [0, 1], outputRange: [0, Math.sin(angle) * distance] });
  const opacity = moveAnim.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 0.8, 0] });

  return (
    <Animated.View style={[styles.expParticle, { backgroundColor: color, width: size, height: size, borderRadius: size / 2, opacity, transform: [{ translateX }, { translateY }] }]} />
  );
};

export default function Orbix3D() {
  const [mode, setMode] = useState<ModeKey>('SYNC');
  const [energy, setEnergy] = useState(0);
  const [isExploded, setIsExploded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState(10); 

  const rotateX = useRef(new Animated.Value(0)).current;
  const rotateY = useRef(new Animated.Value(0)).current;
  const spin = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const orbOpacity = useRef(new Animated.Value(1)).current;
  
  const explodeS = useRef(new Animated.Value(0)).current;
  const explodeO = useRef(new Animated.Value(0)).current;
  
  const router = useRouter();
  const emotional = energy > 10 ? 'INESTABLE' : energy > 4 ? 'ACTIVA' : 'TRANQUILA';

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: emotional === 'ACTIVA' ? 10000 : 20000, useNativeDriver: true })
    ).start();

    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, { toValue: emotional === 'INESTABLE' ? 1.12 : 1.05, duration: emotional === 'ACTIVA' ? 600 : 1500, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: emotional === 'ACTIVA' ? 600 : 1500, useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(glow, { toValue: 1, duration: emotional === 'INESTABLE' ? 400 : 1500, useNativeDriver: false }),
          Animated.timing(glow, { toValue: 0, duration: emotional === 'INESTABLE' ? 400 : 1500, useNativeDriver: false }),
        ])
      ])
    ).start();
  }, [emotional]);

  const adjustAmount = (val: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTransferAmount(prev => Math.max(1, prev + val));
  };

  const handlePress = useCallback(() => {
    if (isExploded) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    explodeS.setValue(0.8);
    explodeO.setValue(0.7);
    Animated.parallel([
      Animated.timing(explodeS, { toValue: 2.8, duration: 500, useNativeDriver: true }),
      Animated.timing(explodeO, { toValue: 0, duration: 500, useNativeDriver: true })
    ]).start();

    setShowModal(true);

    setEnergy(prev => {
      const newEnergy = prev + 1;
      if (newEnergy >= 100) {
        setIsExploded(true);
        orbOpacity.setValue(0);
        setTimeout(() => {
          setEnergy(0);
          setMode('SYNC');
          setIsExploded(false);
          Animated.timing(orbOpacity, { toValue: 1, duration: 2000, useNativeDriver: true }).start();
        }, 3000);
        return 100;
      }
      if (newEnergy > 15) setMode('OVERLOAD');
      else if (newEnergy > 5) setMode('BOOST');
      else setMode('SYNC');
      return newEnergy;
    });
  }, [mode, isExploded, explodeO, explodeS]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => {
        rotateY.setValue(g.dx / 150);
        rotateX.setValue(g.dy / -150);
      },
      onPanResponderRelease: (_, g) => {
        if (Math.abs(g.dx) < 5 && Math.abs(g.dy) < 5) handlePress();
        Animated.spring(rotateX, { toValue: 0, useNativeDriver: true, friction: 5 }).start();
        Animated.spring(rotateY, { toValue: 0, useNativeDriver: true, friction: 5 }).start();
      },
    })
  ).current;

  const rX = rotateX.interpolate({ inputRange: [-1, 1], outputRange: ['-20deg', '20deg'] });
  const rY = rotateY.interpolate({ inputRange: [-1, 1], outputRange: ['-20deg', '20deg'] });
  const spinDeg = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const shadowSpread = glow.interpolate({ inputRange: [0, 1], outputRange: [20, emotional === 'INESTABLE' ? 80 : 45] });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowModal(false)}
        >
          {/* Aplicamos BlurView con una intensidad específica y color de respaldo para Android */}
          <BlurView 
            intensity={isAndroid ? 0 : 100} // En Android evitamos el motor de blur si falla
            tint="dark" 
            style={[
                styles.modalContent, 
                isAndroid && { backgroundColor: 'rgba(20, 20, 20, 0.98)' } // Fallback sólido para Android
            ]}
          >
            <View style={styles.modalIndicator} />
            
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalStepText}>TRANSFERENCIA ACTIVA</Text>
                <Text style={styles.modalTitle}>CONFIGURAR ENVÍO</Text>
              </View>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close-circle" size={32} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
              <View style={styles.transferRow}>
                <View style={styles.nodeItem}>
                  <View style={[styles.nodeCircle, { backgroundColor: MODES[mode].color + '20', borderColor: MODES[mode].color }]}>
                    <Ionicons name="flash" size={24} color={MODES[mode].color} />
                  </View>
                  <Text style={styles.nodeText}>YO</Text>
                </View>
                
                <Ionicons name="repeat" size={20} color={MODES[mode].color} style={{ opacity: 0.5 }} />
                
                <View style={styles.nodeItem}>
                  <View style={[styles.nodeCircle, { backgroundColor: '#111', borderColor: 'rgba(255,255,255,0.1)' }]}>
                    <Ionicons name="person-add" size={24} color="#fff" />
                  </View>
                  <Text style={styles.nodeText}>USUARIO</Text>
                </View>
              </View>

              <View style={styles.amountSelector}>
                <TouchableOpacity onPress={() => adjustAmount(-10)} style={styles.amountBtn}>
                  <Ionicons name="remove" size={20} color="#fff" />
                </TouchableOpacity>
                
                <View style={styles.amountDisplay}>
                  <Text style={[styles.amountValue, { color: MODES[mode].color }]}>{transferAmount}</Text>
                  <Text style={styles.amountLabel}>ORBIX</Text>
                </View>

                <TouchableOpacity onPress={() => adjustAmount(10)} style={styles.amountBtn}>
                  <Ionicons name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.modalBtn, { backgroundColor: MODES[mode].color }]}
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  setShowModal(false);
                }}
              >
                <Text style={styles.modalBtnText}>CONFIRMAR ENVÍO</Text>
              </TouchableOpacity>
            </ScrollView>
          </BlurView>
        </TouchableOpacity>
      </Modal>

      <SafeAreaView style={{ flex: 1 }}>
      
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Orbix <Text style={[styles.coreText, { color: MODES[mode].color }]}>CORE</Text>
          </Text>
          <View style={[styles.energyBadge, { borderColor: MODES[mode].color + '50', borderWidth: 1 }]}>
            <Text style={{color: MODES[mode].color, fontWeight: 'bold', fontSize: 12}}>{energy} Orbix Points</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 60 }}>
          <View style={styles.orbScene}>
            {isExploded && (
              <View style={StyleSheet.absoluteFill}>
                <View style={styles.explosionCenter}>
                  {Array.from({ length: 40 }).map((_, i) => (
                    <ExplosionParticle key={i} color={MODES.OVERLOAD.color} />
                  ))}
                </View>
              </View>
            )}

            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.orbWrapper,
                { opacity: orbOpacity, transform: [{ rotateX: rX as any }, { rotateY: rY as any }, { scale: pulse }] }
              ]}
            >
              <Animated.View style={[styles.dynamicGlow, { 
                backgroundColor: MODES[mode].color, 
                shadowColor: MODES[mode].color,
                shadowRadius: shadowSpread as any,
                opacity: glow.interpolate({ inputRange:[0,1], outputRange:[0.2, 0.5] }),
                elevation: isAndroid ? 10 : 0 // Mejora visual en Android
              }]} />
              
              <Animated.View style={[styles.explosion, { borderColor: MODES[mode].color, opacity: explodeO, transform: [{ scale: explodeS }] }]} />
              <Animated.View style={[styles.energyRing, { borderColor: MODES[mode].color, transform: [{ rotate: spinDeg }] }]} />
              <Animated.View style={[styles.wave, { borderColor: MODES[mode].color + '50', transform: [{ rotate: spinDeg }] }]} />
              
              <View style={[styles.orbCore, { backgroundColor: MODES[mode].bg, shadowColor: MODES[mode].color, borderColor: MODES[mode].color + '88' }]}>
                <View style={[styles.highlight, { backgroundColor: MODES[mode].color + '30' }]} />
                <Text style={[styles.coreStatus, { color: MODES[mode].color }]}>{MODES[mode].label}</Text>
                <Text style={styles.emotionText}>{emotional}</Text>
              </View>

              {[...Array(8)].map((_, i) => (
                <Animated.View key={i} style={[styles.particle, { 
                    backgroundColor: MODES[mode].color, 
                    transform: [{ rotate: spinDeg }, { translateX: ORB_SIZE / 2 }, { rotate: `${i * 45}deg` }] 
                }]} />
              ))}
            </Animated.View>
            <Text style={styles.hintText}>{isExploded ? "REINICIANDO..." : "Toca el Core para Sincronizar"}</Text>
          </View>

          <View style={styles.groupsSection}>
            <Text style={[styles.sectionLabel, { color: MODES[mode].color }]}>ORBIX COMUNIDADES</Text>
            <TouchableOpacity style={styles.groupCard} onPress={() => router.push("/screens/comunidad")}>
              <View style={[styles.dotIndicator, { backgroundColor: MODES[mode].color }]} />
              <View>
                <Text style={styles.groupName}>CENTRAL DE DATOS</Text>
                <Text style={styles.groupStats}>Transferencia activa...</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.2)" style={{ marginLeft: 'auto' }} />
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
  orbScene: { height: 450, justifyContent: 'center', alignItems: 'center' },
  orbWrapper: { width: ORB_SIZE + 40, height: ORB_SIZE + 40, justifyContent: 'center', alignItems: 'center' },
  dynamicGlow: { position: 'absolute', width: ORB_SIZE - 100, height: ORB_SIZE - 100, borderRadius: 100, shadowOpacity: 1 },
  explosion: { position: 'absolute', width: ORB_SIZE, height: ORB_SIZE, borderRadius: ORB_SIZE / 2, borderWidth: 3 },
  energyRing: { position: 'absolute', width: ORB_SIZE - 20, height: ORB_SIZE - 20, borderRadius: 999, borderWidth: 1, opacity: 0.5 },
  orbCore: { width: ORB_SIZE - 50, height: ORB_SIZE - 50, borderRadius: (ORB_SIZE - 50) / 2, justifyContent: 'center', alignItems: 'center', shadowRadius: 60, shadowOpacity: 1, borderWidth: 2 },
  highlight: { position: 'absolute', top: 20, left: 30, width: 80, height: 80, borderRadius: 40 },
  wave: { position: 'absolute', width: ORB_SIZE + 30, height: ORB_SIZE + 30, borderRadius: ORB_SIZE, borderWidth: 1, borderStyle: 'dashed' },
  particle: { position: 'absolute', width: 6, height: 6, borderRadius: 3 },
  expParticle: { position: 'absolute' },
  explosionCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  coreStatus: { fontWeight: '900', fontSize: 18, letterSpacing: 2 },
  emotionText: { fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 6, letterSpacing: 1 },
  hintText: { color: 'rgba(255,255,255,0.2)', marginTop: 40, fontSize: 10, fontWeight: 'bold' },
  groupsSection: { width: '100%', paddingHorizontal: 25 },
  sectionLabel: { fontSize: 11, marginBottom: 15, fontWeight: '900', letterSpacing: 1 },
  groupCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0a0a0a', padding: 20, borderRadius: 25, borderWidth: 1, borderColor: '#151515' },
  dotIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: 15 },
  groupName: { color: '#fff', fontSize: 14, fontWeight: '700' },
  groupStats: { color: 'rgba(255,255,255,0.3)', fontSize: 10, marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { 
    height: '70%', 
    borderTopLeftRadius: 40, 
    borderTopRightRadius: 40, 
    padding: 25, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },
  modalIndicator: { width: 40, height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, alignSelf: 'center', marginBottom: 15 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 30 },
  modalStepText: { color: '#00D4FF', fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: 4 },
  modalTitle: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  transferRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginBottom: 35 },
  nodeItem: { alignItems: 'center' },
  nodeCircle: { width: 65, height: 65, borderRadius: 22, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  nodeText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold' },
  amountSelector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 15, marginBottom: 35, width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  amountBtn: { width: 45, height: 45, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  amountDisplay: { paddingHorizontal: 40, alignItems: 'center' },
  amountValue: { fontSize: 38, fontWeight: '900' },
  amountLabel: { fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, marginTop: -4 },
  modalBtn: { width: '100%', height: 65, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  modalBtnText: { color: '#000', fontWeight: '900', fontSize: 14, letterSpacing: 1 }
});