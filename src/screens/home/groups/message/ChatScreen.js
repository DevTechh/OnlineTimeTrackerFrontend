import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../context/ThemeContext'; // Tema Bağlantısı

const INITIAL_MESSAGES = [
  { id: '1', text: 'Herkese merhaba! Yarınki plan nedir?', user: 'Ahmet', userId: 'u2', time: '09:30' },
  { id: '2', text: 'Selam Ahmet, sabah 7 gibi sahilde buluşuyoruz.', user: 'Zeynep', userId: 'u3', time: '09:32' },
  { id: '3', text: 'Ben biraz geç kalabilirim, beni beklemeyin.', user: 'Mehmet', userId: 'u4', time: '09:35' },
  { id: '4', text: 'Tamamdır, konum atarız sana.', user: 'Ben', userId: 'me', time: '09:36' },
  { id: '5', text: 'Harika, görüşürüz!', user: 'Mehmet', userId: 'u4', time: '09:40' },
];

const MEMBERS = [
    { id: 'me', name: 'Ben', role: 'Üye', color: 'bg-accent' }, 
    { id: 'u2', name: 'Ahmet', role: 'Yönetici', color: 'bg-[#F2CC8F]' },
    { id: 'u3', name: 'Zeynep', role: 'Üye', color: 'bg-[#83A686]' },
    { id: 'u4', name: 'Mehmet', role: 'Üye', color: 'bg-[#EBBAB9]' },
];

// Renk Helper
const getHexFromClass = (className) => {
    if (className === 'bg-accent') return '#D97B56';
    if (className.includes('#')) return className.match(/\[(.*?)\]/)?.[1] || '#D4C5B9';
    return '#D4C5B9';
};

