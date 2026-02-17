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
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function LoginScreen() {
  const router = useRouter();
  
  // 2. Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        
        <View style={styles.inner}>
          {/* Botón Volver */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={28} color="#FFF" />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Bienvenido de nuevo</Text>
            <Text style={styles.subtitle}>Te extrañamos, ingresa tus credenciales</Text>
          </View>

          <View style={styles.form}>
            {/* Input Correo */}
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
              <TextInput 
                placeholder="Usuario o Correo electrónico" 
                placeholderTextColor="rgba(255,255,255,0.4)"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Input Contraseña con Ojito */}
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
              <TextInput 
                placeholder="Contraseña" 
                placeholderTextColor="rgba(255,255,255,0.4)"
                style={styles.input}
                secureTextEntry={!showPassword} // 3. Se oculta si showPassword es falso
              />
              {/* 4. Botón del ojito */}
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

            {/* LINK CENTRADO */}
           <TouchableOpacity 
  style={styles.forgotContainer} 
  onPress={() => router.push("/(tabs)/home")}
>
  <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
</TouchableOpacity>

<TouchableOpacity 
  style={styles.forgotContainer} 
  onPress={() => router.push("/(tabs)/chats")}
>
  <Text style={styles.forgotText}>Ir a Chats</Text>
</TouchableOpacity>

          </View>

          <View style={styles.footer}>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={styles.loginButton}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.noAccountText}>¿No tienes cuenta? </Text>
             <TouchableOpacity onPress={() => router.push("/screens/RegisterScreen")}>
  <Text style={styles.signUpText}>Regístrate</Text>
</TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    marginTop: 40,
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
  forgotContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  forgotText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  footer: {
    gap: 20,
  },
  loginButton: {
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
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 15,
  },
  signUpText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
});