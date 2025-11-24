import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../src/context/ThemeContext'; // Tema Bağlantısı

export default function TimerScreen() {
  const { isDark } = useTheme(); // Tema Durumu
  const [mode, setMode] = useState('Timer');
  
  // --- State Tanımları ---
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');
  const [inputSeconds, setInputSeconds] = useState('00');
  const [swTime, setSwTime] = useState(0);
  const [swActive, setSwActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [saveName, setSaveName] = useState("");

  // --- RENK PALETİ (Garanti Yöntem) ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',       // Espresso / Krem
    surface: isDark ? '#342A25' : '#FEF9E7',  // Koyu Deri / Açık Krem
    textMain: isDark ? '#EADDcF' : '#3E322B', // Eski Kağıt / Kahve
    textSec: isDark ? '#9C8F85' : '#8B7E74',  // Kül / Vizon
    border: isDark ? '#4E4039' : '#D4C5B9',   // Koyu Çizgi / Açık Çizgi
    inputBg: isDark ? '#1F1B18' : '#F0EAD6',  // Input Zemini
    accent: '#D97B56',                        // Yanık Turuncu
    mustard: '#EBBAB9',                       // Gül Kurusu
    yellow: '#F2CC8F',                        // Hardal
    green: '#83A686',                         // Zeytin
    danger: '#C8553D',                        // Kiremit
  };

  // --- Logic ---
  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      setIsSessionActive(false);
      Alert.alert("Süre Doldu!", "Odaklanma süreniz tamamlandı.");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    let interval = null;
    if (swActive) interval = setInterval(() => setSwTime(t => t + 10), 10);
    return () => clearInterval(interval);
  }, [swActive]);

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

  const startTimer = () => {
    const mins = parseInt(inputMinutes) || 0;
    const secs = parseInt(inputSeconds) || 0;
    const totalSec = (mins * 60) + secs;
    if(totalSec > 0) { setSeconds(totalSec); setIsSessionActive(true); setIsActive(true); }
    else { Alert.alert("Hata", "Lütfen geçerli bir süre girin."); }
  };

  const stopTimer = () => { setIsActive(false); setIsSessionActive(false); setSeconds(0); };

  const saveTime = () => {
      if (saveName.trim().length === 0) { Alert.alert("Hata", "İsim girin."); return; }
      const newRecord = {
          id: Date.now().toString(),
          name: saveName,
          time: mode === 'Timer' ? formatTime(seconds) : formatStopwatch(swTime),
          mode: mode,
          date: new Date().toLocaleDateString('tr-TR')
      };
      setSavedTimes([newRecord, ...savedTimes]);
      setSaveModalVisible(false);
      setSaveName("");
      Alert.alert("Başarılı", "Kaydedildi!");
  };

  const deleteRecord = (id) => setSavedTimes(savedTimes.filter(item => item.id !== id));

  return (
    <SafeAreaView 
        key={isDark ? 'dark' : 'light'}
        style={{ flex: 1, backgroundColor: colors.bg }} 
        edges={['top']}
    >
      
      {/* --- Mode Switcher --- */}
      <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="mx-8 mt-6 p-2 rounded-3xl flex-row border shadow-sm z-10">
         <TouchableOpacity 
            onPress={() => setMode('Timer')} 
            style={mode === 'Timer' ? { backgroundColor: colors.accent } : {}}
            className={`flex-1 py-4 items-center rounded-2xl transition-all ${mode === 'Timer' ? 'shadow-md' : ''}`}
         >
            <Text style={{ color: mode === 'Timer' ? colors.surface : colors.textSec }} className="font-bold text-lg">Odak</Text>
         </TouchableOpacity>
         <TouchableOpacity 
            onPress={() => setMode('Stopwatch')} 
            style={mode === 'Stopwatch' ? { backgroundColor: colors.accent } : {}}
            className={`flex-1 py-4 items-center rounded-2xl transition-all ${mode === 'Stopwatch' ? 'shadow-md' : ''}`}
         >
            <Text style={{ color: mode === 'Stopwatch' ? colors.surface : colors.textSec }} className="font-bold text-lg">Kronometre</Text>
         </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: 40 }}>
        
        {/* ================= TIMER MODU ================= */}
        {mode === 'Timer' ? (
          <>
            {isSessionActive ? (
              <View className="items-center w-full">
                 <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="w-72 h-72 rounded-full border-4 items-center justify-center mb-12 shadow-lg">
                    <View style={{ backgroundColor: colors.bg, borderColor: colors.accent }} className="w-64 h-64 rounded-full border-[12px] items-center justify-center">
                        <Text style={{ color: colors.textMain }} className="text-7xl font-bold tracking-tighter tabular-nums">{formatTime(seconds)}</Text>
                        <Text style={{ color: colors.mustard }} className="font-bold mt-2 uppercase tracking-widest">
                            {isActive ? 'odaklan' : 'duraklatıldı'}
                        </Text>
                    </View>
                 </View>
                 
                 <View className="flex-row gap-8 mb-10">
                    <TouchableOpacity 
                        onPress={() => setIsActive(!isActive)} 
                        style={{ backgroundColor: isActive ? colors.surface : colors.accent, borderColor: colors.accent }}
                        className="w-24 h-24 rounded-full items-center justify-center shadow-md border-2"
                    >
                        <MaterialIcons name={isActive ? "pause" : "play-arrow"} size={36} color={isActive ? colors.accent : colors.surface} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={stopTimer} style={{ backgroundColor: colors.danger, borderColor: '#FFFFFF50' }} className="w-24 h-24 rounded-full items-center justify-center shadow-md border-2">
                        <MaterialIcons name="stop" size={36} color="#FEF9E7" />
                    </TouchableOpacity>
                 </View>
              </View>
            ) : (
              <View className="w-full px-8 items-center">
                <Text style={{ color: colors.textSec }} className="mb-6 font-bold uppercase tracking-widest text-lg">Süre Ayarla</Text>
                
                <View className="flex-row items-center mb-12 gap-4">
                    <View className="items-center">
                        <Text style={{ color: colors.textSec }} className="mb-2 font-bold">DK</Text>
                        <TextInput 
                            keyboardType="numeric" 
                            value={inputMinutes} 
                            onChangeText={setInputMinutes} 
                            maxLength={2}
                            style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.textMain }}
                            className="w-32 h-40 text-center text-7xl font-bold rounded-3xl border-2 shadow-sm"
                            selectionColor={colors.accent}
                        />
                    </View>
                    
                    <Text style={{ color: colors.border }} className="text-4xl font-black mb-6">:</Text>

                    <View className="items-center">
                        <Text style={{ color: colors.textSec }} className="mb-2 font-bold">SN</Text>
                        <TextInput 
                            keyboardType="numeric" 
                            value={inputSeconds} 
                            onChangeText={setInputSeconds} 
                            maxLength={2}
                            style={{ backgroundColor: colors.surface, borderColor: colors.border, color: colors.textMain }}
                            className="w-32 h-40 text-center text-7xl font-bold rounded-3xl border-2 shadow-sm"
                            selectionColor={colors.accent}
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={startTimer} 
                    style={{ backgroundColor: colors.accent, borderColor: '#00000020' }}
                    className="w-full py-6 rounded-3xl items-center shadow-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all"
                >
                    <Text style={{ color: colors.surface }} className="font-black text-2xl tracking-wide" numberOfLines={1}>BAŞLAT</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          
          /* ================= KRONOMETRE MODU ================= */
          <View className="items-center w-full px-8">
             <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-6 rounded-3xl border-2 shadow-sm mb-12 w-full items-center">
                <Text style={{ color: colors.textMain }} className="text-6xl font-mono font-bold tracking-tighter tabular-nums">
                    {formatStopwatch(swTime)}
                </Text>
             </View>
             
             <View className="flex-row w-full justify-around px-2 mb-12 gap-6">
               <TouchableOpacity onPress={() => {setSwActive(false); setSwTime(0);}} style={{ backgroundColor: colors.surface, borderColor: colors.textSec }} className="border-2 w-24 h-24 rounded-full items-center justify-center shadow-sm">
                 <Text style={{ color: colors.textSec }} className="font-bold text-lg">Sıfırla</Text>
               </TouchableOpacity>
               
               <TouchableOpacity 
                onPress={() => setSwActive(!swActive)} 
                style={{ backgroundColor: swActive ? colors.danger : colors.green, borderColor: '#00000020' }}
                className="w-28 h-28 rounded-full items-center justify-center shadow-lg border-b-4 active:border-b-0 active:translate-y-1"
               >
                 <Text style={{ color: '#FEF9E7' }} className="font-black text-xl">{swActive ? 'DUR' : 'BAŞLA'}</Text>
               </TouchableOpacity>
             </View>
             
             <TouchableOpacity onPress={() => setSaveModalVisible(true)} style={{ backgroundColor: colors.mustard, borderColor: '#00000010' }} className="flex-row items-center px-8 py-4 rounded-full shadow-md border-b-2 mb-8">
                 <MaterialIcons name="save-alt" size={24} color="#3E322B" />
                 <Text className="text-[#3E322B] font-bold ml-3 text-lg">Süreyi Kaydet</Text>
             </TouchableOpacity>
          </View>
        )}

        {/* --- KAYDEDİLENLER LİSTESİ (Sadece Kronometre) --- */}
        {mode === 'Stopwatch' && (
            <View className="w-full px-6 pb-10 mt-4">
                <View className="flex-row items-center mb-4">
                    <View style={{ backgroundColor: colors.border }} className="h-[1px] flex-1" />
                    <Text style={{ color: colors.textSec }} className="text-xs font-bold uppercase tracking-widest mx-4">Kaydedilenler</Text>
                    <View style={{ backgroundColor: colors.border }} className="h-[1px] flex-1" />
                </View>

                {savedTimes.length === 0 ? (
                    <Text style={{ color: colors.textSec }} className="text-center italic opacity-50">Henüz kayıtlı süre yok.</Text>
                ) : (
                    savedTimes.map((item) => (
                        <View key={item.id} style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-4 mb-2 rounded-2xl border flex-row justify-between items-center shadow-sm">
                            <View>
                                <Text style={{ color: colors.textMain }} className="font-bold text-lg">{item.name}</Text>
                                <View className="flex-row items-center">
                                    <MaterialIcons name="watch-later" size={14} color={colors.textSec} />
                                    <Text style={{ color: colors.textSec }} className="text-xs ml-1">{item.date}</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center">
                                <Text style={{ color: colors.accent }} className="font-mono font-bold text-xl mr-4">{item.time}</Text>
                                <TouchableOpacity onPress={() => deleteRecord(item.id)}>
                                    <MaterialIcons name="close" size={20} color={colors.danger} />
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
        <View className="flex-1 justify-end bg-black/50">
            <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="p-8 rounded-t-3xl h-1/2 border-t-2">
                <Text style={{ color: colors.textMain }} className="text-3xl font-bold mb-8 text-center">Süreyi Kaydet</Text>
                <TextInput 
                    style={{ backgroundColor: colors.inputBg, borderColor: colors.border, color: colors.textMain }}
                    placeholder="Örn: Akşam Çalışması" 
                    placeholderTextColor={colors.textSec}
                    value={saveName} 
                    onChangeText={setSaveName} 
                    className="border-2 rounded-3xl p-6 mb-8 text-xl font-bold"
                    autoFocus
                />
                <TouchableOpacity onPress={saveTime} style={{ backgroundColor: colors.accent }} className="p-5 rounded-3xl items-center mb-4 shadow-md">
                    <Text style={{ color: colors.surface }} className="font-bold text-xl">Kaydet</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSaveModalVisible(false)} className="items-center py-4">
                    <Text style={{ color: colors.textSec }} className="font-bold text-lg">Vazgeç</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}