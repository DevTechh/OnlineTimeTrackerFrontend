import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
            backgroundColor: '#FFFFFF', // Beyaz arka plan
            borderTopWidth: 0,
            elevation: 0, // Android gölgesini kaldır
            shadowOpacity: 0, // iOS gölgesini kaldır
            height: 60,
            paddingBottom: 10
        },
        tabBarActiveTintColor: '#D4A373', // Aktif ikon (Toprak rengi)
        tabBarInactiveTintColor: '#C4C4C4', // Pasif ikon (Açık gri)
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Topluluk',
          tabBarIcon: ({ color }) => <MaterialIcons name="people" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Gruplar',
          tabBarIcon: ({ color }) => <MaterialIcons name="chat-bubble" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Odak',
          tabBarIcon: ({ color }) => <MaterialIcons name="hourglass-top" size={26} color={color} />,
        }}
      />
      
      <Tabs.Screen name="explore" options={{ href: null }} /> 
    </Tabs>
  );
}