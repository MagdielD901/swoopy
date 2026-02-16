import React, { useState, useRef, useEffect, useMemo } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Image 
} from "react-native";
import { useRouter } from "expo-router"; // 1. IMPORTAMOS EL ROUTER

const { width, height } = Dimensions.get("window");

// ... (Componente Particle se queda igual, no necesita cambios)
const Particle = ({ index }) => {
  const moveAnim = useRef(new Animated.Value(0)).current;
  const randomX = useMemo(() => Math.random() * width, []);
  const randomSize = useMemo(() => Math.random() * 4 + 1, []);
  const randomDuration = useMemo(() => Math.random() * 3000 + 4000, []);

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(moveAnim, {
        toValue: 1,
        duration: randomDuration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          moveAnim.setValue(0);
          startAnimation(); 
        }
      });
    };
    const timeout = setTimeout(() => {
      startAnimation();
    }, index * 200);
    return () => clearTimeout(timeout);
  }, [index]);

  const opacity = moveAnim.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 1, 0.8, 0],
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
          transform: [{ translateY }] 
        }
      ]} 
    />
  );
};

export default function PrincipalLogin() {
  const router = useRouter(); // 2. INICIALIZAMOS EL ROUTER
  const [showOptions, setShowOptions] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const particlesArray = useMemo(() => Array.from({ length: 40 }), []);

  const handleStart = () => {
    setShowOptions(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {particlesArray.map((_, i) => (
          <Particle key={`particle-${i}`} index={i} />
        ))}
      </View>

      <View style={styles.topContent}>
        <View style={styles.logoPlaceholder}>
          <Image 
            source={require("../../assets/images/swoopy.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Explora en{"\n"}Swoopy</Text>
        <Text style={styles.subtitle}>
          Crea tu cuenta ahora para explorar funciones, herramientas y disfrutar de experiencias increíbles.
        </Text>
      </View>

      <View style={styles.bottomContent}>
        {!showOptions ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleStart} style={styles.glassButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <Animated.View style={{ opacity: fadeAnim, width: '100%' }}>
            
            {/* 3. CONECTAMOS EL BOTÓN DE INICIAR SESIÓN */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={[styles.glassButton, styles.primaryButton]}
              onPress={() => router.push("/screens/LoginScreen")} // LA RUTA QUE PUSIMOS EN EL LAYOUT
            >
                <Text style={[styles.buttonText, {color: '#000', fontWeight: '800'}]}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.glassButton}>
              <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

// ... (Los estilos se quedan exactamente igual)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  particle: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  topContent: { flex: 2, justifyContent: "center", alignItems: "center", paddingHorizontal: 30, zIndex: 10 },
  logoPlaceholder: {
    width: 100, height: 100, borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 30, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  logoImage: { width: '75%', height: '75%' },
  title: { fontSize: 40, fontWeight: "900", color: "#FFF", textAlign: "center", lineHeight: 46 },
  subtitle: { fontSize: 16, color: "rgba(255, 255, 255, 0.5)", textAlign: "center", marginTop: 15 },
  bottomContent: { flex: 1, paddingHorizontal: 30, justifyContent: "flex-end", paddingBottom: 60, zIndex: 20 },
  glassButton: {
    height: 62, borderRadius: 22, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', marginBottom: 16,
  },
  primaryButton: { backgroundColor: '#FFF' },
  buttonText: { color: "#FFF", fontSize: 17, fontWeight: "600" },
});