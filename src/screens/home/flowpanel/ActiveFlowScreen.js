import { MaterialIcons } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActiveFlowScreen() {
  useKeepAwake(); // Ekran kapanmaz
  const router = useRouter();
  
  const [seconds, setSeconds] = useState(0);
  
  // Animasyon Değerleri
  const fadeAnim = useRef(new Animated.Value(1)).current; 
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Sayaç Mantığı
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Nefes Alma Animasyonu
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
            Animated.timing(scaleAnim, { toValue: 1.2, duration: 4000, useNativeDriver: true }), 
            Animated.timing(fadeAnim, { toValue: 0.6, duration: 4000, useNativeDriver: true }),
        ]),
        Animated.parallel([
            Animated.timing(scaleAnim, { toValue: 1, duration: 4000, useNativeDriver: true }), 
            Animated.timing(fadeAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
        ])
      ])
    ).start();
  }, []);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    Alert.alert(
        "Akışı Bitir",
        "Odaklanma oturumunu sonlandırmak istiyor musun?",
        [
            { text: "Devam Et", style: "cancel" },
            { 
                text: "Bitir", 
                style: "destructive", 
                onPress: () => {
                    router.back(); 
                }
            }
        ]
    );
  };

  return (
    // Arka plan rengi: Retro Dark Coffee (#231E1A)
    <SafeAreaView className="flex-1 bg-[#231E1A] justify-center items-center">
      
      {/* Nefes Alan Daire */}
      <Animated.View 
        style={{ 
            transform: [{ scale: scaleAnim }],
            opacity: fadeAnim
        }}
        className="absolute w-96 h-96 rounded-full bg-[#D97B56]/10 border border-[#D97B56]/20"
      />
      
      <View className="items-center mb-16">
        <MaterialIcons name="waves" size={40} color="#D97B56" style={{ opacity: 0.8, marginBottom: 20 }} />
        
        {/* DÜZELTME: tracking-[0.5em] yerine tracking-widest kullanıldı */}
        <Text className="text-[#8B7E74] text-sm font-bold uppercase tracking-widest mb-4 opacity-60">
            Akıştasın
        </Text>
        
        {/* Sayaç - tracking-tighter (Config dosyasında tanımlı olmalı) */}
        <Text className="text-8xl font-black text-[#EADDcF] tracking-tighter font-variant-numeric tabular-nums">
            {formatTime(seconds)}
        </Text>
      </View>

      {/* Motivasyon Sözü */}
      <View className="absolute bottom-32 px-10">
        <Text className="text-[#8B7E74]/60 text-center italic font-medium leading-6">
            "Odaklanmak, hayır diyebilme sanatıdır."
        </Text>
      </View>

      {/* Bitir Butonu */}
      <TouchableOpacity 
        onPress={handleFinish}
        className="absolute bottom-10 bg-[#FEF9E7]/10 px-8 py-4 rounded-full border border-[#D4C5B9]/10 active:bg-[#FEF9E7]/20"
      >
        <Text className="text-[#EADDcF] font-bold text-lg tracking-widest">BİTİR</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}