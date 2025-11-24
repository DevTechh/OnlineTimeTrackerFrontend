import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function FlowScreen() {
  const router = useRouter(); 

  return (
    <View className="flex-1 bg-page justify-center items-center px-8">
      
      {/* Dekoratif Arka Plan Daireleri */}
      <View className="absolute items-center justify-center">
         <View className="w-96 h-96 rounded-full border border-light/30 opacity-50" />
         <View className="w-[500px] h-[500px] rounded-full border border-light/20 absolute opacity-30" />
      </View>

      {/* Ana İkon Alanı */}
      <View className="w-64 h-64 bg-surface rounded-full items-center justify-center shadow-sm border-4 border-light/40 mb-10">
        <View className="w-52 h-52 bg-page rounded-full items-center justify-center border-2 border-accent/20">
            <View className="w-40 h-40 bg-accent/10 rounded-full items-center justify-center border border-accent/30">
                <MaterialIcons name="waves" size={80} color="#D97B56" />
            </View>
        </View>
      </View>

      {/* Başlık ve Açıklama */}
      <Text className="text-6xl font-black text-dark tracking-tighter mb-2">FLOW</Text>
      
      <Text className="text-medium font-bold uppercase tracking-widest mb-8 text-sm">
        Derin Odak Modu
      </Text>
      
      <Text className="text-dark/70 text-center leading-7 text-lg mb-12 font-medium px-4">
        Dış dünyayı sessize al.{"\n"}
        Sadece sen ve hedeflerin.{"\n"}
        Hazır olduğunda akışa gir.
      </Text>

      {/* Yönlendirme Butonu (Router.push kullanıldı) */}
      <TouchableOpacity 
        className="bg-dark w-3/4 py-4 rounded-3xl items-center shadow-xl border-b-4 border-medium/30 active:border-b-0 active:translate-y-1"
        onPress={() => router.push('/flow/active')} 
      >
        <Text className="text-surface font-black text-lg tracking-widest">AKIŞA GİR</Text>
      </TouchableOpacity>

      {/* Alt Bilgi */}
      <View className="flex-row items-center mt-8 gap-2 opacity-60">
        <MaterialIcons name="do-not-disturb-on" size={18} color="#8B7E74" />
        <Text className="text-medium text-xs font-bold">Rahatsız Etme Modunu Önerir</Text>
      </View>

    </View>
  );
}