export default function ChatScreen() {
  const router = useRouter();
  const { isDark } = useTheme(); // Tema durumu
  const { name } = useLocalSearchParams(); 
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMembersModalVisible, setMembersModalVisible] = useState(false);

  // --- RENK PALETİ ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',
    surface: isDark ? '#342A25' : '#FEF9E7',
    textMain: isDark ? '#EADDcF' : '#3E322B',
    textSec: isDark ? '#9C8F85' : '#8B7E74',
    border: isDark ? '#4E4039' : '#D4C5B9',
    inputBg: isDark ? '#1F1B18' : '#F0EAD6',
    accent: '#D97B56',
  };

  // Mesaj balonu rengi (Karanlık modda biraz soluklaştırabiliriz ama retro renkleri koruyalım)
  const getUserColor = (userId) => {
    const member = MEMBERS.find(m => m.id === userId);
    if (!member) return '#D4C5B9';
    // Tailwind class'tan hex'e çeviriyoruz manuel olarak (Basitlik için)
    if (member.color === 'bg-[#F2CC8F]') return '#F2CC8F';
    if (member.color === 'bg-[#83A686]') return '#83A686';
    if (member.color === 'bg-[#EBBAB9]') return '#EBBAB9';
    return '#D4C5B9';
  };

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
    const bubbleBg = isMe ? colors.accent : getUserColor(item.userId);
    // Diğer kullanıcıların mesaj metni rengi (Koyu zeminse açık, açık zeminse koyu)
    // Retro renkler genelde pastel olduğu için koyu metin (#3E322B) iyi gider.
    // Ancak "Benim" mesajım turuncu, orada beyaz metin.
    const textColor = isMe ? '#FEF9E7' : '#3E322B'; 

    return (
      <View className={`mb-3 flex-row ${isMe ? 'justify-end' : 'justify-start'}`}>
        <View 
            style={{ 
                backgroundColor: bubbleBg,
                borderTopRightRadius: isMe ? 0 : 16,
                borderTopLeftRadius: isMe ? 16 : 0,
                borderBottomRightRadius: 16,
                borderBottomLeftRadius: 16,
            }}
            className="p-3 max-w-[80%] shadow-sm"
        >
            {!isMe && (
                <Text className="text-[#3E322B]/70 font-black text-xs mb-1 uppercase tracking-wide">
                    {item.user}
                </Text>
            )}
            <Text style={{ color: textColor }} className="text-base font-medium leading-5">
                {item.text}
            </Text>
            <Text style={{ color: isMe ? '#FEF9E790' : '#3E322B80' }} className="text-[10px] mt-1 text-right">
                {item.time}
            </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView 
        key={isDark ? 'dark' : 'light'}
        style={{ flex: 1, backgroundColor: colors.bg }} 
        edges={['top']}
    >
      {/* Header */}
      <View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderBottomWidth: 1 }} className="px-4 py-3 flex-row items-center shadow-sm z-20">
        <TouchableOpacity onPress={() => router.back()} style={{ backgroundColor: colors.bg, borderColor: colors.border }} className="p-2 rounded-full border mr-3">
            <MaterialIcons name="arrow-back" size={24} color={colors.textMain} />
        </TouchableOpacity>
        <View className="flex-1">
            <Text style={{ color: colors.textMain }} className="text-xl font-bold" numberOfLines={1}>{name || 'Grup Sohbeti'}</Text>
            <Text style={{ color: colors.textSec }} className="text-xs">{MEMBERS.length} Üye • Çevrimiçi</Text>
        </View>
        <TouchableOpacity onPress={() => setMenuVisible(true)} className="p-2">
            <MaterialIcons name="more-vert" size={28} color={colors.textSec} />
        </TouchableOpacity>
      </View>

      {/* --- MENU MODALI --- */}
      <Modal visible={isMenuVisible} transparent animationType="fade">
        <Pressable className="flex-1" onPress={() => setMenuVisible(false)}>
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="absolute top-24 right-4 p-2 rounded-2xl shadow-xl border w-48">
                <TouchableOpacity 
                    onPress={() => {
                        setMenuVisible(false);
                        setMembersModalVisible(true);
                    }}
                    style={{ borderBottomColor: colors.border, borderBottomWidth: 1 }}
                    className="flex-row items-center p-3"
                >
                    <MaterialIcons name="people-outline" size={20} color={colors.textMain} />
                    <Text style={{ color: colors.textMain }} className="font-bold ml-3">Üyeleri Görüntüle</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLeaveGroup} className="flex-row items-center p-3">
                    <MaterialIcons name="exit-to-app" size={20} color="#C8553D" />
                    <Text className="text-danger font-bold ml-3">Gruptan Çık</Text>
                </TouchableOpacity>
            </View>
        </Pressable>
      </Modal>

      {/* --- ÜYE LİSTESİ MODALI --- */}
      <Modal visible={isMembersModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="h-2/3 rounded-t-4xl p-6 shadow-2xl border-t-2">
                <View style={{ backgroundColor: colors.border }} className="w-12 h-1.5 rounded-full self-center mb-6" />
                
                <Text style={{ color: colors.textMain }} className="text-2xl font-bold mb-4 px-2">Grup Üyeleri</Text>
                
                <FlatList 
                    data={MEMBERS}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            onPress={() => {
                                setMembersModalVisible(false);
                                router.push({
                                    pathname: `/user/${item.id}`,
                                    params: {
                                        name: item.name,
                                        score: Math.floor(Math.random() * 1000) + 500,
                                        color: getHexFromClass(item.color)
                                    }
                                });
                            }}
                            style={{ backgroundColor: colors.bg, borderColor: colors.border }}
                            className="flex-row items-center p-3 mb-2 rounded-2xl border active:opacity-70"
                        >
                            <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${item.color}`}>
                                <Text className="text-xl font-bold text-dark/80">{item.name[0]}</Text>
                            </View>
                            <View className="flex-1">
                                <Text style={{ color: colors.textMain }} className="text-lg font-bold">{item.name}</Text>
                                <Text style={{ color: colors.textSec }} className="text-xs uppercase font-bold tracking-wider">{item.role}</Text>
                            </View>
                            {item.role === 'Yönetici' ? (
                                <MaterialIcons name="star" size={20} color={colors.yellow} />
                            ) : (
                                <MaterialIcons name="chevron-right" size={20} color={colors.textSec} />
                            )}
                        </TouchableOpacity>
                    )}
                />

                <TouchableOpacity 
                    onPress={() => setMembersModalVisible(false)} 
                    style={{ backgroundColor: colors.textMain }}
                    className="py-4 rounded-2xl items-center mt-4"
                >
                    <Text style={{ color: colors.surface }} className="font-bold text-lg">Kapat</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* --- Mesaj Listesi --- */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* --- Input Alanı --- */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
        className="absolute bottom-0 w-full p-4 border-t rounded-t-3xl shadow-lg"
      >
        <View className="flex-row items-center gap-3">
            <TouchableOpacity style={{ backgroundColor: colors.bg, borderColor: colors.border }} className="p-2 rounded-full border">
                <MaterialIcons name="add" size={24} color={colors.textSec} />
            </TouchableOpacity>
            <TextInput
                style={{ backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }}
                className="flex-1 border rounded-2xl px-4 py-3 font-medium max-h-24"
                placeholder="Mesaj yaz..."
                placeholderTextColor={colors.textSec}
                value={inputText}
                onChangeText={setInputText}
                multiline
            />
            <TouchableOpacity 
                onPress={sendMessage}
                style={{ backgroundColor: inputText.trim() ? colors.accent : colors.border }}
                className="p-3 rounded-full shadow-md"
                disabled={!inputText.trim()}
            >
                <MaterialIcons name="send" size={24} color={inputText.trim() ? "#FEF9E7" : colors.textSec} />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}