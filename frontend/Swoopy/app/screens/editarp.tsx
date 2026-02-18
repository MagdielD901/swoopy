import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ACCENT = "#00D4FF"; 
const PURPLE = "#7000FF";

export default function EditarPerfilScreen() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(
    "https://i.pravatar.cc/300?img=44"
  );
  const [name, setName] = useState("Anne Smith");
  const [bio, setBio] = useState("¡Hola! Estoy usando swoopy :p");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    console.log("Guardado:", { name, bio, profileImage });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* BACKGROUND ELEMENTS */}
      <View style={StyleSheet.absoluteFill}>
        <View style={[styles.blob, { backgroundColor: ACCENT, top: -50, left: -30 }]} />
        <View style={[styles.blob, { backgroundColor: PURPLE, bottom: 100, right: -40, width: 200, height: 200 }]} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Editar <Text style={{color: ACCENT}}>Perfil</Text></Text>
            <View style={{ width: 45 }} /> 
          </View>

          {/* FOTO DE PERFIL - AJUSTADA PARA ESTAR PEGADA */}
          <View style={styles.profileSection}>
            <TouchableOpacity style={styles.profileWrapper} onPress={pickImage} activeOpacity={0.9}>
              {/* Círculo de resplandor ahora coincide exactamente con el tamaño del contenedor */}
              <View style={[styles.glowCircle, { borderColor: ACCENT }]} />
              
              <View style={styles.imageContainer}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
               
              </View>
            </TouchableOpacity>
          </View>

          {/* FORMULARIO */}
          <View style={styles.groupsSection}>
             <Text style={[styles.sectionLabel, { color: ACCENT }]}>Información Pública</Text>
             
             <BlurView intensity={15} tint="light" style={styles.formCard}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOMBRE</Text>
                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Tu nombre"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                  />
                </View>

                <View style={[styles.inputGroup, { borderBottomWidth: 0 }]}>
                  <Text style={styles.label}>BIOGRAFÍA</Text>
                  <TextInput
                    style={[styles.input, { height: 80, textAlignVertical: 'top', paddingTop: 10 }]}
                    value={bio}
                    onChangeText={setBio}
                    placeholder="Escribe algo sobre ti..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    multiline
                  />
                </View>
             </BlurView>
          </View>

          {/* BOTÓN GUARDAR */}
          <View style={styles.groupsSection}>
            <TouchableOpacity activeOpacity={0.8} style={styles.saveButtonContainer} onPress={handleSave}>
              <View style={styles.gradientCanvas}>
                <View style={[styles.blobButton, { backgroundColor: ACCENT, top: -20, left: -20 }]} />
                <View style={[styles.blobButton, { backgroundColor: PURPLE, bottom: -40, right: -20, width: 150 }]} />
              </View>
              <BlurView intensity={60} tint="dark" style={styles.saveButtonBlur}>
                <Text style={styles.saveText}>Guardar Cambios</Text>
                <Ionicons name="checkmark-circle" size={20} color="#fff" style={{marginLeft: 10}} />
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
  
  header: { 
    paddingHorizontal: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30 
  },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: -1 },
  backBtn: { 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    padding: 10, 
    borderRadius: 15, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },

  // Perfil - CORREGIDO
  profileSection: { alignItems: 'center', marginBottom: 40 },
  profileWrapper: { 
    width: 130, // Reducido un poco para mayor control
    height: 130, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  imageContainer: { 
    width: 124, // Aumentado ligeramente para que "llene" el borde
    height: 124, 
    borderRadius: 62, 
    overflow: 'hidden', 
    backgroundColor: '#1a1a1a',
    zIndex: 2, // Asegura que la imagen esté arriba
  },
  profileImage: { width: '100%', height: '100%' },
  glowCircle: { 
    position: 'absolute', 
    width: 130, // Mismo tamaño que el wrapper
    height: 130, 
    borderRadius: 65, 
    borderWidth: 3, // Borde más grueso para que resalte
    opacity: 0.8,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    zIndex: 1
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 38,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Formulario
  groupsSection: { width: '100%', paddingHorizontal: 25, marginTop: 20 },
  sectionLabel: { fontSize: 11, marginBottom: 15, fontWeight: '900', letterSpacing: 1.5 },
  formCard: {
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    paddingHorizontal: 20
  },
  inputGroup: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)'
  },
  label: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800', marginBottom: 5 },
  input: { color: '#fff', fontSize: 16, fontWeight: '500' },

  // Botón Guardar
  saveButtonContainer: { borderRadius: 25, overflow: 'hidden', height: 70, justifyContent: 'center', marginTop: 10 },
  gradientCanvas: { ...StyleSheet.absoluteFillObject, backgroundColor: '#111' },
  blobButton: { position: 'absolute', width: 100, height: 100, borderRadius: 50, opacity: 0.6 },
  saveButtonBlur: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    borderWidth: 1, 
   
    borderRadius: 25 
  },
  saveText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  blob: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.15,
  },
});