import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Clipboard, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../src/context/ThemeContext'; // Tema Bağlantısı

const GROUPS = [
    { id: '1', name: 'Sabah Koşucuları', icon: '🏃‍♂️', lastMessage: 'Yarın 07:00 sahil?', time: '09:41' },
    { id: '2', name: 'Kitap Kulübü', icon: '📚', lastMessage: 'Yeni kitap seçimi harika.', time: 'Dün' },
    { id: '3', name: 'Kodlama Kampı', icon: '💻', lastMessage: 'Repo linkini attım.', time: 'Pzt' },
    { id: '4', name: 'Yoga & Meditasyon', icon: '🧘‍♀️', lastMessage: 'Nefes egzersizlerini unutmayın.', time: 'Pzt' },
];

export default function GroupsScreen() {
  const router = useRouter();
  const { isDark } = useTheme(); // Tema Durumu
  
  // Modal Kontrolleri
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Input State'leri
  const [groupCode, setGroupCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // --- RENK PALETİ (Garanti Yöntem) ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',       // Espresso / Krem
    surface: isDark ? '#342A25' : '#FEF9E7',  // Koyu Deri / Açık Krem
    textMain: isDark ? '#EADDcF' : '#3E322B', // Eski Kağıt / Kahve
    textSec: isDark ? '#9C8F85' : '#8B7E74',  // Kül / Vizon
    border: isDark ? '#4E4039' : '#D4C5B9',   // Koyu Çizgi / Açık Çizgi
    inputBg: isDark ? '#1F1B18' : '#F0EAD6',  // Input Zemini
    accent: '#D97B56',                        // Yanık Turuncu
    yellow: '#F2CC8F',                        // Hardal
    green: '#83A686',                         // Zeytin
  };

  const generateGroupCode = () => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setGeneratedCode(code);
    setNewGroupName(''); 
    setShowSelectionModal(false);
    setShowCreateModal(true);
  };

  const copyToClipboard = () => {
    Clipboard.setString(generatedCode);
    Alert.alert("Kopyalandı", "Davet kodu panoya kopyalandı!");
  };

  const renderGroupItem = ({ item }) => (
    <TouchableOpacity 
        onPress={() => router.push({
            pathname: `/groups/${item.id}`,
            params: { name: item.name }
        })}
        style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
        className="p-4 mb-4 rounded-3xl flex-row items-center shadow-sm active:scale-95 transition-all"
        activeOpacity={0.9}
    >
        <View style={{ backgroundColor: isDark ? '#F2CC8F10' : '#F2CC8F20', borderColor: isDark ? '#F2CC8F30' : '#F2CC8F50' }} className="w-16 h-16 rounded-2xl items-center justify-center mr-5 border">
            <Text className="text-3xl">{item.icon}</Text>
        </View>
        <View className="flex-1 justify-center">
            <View className="flex-row justify-between mb-1 items-center">
                <Text style={{ color: colors.textMain }} className="text-lg font-bold">{item.name}</Text>
                <Text style={{ color: colors.textSec }} className="text-xs font-medium">{item.time}</Text>
            </View>
            <Text style={{ color: colors.textSec }} className="text-sm" numberOfLines={1}>{item.lastMessage}</Text>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
        key={isDark ? 'dark' : 'light'}
        style={{ flex: 1, backgroundColor: colors.bg }} 
        edges={['top']}
    >
      {/* Header */}
      <View style={{ borderBottomColor: colors.border, borderBottomWidth: 1 }} className="px-6 py-5 flex-row justify-between items-center">
        <Text style={{ color: colors.textMain }} className="text-3xl font-bold tracking-tight">Sohbetler</Text>
        
        <TouchableOpacity 
            className="flex-row items-center bg-[#D97B56] px-5 py-3 rounded-full shadow-sm"
            onPress={() => setShowSelectionModal(true)}
        >
           <MaterialIcons name="add" size={20} color="#FEF9E7" />
           <Text className="text-[#FEF9E7] font-bold ml-2">Yeni Grup</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={GROUPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20 }}
        renderItem={renderGroupItem}
      />

      {/* --- MODAL 1: SEÇİM EKRANI --- */}
      <Modal visible={showSelectionModal} transparent animationType="fade">
        <TouchableOpacity 
            style={{ backgroundColor: isDark ? '#00000080' : '#3E322B30' }}
            className="flex-1 justify-center items-center p-6 backdrop-blur-sm"
            activeOpacity={1} 
            onPress={() => setShowSelectionModal(false)}
        >
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="w-full max-w-sm p-6 rounded-3xl shadow-2xl border-2">
                <Text style={{ color: colors.textMain }} className="text-xl font-bold mb-6 text-center">Ne yapmak istersin?</Text>
                
                {/* Gruba Katıl */}
                <TouchableOpacity 
                    onPress={() => { setShowSelectionModal(false); setShowJoinModal(true); }}
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                    className="border p-4 rounded-2xl flex-row items-center mb-4"
                >
                    <View style={{ backgroundColor: isDark ? '#F2CC8F20' : '#F2CC8F30' }} className="p-3 rounded-full mr-4">
                        <MaterialIcons name="login" size={24} color={colors.accent} />
                    </View>
                    <View>
                        <Text style={{ color: colors.textMain }} className="text-lg font-bold">Gruba Katıl</Text>
                        <Text style={{ color: colors.textSec }} className="text-xs">Var olan bir koda sahipsen</Text>
                    </View>
                </TouchableOpacity>

                {/* Grup Oluştur */}
                <TouchableOpacity 
                    onPress={generateGroupCode}
                    style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                    className="border p-4 rounded-2xl flex-row items-center"
                >
                    <View style={{ backgroundColor: isDark ? '#83A68620' : '#83A68630' }} className="p-3 rounded-full mr-4">
                        <MaterialIcons name="add-circle-outline" size={24} color={colors.green} />
                    </View>
                    <View>
                        <Text style={{ color: colors.textMain }} className="text-lg font-bold">Grup Oluştur</Text>
                        <Text style={{ color: colors.textSec }} className="text-xs">Yeni bir topluluk başlat</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </Modal>

      {/* --- MODAL 2: GRUBA KATIL --- */}
      <Modal visible={showJoinModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-8 rounded-t-4xl border-t-2 shadow-2xl">
                <Text style={{ color: colors.textMain }} className="text-2xl font-bold mb-2 text-center">Gruba Katıl</Text>
                <Text style={{ color: colors.textSec }} className="text-center mb-8">Arkadaşının paylaştığı kodu gir.</Text>
                
                <TextInput 
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }}
                    className="border-2 rounded-3xl p-5 mb-6 text-center text-2xl font-bold tracking-widest uppercase" 
                    placeholder="KODU GİR" 
                    placeholderTextColor={colors.textSec}
                    value={groupCode}
                    onChangeText={setGroupCode}
                    maxLength={5}
                    autoFocus
                />
                
                <TouchableOpacity 
                    className="bg-[#D97B56] py-5 rounded-3xl items-center shadow-lg mb-4"
                    onPress={() => {
                        setShowJoinModal(false);
                        Alert.alert("Başarılı", "Gruba katıldınız!");
                    }}
                >
                    <Text className="text-[#FEF9E7] font-black text-lg tracking-wide">KATIL</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setShowJoinModal(false)} className="items-center py-2">
                    <Text style={{ color: colors.textSec }} className="font-bold">Vazgeç</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* --- MODAL 3: GRUP OLUŞTUR --- */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-8 rounded-t-4xl border-t-2 shadow-2xl h-3/5">
                <Text style={{ color: colors.textMain }} className="text-2xl font-bold mb-6 text-center">Yeni Grup Oluştur</Text>
                
                <TextInput 
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }}
                    className="border rounded-2xl p-4 mb-6 text-lg font-medium" 
                    placeholder="Grup Adı (Örn: Proje Ekibi)" 
                    placeholderTextColor={colors.textSec}
                    value={newGroupName}
                    onChangeText={setNewGroupName}
                />

                <View style={{ backgroundColor: colors.inputBg, borderColor: colors.accent }} className="border-2 border-dashed p-6 rounded-3xl items-center mb-8">
                    <Text style={{ color: colors.textSec }} className="text-xs uppercase font-bold tracking-widest mb-2">Davet Kodun</Text>
                    <TouchableOpacity onPress={copyToClipboard} className="flex-row items-center">
                        <Text style={{ color: colors.accent }} className="text-4xl font-black tracking-widest mr-3">{generatedCode}</Text>
                        <MaterialIcons name="content-copy" size={24} color={colors.textSec} />
                    </TouchableOpacity>
                    <Text style={{ color: colors.textSec }} className="text-xs mt-2 text-center opacity-60">Bu kodu paylaşarak arkadaşlarını davet et.</Text>
                </View>
                
                <TouchableOpacity 
                    style={{ backgroundColor: colors.textMain }}
                    className="py-5 rounded-3xl items-center shadow-lg mb-4"
                    onPress={() => {
                        setShowCreateModal(false);
                        Alert.alert("Grup Oluşturuldu", `${newGroupName} başarıyla kuruldu!`);
                    }}
                >
                    <Text style={{ color: colors.surface }} className="font-black text-lg tracking-wide">OLUŞTUR VE GİR</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setShowCreateModal(false)} className="items-center py-2">
                    <Text style={{ color: colors.textSec }} className="font-bold">Kapat</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}