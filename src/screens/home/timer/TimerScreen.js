import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TimerScreen() {
  const [mode, setMode] = useState('Timer');
  
  // --- Timer State ---
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false); // Sayaç çalışıyor mu?
  const [isSessionActive, setIsSessionActive] = useState(false); // Sayaç ekranı açık mı?
  
  // --- Inputs ---
  const [inputMinutes, setInputMinutes] = useState('25');
  const [inputSeconds, setInputSeconds] = useState('00');

  // --- Stopwatch State ---
  const [swTime, setSwTime] = useState(0);
  const [swActive, setSwActive] = useState(false);

  // --- Common State (Kayıt vb.) ---
  const [savedTimes, setSavedTimes] = useState([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [saveName, setSaveName] = useState("");

  // --- Timer Logic (Sayaç Mantığı) ---
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0 && isActive) {
      // Süre Bittiğinde
      setIsActive(false);
      setIsSessionActive(false); // Ekranı kapat
      Alert.alert("Süre Doldu!", "Odaklanma süreniz tamamlandı.");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // --- Stopwatch Logic (Kronometre Mantığı) ---
  useEffect(() => {
    let interval = null;
    if (swActive) {
      interval = setInterval(() => {
        setSwTime(t => t + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [swActive]);

  // --- Formatlayıcılar ---
  const formatTime = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatStopwatch = (ms) => {
     const m = Math.floor((ms % 3600000) / 60000);
     const s = Math.floor((ms % 60000) / 1000);
     const msec = Math.floor((ms % 1000) / 10);
     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}:${msec.toString().padStart(2, '0')}`;
  };

  // --- Timer Fonksiyonları ---
  const startTimer = () => {
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    const totalSec = (mins * 60) + secs;

    if(totalSec > 0) { 
        setSeconds(totalSec); 
        setIsSessionActive(true); 
        setIsActive(true); 
    } else {
        Alert.alert("Hata", "Lütfen geçerli bir süre girin.");
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    setIsSessionActive(false);
    setSeconds(0);
  };

  // --- Kayıt Fonksiyonları ---
  const saveTime = () => {
      if (saveName.trim().length === 0) {
          Alert.alert("Hata", "Lütfen kaydetmek için bir isim girin.");
          return;
      }

      const newRecord = {
          id: Date.now().toString(),
          name: saveName,
          // Sadece kronometre modunda kayıt yapıyoruz
          time: formatStopwatch(swTime), 
          mode: 'Stopwatch',
          date: new Date().toLocaleDateString('tr-TR')
      };

      setSavedTimes([newRecord, ...savedTimes]);
      setSaveModalVisible(false);
      setSaveName("");
      Alert.alert("Başarılı", "Süreniz kaydedildi!");
  };

  const deleteRecord = (id) => {
      setSavedTimes(savedTimes.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      
      {/* --- ÜST MODE SWITCHER --- */}
      <View className="bg-surface mx-8 mt-6 p-2 rounded-3xl flex-row border border-light/60 shadow-sm z-10">
         <TouchableOpacity 
            onPress={() => setMode('Timer')} 
            className={`flex-1 py-4 items-center rounded-2xl transition-all ${mode === 'Timer' ? 'bg-accent shadow-md' : ''}`}
         >
            <Text className={`font-bold text-lg ${mode === 'Timer' ? 'text-surface' : 'text-medium'}`}>Odak</Text>
         </TouchableOpacity>
         <TouchableOpacity 
            onPress={() => setMode('Stopwatch')} 
            className={`flex-1 py-4 items-center rounded-2xl transition-all ${mode === 'Stopwatch' ? 'bg-accent shadow-md' : ''}`}
         >
            <Text className={`font-bold text-lg ${mode === 'Stopwatch' ? 'text-surface' : 'text-medium'}`}>Kronometre</Text>
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 40 }}>
        
        {/* ================= TIMER MODU ================= */}
        {mode === 'Timer' ? (
          <>
            {/* Eğer oturum aktifse (Sayaç çalışıyor veya Duraklatıldı) */}
            {isSessionActive ? (
              <View className="items-center w-full">
                 {/* Timer Görseli */}
                 <View className="w-72 h-72 rounded-full border-4 border-light/30 items-center justify-center mb-12 bg-surface shadow-lg">
                    <View className="w-64 h-64 rounded-full border-[12px] border-accent items-center justify-center bg-page/50">
                        <Text className="text-7xl font-bold text-dark tracking-tighter tabular-nums">{formatTime(seconds)}</Text>
                        <Text className="text-mustard font-bold mt-2 uppercase tracking-widest">
                            {isActive ? 'odaklan' : 'duraklatıldı'}
                        </Text>
                    </View>
                 </View>
                 
                 {/* Kontrol Butonları */}
                 <View className="flex-row gap-8 mb-10">
                    <TouchableOpacity 
                        onPress={() => setIsActive(!isActive)} 
                        className={`w-24 h-24 rounded-full items-center justify-center shadow-md border-2 ${isActive ? 'bg-surface border-accent' : 'bg-accent border-transparent'}`}
                    >
                        <MaterialIcons name={isActive ? "pause" : "play-arrow"} size={36} color={isActive ? "#D97B56" : "#FEF9E7"} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={stopTimer} className="bg-danger w-24 h-24 rounded-full items-center justify-center shadow-md border-2 border-danger/80">
                        <MaterialIcons name="stop" size={36} color="#FEF9E7" />
                    </TouchableOpacity>
                 </View>
              </View>
            ) : (
              // --- Giriş Ekranı (Süre Ayarlama) ---
              <View className="w-full px-8 items-center">
                <Text className="text-medium mb-6 font-bold uppercase tracking-widest text-lg">Süre Ayarla</Text>
                
                <View className="flex-row items-center mb-12 gap-4">
                    {/* Dakika Input */}
                    <View className="items-center">
                        <Text className="text-medium mb-2 font-bold">DK</Text>
                        <TextInput 
                            keyboardType="numeric" 
                            value={inputMinutes} 
                            onChangeText={setInputMinutes} 
                            maxLength={2}
                            className="bg-surface w-32 h-40 text-center text-7xl font-bold text-dark rounded-3xl border-2 border-light shadow-sm text-accent"
                            selectionColor="#D97B56"
                        />
                    </View>
                    
                    <Text className="text-4xl font-black text-light mb-6">:</Text>

                    {/* Saniye Input */}
                    <View className="items-center">
                        <Text className="text-medium mb-2 font-bold">SN</Text>
                        <TextInput 
                            keyboardType="numeric" 
                            value={inputSeconds} 
                            onChangeText={setInputSeconds} 
                            maxLength={2}
                            className="bg-surface w-32 h-40 text-center text-7xl font-bold text-dark rounded-3xl border-2 border-light shadow-sm text-accent"
                            selectionColor="#D97B56"
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={startTimer} 
                    className="bg-accent w-full py-6 rounded-3xl items-center shadow-lg border-b-4 border-dark/20 active:border-b-0 active:translate-y-1 transition-all"
                >
                    <Text className="text-surface font-black text-2xl tracking-wide" numberOfLines={1}>BAŞLAT</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          
          /* ================= KRONOMETRE MODU ================= */
          <View className="items-center w-full px-8">
             <View className="bg-surface p-6 rounded-3xl border-2 border-light shadow-sm mb-12 w-full items-center">
                <Text className="text-6xl font-mono font-bold text-dark tracking-tighter tabular-nums">
                    {formatStopwatch(swTime)}
                </Text>
             </View>
             
             <View className="flex-row w-full justify-around px-2 mb-12 gap-6">
               <TouchableOpacity onPress={() => {setSwActive(false); setSwTime(0);}} className="bg-surface border-2 border-medium w-24 h-24 rounded-full items-center justify-center shadow-sm">
                 <Text className="text-medium font-bold text-lg">Sıfırla</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                onPress={() => setSwActive(!swActive)} 
                className={`w-28 h-28 rounded-full items-center justify-center shadow-lg border-b-4 border-dark/20 active:border-b-0 active:translate-y-1 ${swActive ? 'bg-danger' : 'bg-green'}`}
               >
                 <Text className="text-surface font-black text-xl">{swActive ? 'DUR' : 'BAŞLA'}</Text>
               </TouchableOpacity>
             </View>
             
             <TouchableOpacity onPress={() => setSaveModalVisible(true)} className="flex-row items-center bg-mustard px-8 py-4 rounded-full shadow-md border-b-2 border-dark/10 mb-8">
                 <MaterialIcons name="save-alt" size={24} color="#3E322B" />
                 <Text className="text-dark font-bold ml-3 text-lg">Süreyi Kaydet</Text>
             </TouchableOpacity>
          </View>
        )}

        {/* --- KAYDEDİLENLER LİSTESİ (Sadece Kronometre Modunda Görünür) --- */}
        {mode === 'Stopwatch' && (
            <View className="w-full px-6 pb-10 mt-4">
                <View className="flex-row items-center mb-4">
                    <View className="h-[1px] flex-1 bg-light/50" />
                    <Text className="text-medium text-xs font-bold uppercase tracking-widest mx-4">Kaydedilenler</Text>
                    <View className="h-[1px] flex-1 bg-light/50" />
                </View>

                {savedTimes.length === 0 ? (
                    <Text className="text-center text-medium/50 italic">Henüz kayıtlı süre yok.</Text>
                ) : (
                    savedTimes.map((item) => (
                        <View key={item.id} className="bg-surface p-4 mb-2 rounded-2xl border border-light/40 flex-row justify-between items-center shadow-sm">
                            <View>
                                <Text className="text-dark font-bold text-lg">{item.name}</Text>
                                <View className="flex-row items-center">
                                    <MaterialIcons name="watch-later" size={14} color="#8B7E74" />
                                    <Text className="text-medium text-xs ml-1">{item.date}</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Text className="text-accent font-mono font-bold text-xl mr-4">{item.time}</Text>
                                <TouchableOpacity onPress={() => deleteRecord(item.id)}>
                                    <MaterialIcons name="close" size={20} color="#C8553D" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </View>
        )}

      </ScrollView>

      {/* --- KAYDETME MODALI --- */}
      <Modal visible={saveModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-dark/30">
            <View className="bg-surface p-8 rounded-t-3xl h-1/2 border-t-2 border-light">
                <Text className="text-3xl font-bold mb-8 text-dark text-center">Süreyi Kaydet</Text>
                <TextInput 
                    placeholder="Örn: Akşam Çalışması" 
                    placeholderTextColor="#8B7E74"
                    value={saveName} 
                    onChangeText={setSaveName} 
                    className="bg-page border-2 border-light rounded-3xl p-6 mb-8 text-xl text-dark font-bold"
                    autoFocus
                />
                <TouchableOpacity onPress={saveTime} className="bg-accent p-5 rounded-3xl items-center mb-4 shadow-md">
                    <Text className="text-surface font-bold text-xl">Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSaveModalVisible(false)} className="items-center py-4">
                    <Text className="text-medium font-bold text-lg">Vazgeç</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}