import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../src/context/ThemeContext'; // Tema

const USERS = [
  { id: '1', name: 'Sarah', score: 980, color: '#F2CC8F' }, // Hardal
  { id: '2', name: 'Samuel', score: 870, color: '#D4C5B9' }, // Kahve
  { id: '3', name: 'Sandra', score: 860, color: '#D97B56' }, // Turuncu
  { id: '4', name: 'Sophie', score: 850, color: '#EBBAB9' }, // Gül
  { id: '5', name: 'Stephen', score: 830, color: '#83A686' }, // Yeşil
];

export default function CommunityScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');

  // --- RENKLER ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',
    surface: isDark ? '#342A25' : '#FEF9E7',
    textMain: isDark ? '#EADDcF' : '#3E322B',
    textSec: isDark ? '#9C8F85' : '#8B7E74',
    border: isDark ? '#4E4039' : '#D4C5B9',
    inputBg: isDark ? '#342A25' : '#FEF9E7',
    podiumBase: isDark ? '#4E4039' : '#D4C5B950', // Kürsü rengi
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity 
      onPress={() => {
        router.push({
            pathname: `/user/${item.id}`,
            params: { name: item.name, score: item.score, color: item.color }
        });
      }}
      activeOpacity={0.8}
      style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 }}
      className="flex-row items-center p-4 mb-3 rounded-3xl shadow-sm mx-1 active:scale-95 transition-all"
    >
      <Text style={{ color: colors.textSec }} className="font-bold w-8 text-lg">{index + 1}.</Text>
      
      <View 
        style={{ backgroundColor: item.color, borderColor: colors.surface }}
        className="w-12 h-12 rounded-full items-center justify-center mr-4 border-2 shadow-sm"
      >
        <Text className="font-bold text-xl text-[#3E322B] opacity-80">{item.name[0]}</Text>
      </View>
      
      <View className="flex-1">
        <Text style={{ color: colors.textMain }} className="text-lg font-bold">{item.name}</Text>
        <Text style={{ color: colors.textSec }} className="text-xs font-medium uppercase tracking-wide">
            {item.score} Puan
        </Text>
      </View>
      
      <View style={{ backgroundColor: colors.bg }} className="p-2 rounded-full">
        <MaterialIcons name="chevron-right" size={20} color={colors.textSec} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
        key={isDark ? 'dark' : 'light'}
        style={{ flex: 1, backgroundColor: colors.bg }} 
        edges={['top']}
    >
      <View className="px-6 pt-4 pb-6 z-10">
        <Text style={{ color: colors.textMain }} className="text-3xl font-bold mb-5 tracking-tight">Liderlik Tablosu</Text>
        
        {/* Arama Çubuğu */}
        <View style={{ backgroundColor: colors.inputBg, borderColor: colors.border, borderWidth: 2 }} className="flex-row items-center rounded-2xl px-4 py-3 shadow-sm">
           <MaterialIcons name="search" size={24} color={colors.textSec} />
           <TextInput 
             style={{ color: colors.textMain }}
             className="flex-1 ml-3 text-lg font-medium" 
             placeholder="Arkadaşlarını bul..." 
             placeholderTextColor={colors.textSec}
             value={search}
             onChangeText={setSearch}
           />
        </View>
      </View>
      
      {/* --- KÜRSÜ ALANI --- */}
      <View style={{ borderBottomColor: colors.border, borderBottomWidth: 1 }} className="flex-row justify-center items-end pb-8 pt-4 mb-2">
         {/* 2. Sıra */}
         <TouchableOpacity onPress={() => router.push({ pathname: '/user/2', params: { name: 'Samuel', score: 870, color: '#D4C5B9' } })} className="items-center mx-2 z-10">
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="w-20 h-20 rounded-full items-center justify-center mb-2 border-4 shadow-sm">
                <Text style={{ color: colors.textSec }} className="text-3xl font-black">2</Text>
            </View>
            <Text style={{ color: colors.textMain }} className="font-bold text-base">Samuel</Text>
            <Text style={{ color: colors.textSec }} className="text-xs font-bold">870 P</Text>
            {/* Blok */}
            <View style={{ backgroundColor: colors.podiumBase, borderColor: colors.border }} className="w-20 h-24 mt-2 rounded-t-lg border-x-2 border-t-2" />
         </TouchableOpacity>
         
         {/* 1. Sıra */}
         <TouchableOpacity onPress={() => router.push({ pathname: '/user/1', params: { name: 'Sarah', score: 980, color: '#F2CC8F' } })} className="items-center mx-2 z-20 -mb-2">
            <MaterialIcons name="emoji-events" size={36} color="#F2CC8F" className="mb-1" />
            <View style={{ backgroundColor: '#F2CC8F', borderColor: colors.surface }} className="w-24 h-24 rounded-full items-center justify-center mb-2 border-4 shadow-md">
                <Text className="text-4xl font-black text-[#3E322B] opacity-80">1</Text>
            </View>
            <Text style={{ color: colors.textMain }} className="font-bold text-lg">Sarah</Text>
            <Text className="text-sm text-[#D97B56] font-bold">980 P</Text>
            {/* Blok */}
            <View style={{ backgroundColor: isDark ? '#F2CC8F20' : '#F2CC8F40', borderColor: '#F2CC8F' }} className="w-24 h-32 mt-2 rounded-t-lg border-x-2 border-t-2 flex items-center justify-center">
                <Text className="text-[#F2CC8F] font-black text-4xl opacity-50">1</Text>
            </View>
         </TouchableOpacity>
         
         {/* 3. Sıra */}
         <TouchableOpacity onPress={() => router.push({ pathname: '/user/3', params: { name: 'Sandra', score: 860, color: '#D97B56' } })} className="items-center mx-2 z-10">
            <View style={{ backgroundColor: colors.surface, borderColor: '#D97B5650' }} className="w-20 h-20 rounded-full items-center justify-center mb-2 border-4 shadow-sm">
                <Text className="text-3xl font-black text-[#D97B56] opacity-60">3</Text>
            </View>
            <Text style={{ color: colors.textMain }} className="font-bold text-base">Sandra</Text>
            <Text style={{ color: colors.textSec }} className="text-xs font-bold">860 P</Text>
            {/* Blok */}
            <View style={{ backgroundColor: isDark ? '#D97B5620' : '#D97B5630', borderColor: '#D97B56' }} className="w-20 h-16 mt-2 rounded-t-lg border-x-2 border-t-2" />
         </TouchableOpacity>
      </View>

      <FlatList
        data={USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20, paddingTop: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}