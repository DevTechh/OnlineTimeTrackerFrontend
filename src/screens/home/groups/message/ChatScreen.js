import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Örnek Mesaj Verileri
const INITIAL_MESSAGES = [
  { id: '1', text: 'Herkese merhaba! Yarınki plan nedir?', user: 'Ahmet', userId: 'u2', time: '09:30' },
  { id: '2', text: 'Selam Ahmet, sabah 7 gibi sahilde buluşuyoruz.', user: 'Zeynep', userId: 'u3', time: '09:32' },
  { id: '3', text: 'Ben biraz geç kalabilirim, beni beklemeyin.', user: 'Mehmet', userId: 'u4', time: '09:35' },
  { id: '4', text: 'Tamamdır, konum atarız sana.', user: 'Ben', userId: 'me', time: '09:36' },
  { id: '5', text: 'Harika, görüşürüz!', user: 'Mehmet', userId: 'u4', time: '09:40' },
];

// Örnek Üye Listesi
const MEMBERS = [
    { id: 'me', name: 'Ben', role: 'Üye', color: 'bg-accent' }, // Accent -> #D97B56
    { id: 'u2', name: 'Ahmet', role: 'Yönetici', color: 'bg-[#F2CC8F]' },
    { id: 'u3', name: 'Zeynep', role: 'Üye', color: 'bg-[#83A686]' },
    { id: 'u4', name: 'Mehmet', role: 'Üye', color: 'bg-[#EBBAB9]' },
];

// Renk Getirme Fonksiyonu (Mesaj balonları için)
const getUserColor = (userId) => {
    const member = MEMBERS.find(m => m.id === userId);
    return member ? member.color : 'bg-[#D4C5B9]';
};

// Yardımcı Fonksiyon: Tailwind sınıfından Hex kodu çıkarma (Profil sayfasına renk göndermek için)
const getHexFromClass = (className) => {
    if (className === 'bg-accent') return '#D97B56';
    if (className.includes('#')) {
        // 'bg-[#123456]' formatından '#123456'yı çıkarır
        return className.match(/\[(.*?)\]/)?.[1] || '#D4C5B9';
    }
    return '#D4C5B9'; // Varsayılan
};

