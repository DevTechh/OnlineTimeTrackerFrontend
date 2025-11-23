import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FlowScreen from '../flowpanel/FlowScreen';
import ProfileContent from './ProfileContent';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-page" edges={['top', 'left', 'right']}>
      
      {/* DÜZELTME: top-6 yerine top-14 yapıldı. 
          Bu sayede bildirim çubuğunun ve çentiğin (notch) tamamen altında kalacak. 
      */}
      <View className="absolute top-14 right-6 z-50">
         <TouchableOpacity 
            onPress={() => router.push('/modal')}
            className="bg-surface/90 p-3 rounded-full border border-light/60 shadow-sm backdrop-blur-md"
            activeOpacity={0.7}
         >
            <MaterialIcons name="settings" size={26} color="#3E322B" />
         </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        bounces={false}
      >
        <View className="w-screen">
          <ProfileContent />
        </View>
        <View className="w-screen">
          <FlowScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}