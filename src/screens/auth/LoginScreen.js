import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function LoginScreen() {
  const router = useRouter();
  const { isDark } = useTheme(); 
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

  // MANUEL RENK ATAMALARI
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',
    cardBg: isDark ? '#342A25' : '#FEF9E7',
    textMain: isDark ? '#EADDcF' : '#3E322B',
    textSec: isDark ? '#9C8F85' : '#8B7E74',
    border: isDark ? '#4E4039' : '#D4C5B9',
    placeholder: isDark ? '#9C8F85' : '#D4C5B9',
    icon: isDark ? '#E6DCCA' : '#8B7E74'
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      
      {/* Logo */}
      <View className="items-center mb-10">
        <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="w-28 h-28 rounded-full border-4 items-center justify-center mb-4 shadow-sm">
            <MaterialIcons name="lock-outline" size={50} color="#D97B56" />
        </View>
        <Text style={{ color: colors.textMain }} className="text-4xl font-black tracking-tight">Hoş Geldin</Text>
        <Text style={{ color: colors.textSec }} className="text-base mt-2 font-medium">Hesabına giriş yap</Text>
      </View>
      
      {/* Email */}
      <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="flex-row items-center border-2 rounded-2xl w-full mb-4 px-4 py-4 shadow-sm">
        <MaterialIcons name="person-outline" size={24} color={colors.icon} />
        <TextInput
          style={{ color: colors.textMain }}
          className="flex-1 ml-3 text-lg font-medium"
          placeholder="E-Posta veya Kullanıcı Adı"
          placeholderTextColor={colors.placeholder}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="flex-row items-center border-2 rounded-2xl w-full mb-6 px-4 py-4 shadow-sm">
        <MaterialIcons name="lock-outline" size={24} color={colors.icon} />
        <TextInput
          style={{ color: colors.textMain }}
          className="flex-1 ml-3 text-lg font-medium"
          placeholder="Şifre"
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Alt Menü */}
      <View className="flex-row items-center justify-between w-full mb-8 px-2">
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} className="flex-row items-center">
          <MaterialIcons name={rememberMe ? "check-box" : "check-box-outline-blank"} size={24} color="#D97B56" />
          <Text style={{ color: colors.textSec }} className="ml-2 font-bold">Beni Hatırla</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text style={{ color: colors.textSec, textDecorationLine: 'underline' }} className="font-bold">Şifremi Unuttum?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={handleLogin} 
        className="bg-[#D97B56] w-full py-5 rounded-2xl items-center shadow-lg active:opacity-90"
      >
        <Text className="text-[#FEF9E7] font-black text-xl tracking-wider">GİRİŞ YAP</Text>
      </TouchableOpacity>

      <View className="flex-row mt-8">
        <Text style={{ color: colors.textSec }} className="text-lg">Hesabın yok mu? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-[#D97B56] font-black text-lg underline">Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}