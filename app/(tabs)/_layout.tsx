import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
            backgroundColor: '#FEF9E7', // Yeni 'surface' rengi
            borderTopWidth: 1,
            borderTopColor: '#D4C5B9', // Yeni 'light' rengi
            elevation: 0,
            shadowOpacity: 0,
            height: 65,
            paddingBottom: 10,
            paddingTop: 10,
        },
        // Aktif renk: Yanık Turuncu, Pasif renk: Sıcak Gri
        tabBarActiveTintColor: '#D97B56', 
        tabBarInactiveTintColor: '#8B7E74', 
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