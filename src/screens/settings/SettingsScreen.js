import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme(); 
  
  const [language, setLanguage] = useState('Türkçe');
  const [notifications, setNotifications] = useState(true);

  // --- RENK TANIMLARI (Kesin Çözüm İçin) ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',       // Espresso / Krem
    cardBg: isDark ? '#342A25' : '#FEF9E7',   // Koyu Deri / Açık Krem
    textMain: isDark ? '#EADDcF' : '#3E322B', // Eski Kağıt / Espresso
    textSec: isDark ? '#9C8F85' : '#8B7E74',  // Kül / Vizon
    border: isDark ? '#4E4039' : '#D4C5B9',   // Koyu Çizgi / Açık Çizgi
  };

  const handleLogout = () => {
    Alert.alert("Çıkış Yap", "Emin misiniz?", [
        { text: "Vazgeç", style: "cancel" },
        { text: "Çıkış Yap", style: "destructive", onPress: () => router.replace('/auth/login') }
    ]);
  };

  // Bölüm Bileşeni
  const Section = ({ title, children }) => (
    <View className="mb-8">
      <Text style={{ color: colors.textSec }} className="font-bold mb-3 px-2 uppercase text-xs tracking-widest opacity-80">
        {title}
      </Text>
      <View style={{ backgroundColor: colors.cardBg, borderColor: colors.border }} className="rounded-3xl border overflow-hidden shadow-sm">
        {children}
      </View>
    </View>
  );

  // Ayar Satırı
  const SettingItem = ({ icon, title, value, onPress, isSwitch, switchValue, onSwitchChange, isDestructive, lastItem }) => {
    const handlePress = () => {
        if (isSwitch && onSwitchChange) onSwitchChange(!switchValue);
        else if (onPress) onPress();
    };

    return (
      <TouchableOpacity 
          onPress={handlePress} 
          activeOpacity={0.7}
          disabled={isSwitch && false} 
          style={{ borderBottomWidth: lastItem ? 0 : 1, borderBottomColor: colors.border }}
          className="flex-row items-center justify-between p-5 active:opacity-80"
      >
        <View className="flex-row items-center">
          <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${isDestructive ? 'bg-red-100' : ''}`}
                style={!isDestructive ? { backgroundColor: isDark ? '#1F1B18' : '#F0EAD6', borderColor: colors.border, borderWidth: 1 } : {}}
          >
              <MaterialIcons 
                  name={icon} 
                  size={22} 
                  color={isDestructive ? '#C8553D' : '#D97B56'} 
              />
          </View>
          <Text style={{ color: isDestructive ? '#C8553D' : colors.textMain }} className="text-base font-bold">
              {title}
          </Text>
        </View>

        {isSwitch ? (
          <Switch 
              value={switchValue} 
              onValueChange={onSwitchChange} 
              trackColor={{ false: "#D4C5B9", true: "#D97B56" }} 
              thumbColor={isDark ? "#342A25" : "#FEF9E7"} 
              ios_backgroundColor="#D4C5B9"
          />
        ) : (
          <View className="flex-row items-center">
            {value && <Text style={{ color: colors.textSec }} className="font-medium mr-2 text-sm">{value}</Text>}
            {!isDestructive && <MaterialIcons name="chevron-right" size={24} color={isDark ? "#9C8F85" : "#D4C5B9"} />}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    // ANA ARKA PLAN RENGİNİ BURADAN ZORLUYORUZ
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View className="items-center pt-4 pb-2">
        <View style={{ backgroundColor: colors.border }} className="w-12 h-1.5 rounded-full" />
      </View>

      <ScrollView className="flex-1 px-6 pt-2">
        <Text style={{ color: colors.textMain }} className="text-3xl font-black mb-8 tracking-tight">Ayarlar</Text>

        <Section title="Görünüm & Dil">
          <SettingItem 
            icon={isDark ? "nights-stay" : "wb-sunny"} 
            title="Karanlık Mod" 
            isSwitch 
            switchValue={isDark} 
            onSwitchChange={toggleTheme} 
          />
          <SettingItem 
            icon="language" 
            title="Uygulama Dili" 
            value={language} 
            onPress={() => setLanguage(language === 'Türkçe' ? 'English' : 'Türkçe')} 
            lastItem
          />
        </Section>

        <Section title="Hesap & Güvenlik">
          <SettingItem icon="person-outline" title="Profili Düzenle" onPress={() => {}} />
          <SettingItem icon="lock-outline" title="Şifre ve Güvenlik" onPress={() => {}} />
          <SettingItem icon="mail-outline" title="E-Posta Ayarları" onPress={() => {}} lastItem />
        </Section>

        <Section title="Bildirimler">
           <SettingItem 
             icon="notifications-none" 
             title="Bildirimlere İzin Ver" 
             isSwitch 
             switchValue={notifications} 
             onSwitchChange={(val) => setNotifications(val)} 
             lastItem
           />
        </Section>

        <Section title="Destek & Hakkında">
          <SettingItem icon="privacy-tip" title="Gizlilik Politikası" onPress={() => {}} />
          <SettingItem icon="help-outline" title="Yardım Merkezi" onPress={() => {}} lastItem />
        </Section>
        
        <View className="mb-12 mt-4">
            <TouchableOpacity 
                onPress={handleLogout}
                style={{ backgroundColor: colors.cardBg, borderColor: '#C8553D33' }}
                className="border rounded-3xl p-4 flex-row items-center justify-center shadow-sm"
            >
                <MaterialIcons name="logout" size={20} color="#C8553D" />
                <Text className="text-red-500 font-bold text-lg ml-2">Çıkış Yap</Text>
            </TouchableOpacity>
            
            <Text style={{ color: colors.textSec }} className="text-center text-xs mt-6 font-bold tracking-widest uppercase">
                Online Time Tracker v1.0
            </Text>
        </View>

      </ScrollView>
    </View>
  );
}