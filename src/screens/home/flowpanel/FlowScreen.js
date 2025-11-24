import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../src/context/ThemeContext';

export default function FlowScreen() {
  const router = useRouter(); 
  const { isDark } = useTheme();

  // --- RENK PALETİ ---
  const colors = {
    bg: isDark ? '#231E1A' : '#F0EAD6',
    surface: isDark ? '#342A25' : '#FEF9E7',
    textMain: isDark ? '#EADDcF' : '#3E322B',
    textSec: isDark ? '#9C8F85' : '#8B7E74',
    border: isDark ? '#4E4039' : '#D4C5B9',
    accent: '#D97B56',
    buttonBg: isDark ? '#342A25' : '#3E322B', // Koyu modda buton biraz daha açık
  };

  return (
    <View 
        key={isDark ? 'dark' : 'light'}
        style={{ flex: 1, backgroundColor: colors.bg }} 
        className="justify-center items-center px-8"
    >
      
      {/* Dekoratif Daireler */}
      <View className="absolute items-center justify-center">
         <View style={{ borderColor: colors.border }} className="w-96 h-96 rounded-full border opacity-50" />
         <View style={{ borderColor: colors.border }} className="w-[500px] h-[500px] rounded-full border opacity-30" />
      </View>

      {/* Ana İkon */}
      <View style={{ backgroundColor: colors.surface, borderColor: colors.border }} className="w-64 h-64 rounded-full items-center justify-center shadow-sm border-4 mb-10">
        <View style={{ backgroundColor: colors.bg, borderColor: colors.accent + '40' }} className="w-52 h-52 rounded-full items-center justify-center border-2">
            <View style={{ backgroundColor: colors.accent + '20', borderColor: colors.accent + '50' }} className="w-40 h-40 rounded-full items-center justify-center border">
                <MaterialIcons name="waves" size={80} color={colors.accent} />
            </View>
        </View>
      </View>

      {/* Metinler */}
      <Text style={{ color: colors.textMain }} className="text-6xl font-black tracking-tighter mb-2">FLOW</Text>
      
      <Text style={{ color: colors.textSec }} className="font-bold uppercase tracking-widest mb-8 text-sm">
        Derin Odak Modu
      </Text>
      
      <Text style={{ color: colors.textMain }} className="text-center leading-7 text-lg mb-12 font-medium px-4 opacity-80">
        Dış dünyayı sessize al.{"\n"}
        Sadece sen ve hedeflerin.{"\n"}
        Hazır olduğunda akışa gir.
      </Text>

      {/* Buton */}
      <TouchableOpacity 
        style={{ backgroundColor: colors.buttonBg, borderColor: colors.border }}
        className="w-3/4 py-4 rounded-3xl items-center shadow-xl border-b-4 active:border-b-0 active:translate-y-1"
        onPress={() => router.push('/flow/active')} 
      >
        <Text style={{ color: isDark ? colors.textMain : '#FEF9E7' }} className="font-black text-lg tracking-widest">AKIŞA GİR</Text>
      </TouchableOpacity>

      {/* Alt Bilgi */}
      <View className="flex-row items-center mt-8 gap-2 opacity-60">
        <MaterialIcons name="do-not-disturb-on" size={18} color={colors.textSec} />
        <Text style={{ color: colors.textSec }} className="text-xs font-bold">Rahatsız Etme Modunu Önerir</Text>
      </View>

    </View>
  );
}