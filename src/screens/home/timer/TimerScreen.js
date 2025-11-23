import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TimerScreen() {
  const [mode, setMode] = useState('Timer');
  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('25');
  const [swTime, setSwTime] = useState(0);
  const [swActive, setSwActive] = useState(false);
  const [savedTimes, setSavedTimes] = useState([]);
  const [saveModalVisible, setSaveModalVisible] = useState(false);
  const [saveName, setSaveName] = useState("");

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) interval = setInterval(() => setSeconds(s => s - 1), 1000);
    else if (seconds === 0 && isActive) setIsActive(false);
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
    const totalSec = parseInt(inputMinutes) * 60;
    if(totalSec) { setSeconds(totalSec); setIsActive(true); }
  };

  const saveTime = () => {
      if(saveName) {
        setSavedTimes([...savedTimes, { name: saveName, time: mode === 'Timer' ? formatTime(seconds) : formatStopwatch(swTime), mode }]);
        setSaveModalVisible(false);
        setSaveName("");
      }
  };

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top']}>
      {/* Mode Switcher */}
      <View className="bg-surface mx-8 mt-6 p-2 rounded-3xl flex-row border border-light/60 shadow-sm">
         <TouchableOpacity 
            onPress={() => setMode('Timer')} 
            className={`flex-1 py-4 items-center rounded-2xl transition-all ${mode === 'Timer' ? 'bg-accent shadow-md' : ''}`}
         >
            <Text className={`font-bold text-lg ${mode === 'Timer' ? 'text-surface' : 'text-medium'}`}>Odak (Timer)</Text>
         </TouchableOpacity>
         <TouchableOpacity 
            onPress={() => setMode('Stopwatch')} 
            className={`flex-1 py-4 items-center rounded-2xl transition-all ${mode === 'Stopwatch' ? 'bg-accent shadow-md' : ''}`}
         >
            <Text className={`font-bold text-lg ${mode === 'Stopwatch' ? 'text-surface' : 'text-medium'}`}>Kronometre</Text>
         </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">
        {mode === 'Timer' ? (
          <>
            {isActive ? (
              <View className="items-center">
                 {/* Retro Timer Çemberi */}
                 <View className="w-72 h-72 rounded-full border-4 border-light/30 items-center justify-center mb-16 bg-surface shadow-lg">
                    <View className="w-64 h-64 rounded-full border-[12px] border-accent items-center justify-center bg-page/50">
                        <Text className="text-7xl font-bold text-dark tracking-tighter tabular-nums">{formatTime(seconds)}</Text>
                        <Text className="text-mustard font-bold mt-2 uppercase tracking-widest">odaklan</Text>
                    </View>
                 </View>
                 
                 {/* Kontrol Butonları */}
                 <View className="flex-row gap-8">
                    <TouchableOpacity onPress={() => setIsActive(false)} className="bg-surface border-2 border-accent w-24 h-24 rounded-full items-center justify-center shadow-md">
                        <MaterialIcons name="pause" size={36} color="#D97B56" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setIsActive(false); setSeconds(0);}} className="bg-danger w-24 h-24 rounded-full items-center justify-center shadow-md border-2 border-danger/80">
                        <MaterialIcons name="stop" size={36} color="#FEF9E7" />
                    </TouchableOpacity>
                 </View>
              </View>
            ) : (
              <View className="w-full px-12 items-center">
                <Text className="text-medium mb-6 font-bold uppercase tracking-widest text-lg">Süre Ayarla (Dakika)</Text>
                <TextInput 
                    keyboardType="numeric" 
                    value={inputMinutes} 
                    onChangeText={setInputMinutes} 
                    // Düzeltme: rounded-4xl yerine rounded-3xl kullanıldı
                    className="bg-surface w-full h-40 text-center text-8xl font-bold text-dark rounded-3xl border-2 border-light mb-12 shadow-sm text-accent"
                    selectionColor="#D97B56"
                />
                <TouchableOpacity onPress={startTimer} className="bg-accent w-full py-6 rounded-3xl items-center shadow-lg border-b-4 border-dark/20 active:border-b-0 active:translate-y-1 transition-all">
                    <Text className="text-surface font-black text-2xl tracking-wider">BAŞLAT</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          // Kronometre Ekranı
          <View className="items-center w-full px-10">
             {/* Düzeltme: rounded-4xl yerine rounded-3xl kullanıldı */}
             <View className="bg-surface p-10 rounded-3xl border-2 border-light shadow-sm mb-16 w-full items-center">
                <Text className="text-7xl font-mono font-bold text-dark tracking-tighter tabular-nums">{formatStopwatch(swTime)}</Text>
             </View>
             
             <View className="flex-row w-full justify-around px-4 mb-14 gap-6">
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
             
             <TouchableOpacity onPress={() => setSaveModalVisible(true)} className="flex-row items-center bg-mustard px-8 py-4 rounded-full shadow-md border-b-2 border-dark/10">
                 <MaterialIcons name="save-alt" size={24} color="#3E322B" />
                 <Text className="text-dark font-bold ml-3 text-lg">Süreyi Kaydet</Text>
             </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Kaydetme Modalı */}
      <Modal visible={saveModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-dark/30">
            {/* Düzeltme: rounded-t-4xl yerine rounded-t-3xl kullanıldı */}
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