export default function ChatScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams(); 
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMembersModalVisible, setMembersModalVisible] = useState(false);

  const sendMessage = () => {
    if (inputText.trim().length === 0) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      user: 'Ben',
      userId: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleLeaveGroup = () => {
    setMenuVisible(false);
    Alert.alert(
        "Gruptan Ayrıl",
        `"${name || 'Bu gruptan'}" ayrılmak istediğinize emin misiniz?`,
        [
            { text: "İptal", style: "cancel" },
            { text: "Ayrıl", style: "destructive", onPress: () => router.back() }
        ]
    );
  };

  const renderMessage = ({ item }) => {
    const isMe = item.userId === 'me';
    return (
      <View className={`mb-3 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
        <View 
            className={`p-3 rounded-2xl max-w-[80%] shadow-sm ${
                isMe 
                ? 'bg-accent rounded-tr-none' 
                : `${getUserColor(item.userId)} rounded-tl-none`
            }`}
        >
            {!isMe && (
                <Text className="text-dark/70 font-black text-xs mb-1 uppercase tracking-wide">
                    {item.user}
                </Text>
            )}
            <Text className={`text-base ${isMe ? 'text-white' : 'text-dark'} font-medium leading-5`}>
                {item.text}
            </Text>
            <Text className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-dark/60'}`}>
                {item.time}
            </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3 bg-surface border-b border-light/50 flex-row items-center shadow-sm z-20">
        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-page rounded-full border border-light/50 mr-3">
            <MaterialIcons name="arrow-back" size={24} color="#3E322B" />
        </TouchableOpacity>
        <View className="flex-1">
            <Text className="text-xl font-bold text-dark" numberOfLines={1}>{name || 'Grup Sohbeti'}</Text>
            <Text className="text-xs text-medium">{MEMBERS.length} Üye • Çevrimiçi</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} className="p-2">
            <MaterialIcons name="more-vert" size={28} color="#8B7E74" />
        </TouchableOpacity>
      </View>

      {/* MENU MODALI */}
      <Modal visible={isMenuVisible} transparent animationType="fade">
        <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
            <View className="absolute top-24 right-4 bg-surface p-2 rounded-2xl shadow-xl border border-light/50 w-48">
                <TouchableOpacity 
                    onPress={() => {
                        setMenuVisible(false);
                        setMembersModalVisible(true);
                    }}
                    className="flex-row items-center p-3 border-b border-light/30"
                >
                    <MaterialIcons name="people-outline" size={20} color="#3E322B" />
                    <Text className="text-dark font-bold ml-3">Üyeleri Görüntüle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLeaveGroup} className="flex-row items-center p-3">
                    <MaterialIcons name="exit-to-app" size={20} color="#C8553D" />
                    <Text className="text-danger font-bold ml-3">Gruptan Çık</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
      </Modal>

      {/* ÜYE LİSTESİ MODALI (DÜZENLENDİ: Tıklama Özelliği Eklendi) */}
      <Modal visible={isMembersModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-dark/20">
            <View className="bg-surface h-2/3 rounded-t-4xl p-6 shadow-2xl border-t-2 border-light">
                <View className="w-12 h-1.5 bg-light/60 rounded-full self-center mb-6" />
                
                <Text className="text-2xl font-bold text-dark mb-4 px-2">Grup Üyeleri</Text>
                
                <FlatList 
                    data={MEMBERS}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            // DÜZELTME: Tıklayınca Profil Ekranına Git
                            onPress={() => {
                                setMembersModalVisible(false); // Önce modalı kapat
                                router.push({
                                    pathname: `/user/${item.id}`,
                                    params: {
                                        name: item.name,
                                        score: Math.floor(Math.random() * 1000) + 500, // Rastgele skor örneği
                                        color: getHexFromClass(item.color) // Rengi gönder
                                    }
                                });
                            }}
                            className="flex-row items-center p-3 mb-2 bg-page rounded-2xl border border-light/40 active:bg-light/20 active:scale-95 transition-all"
                        >
                            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${item.color}`}>
                                <Text className="text-xl font-bold text-dark/80">{item.name[0]}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-dark">{item.name}</Text>
                                <Text className="text-xs text-medium uppercase font-bold tracking-wider">{item.role}</Text>
                            </View>
                            {item.role === 'Yönetici' ? (
                                <MaterialIcons name="star" size={20} color="#F2CC8F" />
                            ) : (
                                <MaterialIcons name="chevron-right" size={20} color="#D4C5B9" />
                            )}
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity 
                    onPress={() => setMembersModalVisible(false)} 
                    className="bg-dark py-4 rounded-2xl items-center mt-4"
                >
                    <Text className="text-surface font-bold text-lg">Kapat</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* Mesaj Listesi ve Input Aynı Kaldı */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        className="absolute bottom-0 w-full bg-surface p-4 border-t border-light/30 rounded-t-3xl shadow-lg"
      >
        <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-2 bg-page rounded-full border border-light/50">
                <MaterialIcons name="add" size={24} color="#8B7E74" />
            </TouchableOpacity>
            <TextInput
                className="flex-1 bg-page border border-light/50 rounded-2xl px-4 py-3 text-dark font-medium max-h-24"
                placeholder="Mesaj yaz..."
                placeholderTextColor="#D4C5B9"
                value={inputText}
                onChangeText={setInputText}
                multiline
            />
            <TouchableOpacity 
                onPress={sendMessage}
                className={`p-3 rounded-full shadow-md ${inputText.trim() ? 'bg-accent' : 'bg-light'}`}
                disabled={!inputText.trim()}
            >
                <MaterialIcons name="send" size={24} color={inputText.trim() ? "white" : "#8B7E74"} />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}