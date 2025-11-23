import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (email && password) {
        router.replace('/(tabs)'); 
    } else {
        Alert.alert('Eksik Bilgi', 'Lütfen e-posta ve şifrenizi giriniz.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-page p-8">
      {/* Retro Logo Alanı */}
      <View className="items-center mb-10">
        <View className="w-28 h-28 rounded-full bg-surface border-4 border-light/50 items-center justify-center mb-4 shadow-sm">
            <MaterialIcons name="lock-outline" size={50} color="#D97B56" />
        </View>
        <Text className="text-4xl font-black text-dark tracking-tight">Hoş Geldin</Text>
        <Text className="text-medium text-base mt-2 font-medium">Hesabına giriş yap</Text>
      </View>
      
      {/* Email Input */}
      <View className="flex-row items-center bg-surface border-2 border-light rounded-2xl w-full mb-4 px-4 py-4 shadow-sm">
        <MaterialIcons name="person-outline" size={24} color="#8B7E74" />
        <TextInput
          className="flex-1 ml-3 text-dark text-lg font-medium"
          placeholder="E-Posta veya Kullanıcı Adı"
          placeholderTextColor="#D4C5B9"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View className="flex-row items-center bg-surface border-2 border-light rounded-2xl w-full mb-6 px-4 py-4 shadow-sm">
        <MaterialIcons name="lock-outline" size={24} color="#8B7E74" />
        <TextInput
          className="flex-1 ml-3 text-dark text-lg font-medium"
          placeholder="Şifre"
          placeholderTextColor="#D4C5B9"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color="#D4C5B9" />
        </TouchableOpacity>
      </View>

      {/* Beni Hatırla & Şifremi Unuttum */}
      <View className="flex-row items-center justify-between w-full mb-8 px-2">
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
          <MaterialIcons name={rememberMe ? "check-box" : "check-box-outline-blank"} size={24} color="#D97B56" />
          <Text className="ml-2 text-medium font-bold">Beni Hatırla</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text className="text-medium font-bold underline decoration-light">Şifremi Unuttum?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button - Retro Style */}
      <TouchableOpacity 
        onPress={handleLogin} 
        className="bg-accent w-full py-5 rounded-2xl items-center shadow-lg border-b-4 border-dark/10 active:border-b-0 active:translate-y-1"
      >
        <Text className="text-surface font-black text-xl tracking-wider">GİRİŞ YAP</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View className="flex-row mt-8">
        <Text className="text-medium text-lg">Hesabın yok mu? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-accent font-black text-lg underline">Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}