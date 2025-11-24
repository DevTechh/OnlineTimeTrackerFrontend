import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Clipboard, FlatList, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const GROUPS = [
    { id: '1', name: 'Sabah Koşucuları', icon: '🏃‍♂️', lastMessage: 'Yarın 07:00 sahil?', time: '09:41' },
    { id: '2', name: 'Kitap Kulübü', icon: '📚', lastMessage: 'Yeni kitap seçimi harika.', time: 'Dün' },
    { id: '3', name: 'Kodlama Kampı', icon: '💻', lastMessage: 'Repo linkini attım.', time: 'Pzt' },
    { id: '4', name: 'Yoga & Meditasyon', icon: '🧘‍♀️', lastMessage: 'Nefes egzersizlerini unutmayın.', time: 'Pzt' },
];

export default function GroupsScreen() {
  const router = useRouter();
  
  // Modal Kontrolleri
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Input State'leri
  const [groupCode, setGroupCode] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Rastgele Kod Oluşturucu
  const generateGroupCode = () => {
    const code = Math.random().toString(36).substring(2, 7).toUpperCase();
    setGeneratedCode(code);
    setNewGroupName(''); // İsim alanını temizle
    setShowSelectionModal(false);
    setShowCreateModal(true);
  };

  // Kodu Kopyala
  const copyToClipboard = () => {
    Clipboard.setString(generatedCode);
    Alert.alert("Kopyalandı", "Davet kodu panoya kopyalandı!");
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      {/* Header */}
      <View className="px-6 py-5 flex-row justify-between items-center bg-page border-b border-light/30">
        <Text className="text-3xl font-bold text-dark tracking-tight">Sohbetler</Text>
        
        <TouchableOpacity 
            className="flex-row items-center bg-accent px-5 py-3 rounded-full shadow-sm"
            onPress={() => setShowSelectionModal(true)}
        >
           <MaterialIcons name="add" size={20} color="#FEF9E7" />
           <Text className="text-surface font-bold ml-2">Yeni Grup</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={GROUPS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => router.push({
                pathname: `/groups/${item.id}`,
                params: { name: item.name }
            })}
            className="bg-surface p-4 mb-4 rounded-3xl flex-row items-center shadow-sm border border-light/50 active:scale-95 transition-all"
            activeOpacity={0.9}
          >
             <View className="w-16 h-16 rounded-2xl bg-yellow/20 items-center justify-center mr-5 border border-yellow/30">
                <Text className="text-3xl">{item.icon}</Text>
             </View>
             <View className="flex-1 justify-center">
               <View className="flex-row justify-between mb-1 items-center">
                   <Text className="text-lg font-bold text-dark">{item.name}</Text>
                   <Text className="text-xs text-medium font-medium">{item.time}</Text>
               </View>
               <Text className="text-medium text-sm" numberOfLines={1}>{item.lastMessage}</Text>
             </View>
          </TouchableOpacity>
        )}
      />

      {/* --- MODAL 1: SEÇİM EKRANI (Gruba Gir vs Oluştur) --- */}
      <Modal visible={showSelectionModal} transparent animationType="fade">
        <TouchableOpacity 
            className="flex-1 bg-dark/30 justify-center items-center p-6 backdrop-blur-sm"
            activeOpacity={1} 
            onPress={() => setShowSelectionModal(false)}
        >
            <View className="bg-surface w-full max-w-sm p-6 rounded-3xl shadow-2xl border-2 border-light">
                <Text className="text-xl font-bold text-dark mb-6 text-center">Ne yapmak istersin?</Text>
                
                {/* Seçenek 1: Gruba Katıl */}
                <TouchableOpacity 
                    onPress={() => { setShowSelectionModal(false); setShowJoinModal(true); }}
                    className="bg-page border border-light/60 p-4 rounded-2xl flex-row items-center mb-4 active:bg-light/20"
                >
                    <View className="bg-yellow/20 p-3 rounded-full mr-4">
                        <MaterialIcons name="login" size={24} color="#D97B56" />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-dark">Gruba Katıl</Text>
                        <Text className="text-medium text-xs">Var olan bir koda sahipsen</Text>
                    </View>
                </TouchableOpacity>

                {/* Seçenek 2: Grup Oluştur */}
                <TouchableOpacity 
                    onPress={generateGroupCode}
                    className="bg-page border border-light/60 p-4 rounded-2xl flex-row items-center active:bg-light/20"
                >
                    <View className="bg-green/20 p-3 rounded-full mr-4">
                        <MaterialIcons name="add-circle-outline" size={24} color="#83A686" />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-dark">Grup Oluştur</Text>
                        <Text className="text-medium text-xs">Yeni bir topluluk başlat</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
      </Modal>

      {/* --- MODAL 2: GRUBA KATIL (Kod Girme) --- */}
      <Modal visible={showJoinModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-dark/20">
            <View className="bg-surface p-8 rounded-t-4xl border-t-2 border-light shadow-2xl">
                <Text className="text-2xl font-bold text-dark mb-2 text-center">Gruba Katıl</Text>
                <Text className="text-medium text-center mb-8">Arkadaşının paylaştığı kodu gir.</Text>
                
                <TextInput 
                    className="bg-page border-2 border-light rounded-3xl p-5 mb-6 text-center text-2xl text-dark font-bold tracking-widest uppercase" 
                    placeholder="KODU GİR" 
                    placeholderTextColor="#D4C5B9"
                    value={groupCode}
                    onChangeText={setGroupCode}
                    maxLength={5}
                    autoFocus
                />
                
                <TouchableOpacity 
                    className="bg-accent py-5 rounded-3xl items-center shadow-lg mb-4"
                    onPress={() => {
                        setShowJoinModal(false);
                        Alert.alert("Başarılı", "Gruba katıldınız!");
                    }}
                >
                    <Text className="text-surface font-black text-lg tracking-wide">KATIL</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setShowJoinModal(false)} className="items-center py-2">
                    <Text className="text-medium font-bold">Vazgeç</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* --- MODAL 3: GRUP OLUŞTUR (Kod Üretme) --- */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-dark/20">
            <View className="bg-surface p-8 rounded-t-4xl border-t-2 border-light shadow-2xl h-3/5">
                <Text className="text-2xl font-bold text-dark mb-6 text-center">Yeni Grup Oluştur</Text>
                
                <TextInput 
                    className="bg-page border border-light rounded-2xl p-4 mb-6 text-lg text-dark font-medium" 
                    placeholder="Grup Adı (Örn: Proje Ekibi)" 
                    placeholderTextColor="#8B7E74"
                    value={newGroupName}
                    onChangeText={setNewGroupName}
                />

                <View className="bg-page border-2 border-dashed border-accent/50 p-6 rounded-3xl items-center mb-8">
                    <Text className="text-medium text-xs uppercase font-bold tracking-widest mb-2">Davet Kodun</Text>
                    <TouchableOpacity onPress={copyToClipboard} className="flex-row items-center">
                        <Text className="text-4xl font-black text-accent tracking-widest mr-3">{generatedCode}</Text>
                        <MaterialIcons name="content-copy" size={24} color="#8B7E74" />
                    </TouchableOpacity>
                    <Text className="text-medium/60 text-xs mt-2 text-center">Bu kodu arkadaşlarınla paylaşarak onları gruba davet edebilirsin.</Text>
                </View>
                
                <TouchableOpacity 
                    className="bg-dark py-5 rounded-3xl items-center shadow-lg mb-4"
                    onPress={() => {
                        setShowCreateModal(false);
                        Alert.alert("Grup Oluşturuldu", `${newGroupName} başarıyla kuruldu!`);
                    }}
                >
                    <Text className="text-surface font-black text-lg tracking-wide">OLUŞTUR VE GİR</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => setShowCreateModal(false)} className="items-center py-2">
                    <Text className="text-medium font-bold">Kapat</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}