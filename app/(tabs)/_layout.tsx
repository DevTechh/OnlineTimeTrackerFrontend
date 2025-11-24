import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../../src/context/ThemeContext'; // Tema context'i çağırdık

export default function TabLayout() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
            // ZEMİN RENGİ: Dark -> Koyu Deri (#342A25), Light -> Krem (#FEF9E7)
            backgroundColor: isDark ? '#342A25' : '#FEF9E7', 
            
            // ÜST ÇİZGİ: Dark -> Koyu Kahve (#4E4039), Light -> Sütlü Kahve (#D4C5B9)
            borderTopWidth: 1,
            borderTopColor: isDark ? '#4E4039' : '#D4C5B9',
            
            elevation: 0,
            shadowOpacity: 0,
            height: 65,
            paddingBottom: 10,
            paddingTop: 10,
        },
        // İKON RENKLERİ
        tabBarActiveTintColor: '#D97B56', // Aktif: Yanık Turuncu (Her iki modda aynı)
        tabBarInactiveTintColor: isDark ? '#9C8F85' : '#8B7E74', // Pasif: Dark -> Soluk Bej, Light -> Gri
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => <MaterialIcons name={focused ? "person" : "person-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Topluluk',
          tabBarIcon: ({ color, focused }) => <MaterialIcons name={focused ? "people" : "people-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Gruplar',
          tabBarIcon: ({ color, focused }) => <MaterialIcons name={focused ? "chat-bubble" : "chat-bubble-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Odak',
          tabBarIcon: ({ color, focused }) => <MaterialIcons name={focused ? "hourglass-full" : "hourglass-empty"} size={26} color={color} />,
        }}
      />
      
      <Tabs.Screen name="explore" options={{ href: null }} /> 
    </Tabs>
  );
}