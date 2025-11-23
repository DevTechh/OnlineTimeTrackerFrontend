import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CommunityScreen from '../screens/home/community/CommunityScreen';
import GroupsScreen from '../screens/home/groups/GroupsScreen';
import ProfileScreen from '../screens/home/profile/ProfileScreen';
import TimerScreen from '../screens/home/timer/TimerScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator (Flutter'daki BottomNavigationBar)
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#D6ACD0' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
      }}
    >
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Groups" 
        component={GroupsScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialIcons name="chat" size={24} color={color} /> }}
      />
      <Tab.Screen 
        name="Timer" 
        component={TimerScreen} 
        options={{ tabBarIcon: ({ color }) => <MaterialIcons name="timer" size={24} color={color} /> }}
      />
    </Tab.Navigator>
  );
}

// Drawer Navigator (Settings için sağdan açılan menü)
function DrawerGroup() {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
        headerShown: false, 
        drawerPosition: 'right' // Sağdan açılması için
      }}
      drawerContent={(props) => <SettingsScreen {...props} />}
    >
      <Drawer.Screen name="HomeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  );
}

// Main Stack (Login -> Home)
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={DrawerGroup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}