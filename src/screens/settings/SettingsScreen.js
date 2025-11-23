import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const [theme, setTheme] = useState('Açık');
  const [language, setLanguage] = useState('Türkçe');
  const [notifications, setNotifications] = useState(true);

  // Çıkış Fonksiyonu
  const handleLogout = () => {
    Alert.alert(
        "Çıkış Yap", 
        "Hesabınızdan çıkış yapmak istediğinize emin misiniz?", 
        [
            { text: "Vazgeç", style: "cancel" },
            { 
                text: "Çıkış Yap", 
                style: "destructive",
                onPress: () => {
                    router.replace('/auth/login');
                }
            }
        ]
    );
  };

  // Bölüm Bileşeni (Retro Kart Görünümü)
  const Section = ({ title, children }) => (
    <View className="mb-8">
      <Text className="text-medium font-bold mb-3 px-2 uppercase text-xs tracking-widest opacity-80">{title}</Text>
      <View className="bg-surface rounded-3xl border border-light/50 overflow-hidden shadow-sm">
        {children}
      </View>
    </View>
  );

  // Ayar Satırı Bileşeni
  const SettingItem = ({ icon, title, value, onPress, isSwitch, switchValue, onSwitchChange, isDestructive, lastItem }) => (
    <TouchableOpacity 
        onPress={onPress} 
        disabled={isSwitch} 
        activeOpacity={0.7}
        className={`flex-row items-center justify-between p-5 ${!lastItem ? 'border-b border-light/30' : ''} active:bg-page/50`}
    >
      <View className="flex-row items-center">
        {/* İkon Kutusu */}
        <View className={`w-10 h-10 rounded-xl items-center justify-center mr-4 ${isDestructive ? 'bg-danger/10' : 'bg-page border border-light/30'}`}>
            <MaterialIcons 
                name={icon} 
                size={22} 
                color={isDestructive ? '#C8553D' : '#D97B56'} 
            />
        </View>
        <Text className={`text-base font-bold ${isDestructive ? 'text-danger' : 'text-dark'}`}>{title}</Text>
      </View>

      {isSwitch ? (
        <Switch 
            value={switchValue} 
            onValueChange={onSwitchChange} 
            trackColor={{ false: "#D4C5B9", true: "#D97B56" }} // Pasif: Sütlü Kahve, Aktif: Yanık Turuncu
            thumbColor={"#FEF9E7"} // Krem
            ios_backgroundColor="#D4C5B9"
        />
      ) : (
        <View className="flex-row items-center">
          {value && <Text className="text-medium font-medium mr-2 text-sm">{value}</Text>}
          {!isDestructive && <MaterialIcons name="chevron-right" size={24} color="#D4C5B9" />}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-page">
      {/* Modal Handle (Tutamaç) - Kullanıcıya bunun bir modal olduğunu hissettirir */}
      <View className="items-center pt-4 pb-2">
        <View className="w-12 h-1.5 bg-light/60 rounded-full" />
      </View>

      <ScrollView className="flex-1 px-6 pt-2">
        {/* Başlık */}
        <Text className="text-3xl font-black text-dark mb-8 tracking-tight">Ayarlar</Text>

        <Section title="Hesap & Güvenlik">
          <SettingItem icon="person-outline" title="Profili Düzenle" onPress={() => {}} />
          <SettingItem icon="lock-outline" title="Şifre ve Güvenlik" onPress={() => {}} />
          <SettingItem icon="mail-outline" title="E-Posta Ayarları" onPress={() => {}} lastItem />
        </Section>

        <Section title="Görünüm & Dil">
          <SettingItem 
            icon="language" 
            title="Uygulama Dili" 
            value={language} 
            onPress={() => setLanguage(language === 'Türkçe' ? 'English' : 'Türkçe')} 
          />
          <SettingItem 
            icon="brightness-6" 
            title="Tema" 
            value={theme} 
            onPress={() => setTheme(theme === 'Açık' ? 'Koyu' : 'Açık')} 
            lastItem
          />
        </Section>

        <Section title="Bildirimler">
           <SettingItem 
             icon="notifications-none" 
             title="Bildirimlere İzin Ver" 
             isSwitch 
             switchValue={notifications} 
             onSwitchChange={setNotifications} 
             lastItem
           />
        </Section>

        <Section title="Destek & Hakkında">
          <SettingItem icon="privacy-tip" title="Gizlilik Politikası" onPress={() => {}} />
          <SettingItem icon="help-outline" title="Yardım Merkezi" onPress={() => {}} lastItem />
        </Section>
        
        {/* Çıkış Butonu Alanı */}
        <View className="mb-12">
            <TouchableOpacity 
                onPress={handleLogout}
                className="bg-surface border border-danger/20 rounded-3xl p-4 flex-row items-center justify-center shadow-sm active:bg-danger/5"
            >
                <MaterialIcons name="logout" size={20} color="#C8553D" />
                <Text className="text-danger font-bold text-lg ml-2">Çıkış Yap</Text>
            </TouchableOpacity>
            
            <Text className="text-center text-light text-xs mt-6 font-bold tracking-widest uppercase">
                Online Time Tracker v1.0
            </Text>
        </View>

      </ScrollView>
    </View>
  );
}