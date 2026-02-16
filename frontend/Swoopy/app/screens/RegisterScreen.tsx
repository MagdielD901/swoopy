import React, { useState } from 'react'; 
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function RegisterScreen() {
  const router = useRouter();
  
  // Estados para el formulario
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inner}>
            {/* Botón Volver */}
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={28} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Crea tu cuenta</Text>
              <Text style={styles.subtitle}>Únete a nosotros y comienza tu experiencia</Text>
            </View>

            <View style={styles.form}>
              {/* Input Nombre de Usuario */}
              <View style={styles.inputWrapper}>
                <Ionicons name="person-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Nombre de usuario" 
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(val) => setFormData({...formData, username: val})}
                />
              </View>

              {/* Input Correo */}
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Correo electrónico" 
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={(val) => setFormData({...formData, email: val})}
                />
              </View>

              {/* Input Celular */}
              <View style={styles.inputWrapper}>
                <Ionicons name="call-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Número de celular" 
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={styles.input}
                  keyboardType="phone-pad"
                  onChangeText={(val) => setFormData({...formData, phone: val})}
                />
              </View>

              {/* Input Contraseña */}
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                <TextInput 
                  placeholder="Contraseña" 
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  onChangeText={(val) => setFormData({...formData, password: val})}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Ionicons 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={22} 
                    color="rgba(255,255,255,0.6)" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.registerButton}
                onPress={() => console.log('Registro:', formData)}
              >
                <Text style={styles.registerButtonText}>Registrarse</Text>
              </TouchableOpacity>

              <View style={styles.signInContainer}>
                <Text style={styles.hasAccountText}>¿Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => router.push("/screens/LoginScreen")}>
  <Text style={styles.signInText}>Inicia Sesión</Text>
</TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingBottom: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  header: {
    marginTop: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 10,
    lineHeight: 22,
  },
  form: {
    marginTop: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 65,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 5,
  },
  footer: {
    marginTop: 20,
    gap: 20,
  },
  registerButton: {
    backgroundColor: '#FFF',
    height: 65,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hasAccountText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
  },
  signInText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});