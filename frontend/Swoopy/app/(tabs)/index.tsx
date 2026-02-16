import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router"; // Importación necesaria para Expo

const WORD = "SWOOPY";
const { width, height } = Dimensions.get("window");
const PARTICLES_PER_LETTER = 8; 

export default function SwoopyPreloader() {
  const router = useRouter(); // Hook para navegar sin errores

  const letters = WORD.split("");
  const anims = useRef(letters.map(() => new Animated.Value(0))).current;
  const scatterAnim = useRef(new Animated.Value(0)).current;
  const finalLogoAnim = useRef(new Animated.Value(0)).current;
  const bgTransition = useRef(new Animated.Value(0)).current;
  
  const fadeExit = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    Animated.sequence([
      // 1. Aparecen letras
      Animated.stagger(80, letters.map((_, i) => (
        Animated.spring(anims[i], {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        })
      ))),
      Animated.delay(1000),
      // 2. Explotan partículas y cambia fondo
      Animated.parallel([
        Animated.timing(scatterAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(bgTransition, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ]),
      // 3. Aparece logo final
      Animated.spring(finalLogoAnim, {
        toValue: 1,
        tension: 20,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      // 4. Se desvanece todo antes de salir
      Animated.timing(fadeExit, {
        toValue: 0,
        duration: 800, 
        useNativeDriver: true,
      }),
    ]).start(() => {
      // NAVEGACIÓN A LA PANTALLA DE PARTÍCULAS
      router.replace("/screens/principal_login"); 
    });
  }, []); 

  return (
    <View style={styles.mainContainer}>
        <Animated.View style={[styles.container, { opacity: fadeExit }]}>
          <Animated.View 
            style={[
              StyleSheet.absoluteFill, 
              { backgroundColor: '#FFFFFF', opacity: bgTransition }
            ]} 
          />
          
          <View style={styles.wordContainer}>
            {letters.map((letter, i) => {
              const translateY = anims[i].interpolate({
                inputRange: [0, 1],
                outputRange: [i % 2 === 0 ? -120 : 120, 0],
              });

              return (
                <View key={i} style={styles.letterWrapper}>
                  <Animated.Text
                    style={[
                      styles.letterText,
                      {
                        opacity: scatterAnim.interpolate({
                          inputRange: [0, 0.1],
                          outputRange: [1, 0],
                        }),
                        transform: [{ translateY }, { scale: anims[i] }],
                      },
                    ]}
                  >
                    {letter}
                  </Animated.Text>

                  {[...Array(PARTICLES_PER_LETTER)].map((_, pIndex) => {
                    const angle = (Math.PI * 2 * pIndex) / PARTICLES_PER_LETTER;
                    const dist = Math.random() * 200 + 100;

                    return (
                      <Animated.View
                        key={pIndex}
                        style={[
                          styles.particle,
                          {
                            backgroundColor: bgTransition.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['#FFFFFF', '#000000']
                            }),
                            opacity: scatterAnim.interpolate({
                              inputRange: [0, 0.1, 0.8, 1],
                              outputRange: [0, 1, 1, 0],
                            }),
                            transform: [
                              { translateX: scatterAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, Math.cos(angle) * dist]
                              }) },
                              { translateY: scatterAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, Math.sin(angle) * dist]
                              }) },
                              { scale: Math.random() + 0.5 }
                            ],
                          }
                        ]}
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>

          <Animated.View
            style={[
              styles.finalLogoWrapper,
              { 
                opacity: finalLogoAnim, 
                transform: [
                    { scale: finalLogoAnim },
                    { translateY: finalLogoAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -20] 
                    })}
                ] 
              }
            ]}
          >
            <Image 
              source={require("../../assets/images/swoopy.png")} 
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    flex: 1,
    backgroundColor: "#0B0B0B",
    justifyContent: "center",
    alignItems: "center",
  },
  wordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  letterWrapper: {
    marginHorizontal: -2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: 70,
    fontWeight: "900",
    color: "#FFFFFF",
    includeFontPadding: false,
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  finalLogoWrapper: {
    position: 'absolute',
  },
  logo: {
    width: 110,
    height: 110,
  },
});