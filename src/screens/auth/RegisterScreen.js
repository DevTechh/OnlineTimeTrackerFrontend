import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    Alert.alert('Başarılı', 'Kayıt olundu, giriş yapabilirsiniz.');
    router.back();
  };

  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',
    cardBg: isDark ? '#342A25' : '#FEF9E7',
    textMain: isDark ? '#EADDcF' : '#3E322B',
    textSec: isDark ? '#9C8F85' : '#8B7E74',
    border: isDark ? '#4E4039' : '#D4C5B9',
    placeholder: isDark ? '#9C8F85' : '#D4C5B9',
    icon: isDark ? '#E6DCCA' : '#8B7E74',
    backBtn: isDark ? '#EADDcF' : '#3E322B'
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center', padding: 32 }}>
      
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
        className="absolute top-12 left-6 p-2 rounded-full shadow-sm border"
      >
         <MaterialIcons name="arrow-back" size={24} color={colors.backBtn} />
      </TouchableOpacity>

      <View className="items-center mb-8 mt-10 w-full px-2">
        <Text style={{ color: colors.textMain }} className="text-3xl font-black text-center mb-2">Aramıza Katıl</Text>
        <Text style={{ color: colors.textSec }} className="text-lg text-center px-4">Zamanını yönetmeye başlamak için hesabını oluştur.</Text>
      </View>
      
      <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="flex-row items-center border-2 rounded-2xl w-full mb-4 px-4 py-4 shadow-sm">
        <MaterialIcons name="mail-outline" size={24} color={colors.icon} />
        <TextInput 
          style={{ color: colors.textMain }}
          className="flex-1 ml-3 text-lg font-medium" 
          placeholder="E-Posta Adresi" 
          placeholderTextColor={colors.placeholder}
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
        />
      </View>

      <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="flex-row items-center border-2 rounded-2xl w-full mb-4 px-4 py-4 shadow-sm">
        <MaterialIcons name="lock-outline" size={24} color={colors.icon} />
        <TextInput 
          style={{ color: colors.textMain }}
          className="flex-1 ml-3 text-lg font-medium" 
          placeholder="Şifre" 
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!showPass} 
          value={password} 
          onChangeText={setPassword} 
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
           <MaterialIcons name={showPass ? "visibility" : "visibility-off"} size={24} color={colors.icon} />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="flex-row items-center border-2 rounded-2xl w-full mb-8 px-4 py-4 shadow-sm">
        <MaterialIcons name="lock-reset" size={24} color={colors.icon} />
        <TextInput 
          style={{ color: colors.textMain }}
          className="flex-1 ml-3 text-lg font-medium" 
          placeholder="Şifreyi Tekrar Girin" 
          placeholderTextColor={colors.placeholder}
          secureTextEntry={!showPass} 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
        />
      </View>

      <TouchableOpacity 
        onPress={handleRegister} 
        className="bg-[#D97B56] w-full py-5 rounded-2xl items-center shadow-lg active:opacity-90"
      >
        <Text className="text-[#FEF9E7] font-black text-xl tracking-wider">KAYIT OL</Text>
      </TouchableOpacity>

       <View className="flex-row mt-8">
        <Text style={{ color: colors.textSec }} className="text-lg">Zaten hesabın var mı? </Text>
        <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-[#D97B56] font-black text-lg underline">Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}