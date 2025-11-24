import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
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

  return (
    <View className="flex-1 justify-center items-center bg-page p-8">
      {/* Geri Dön Butonu */}
      <TouchableOpacity onPress={() => router.back()} className="absolute top-12 left-6 p-2 bg-surface rounded-full shadow-sm border border-light">
         <MaterialIcons name="arrow-back" size={24} color="#3E322B" />
      </TouchableOpacity>

      {/* --- DÜZELTİLEN BAŞLIK ALANI --- */}
      <View className="items-center mb-8 mt-10 w-full px-2">
        {/* text-4xl -> text-3xl yapıldı ve text-center eklendi */}
        <Text className="text-3xl font-black text-dark text-center mb-2">Merhaba!</Text>
        <Text className="text-medium text-lg text-center px-4">Zamanını yönetmeye başlamak için hesabını oluştur.</Text>
      </View>
      {/* ------------------------------- */}
      
      <View className="flex-row items-center bg-surface border-2 border-light rounded-2xl w-full mb-4 px-4 py-4 shadow-sm">
        <MaterialIcons name="mail-outline" size={24} color="#8B7E74" />
        <TextInput 
          className="flex-1 ml-3 text-dark text-lg font-medium" 
          placeholder="E-Posta Adresi" 
          placeholderTextColor="#D4C5B9"
          value={email} 
          onChangeText={setEmail} 
          autoCapitalize="none"
        />
      </View>

      <View className="flex-row items-center bg-surface border-2 border-light rounded-2xl w-full mb-4 px-4 py-4 shadow-sm">
        <MaterialIcons name="lock-outline" size={24} color="#8B7E74" />
        <TextInput 
          className="flex-1 ml-3 text-dark text-lg font-medium" 
          placeholder="Şifre" 
          placeholderTextColor="#D4C5B9"
          secureTextEntry={!showPass} 
          value={password} 
          onChangeText={setPassword} 
        />
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
           <MaterialIcons name={showPass ? "visibility" : "visibility-off"} size={24} color="#D4C5B9" />
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center bg-surface border-2 border-light rounded-2xl w-full mb-8 px-4 py-4 shadow-sm">
        <MaterialIcons name="lock-reset" size={24} color="#8B7E74" />
        <TextInput 
          className="flex-1 ml-3 text-dark text-lg font-medium" 
          placeholder="Şifreyi Tekrar Girin" 
          placeholderTextColor="#D4C5B9"
          secureTextEntry={!showPass} 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
        />
      </View>

      <TouchableOpacity 
        onPress={handleRegister} 
        className="bg-accent w-full py-5 rounded-2xl items-center shadow-lg border-b-4 border-dark/10 active:border-b-0 active:translate-y-1"
      >
        <Text className="text-surface font-black text-xl tracking-wider">KAYIT OL</Text>
      </TouchableOpacity>

       <View className="flex-row mt-8">
        <Text className="text-medium text-lg">Zaten hesabın var mı? </Text>
        <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-accent font-black text-lg underline">Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}