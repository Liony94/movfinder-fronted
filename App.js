import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import Films from './components/Films';
import Login from './components/Login';
import Profile from './components/Profile';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création du Stack Navigator
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mov\'Finder' }} />
      <Stack.Screen name="Films" component={Films} options={{ title: 'Films' }} />
    </Stack.Navigator>
  );
}

// Création du Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('@token');
      if (token) {
        setIsAuthenticated(true);
      }
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Films" component={Films} />
        {isAuthenticated ? (
          <Tab.Screen name="Profil" component={Profile} />
        ) : (
          <Tab.Screen name="Connexion" component={Login} />
        )}
        {/* Vous pouvez ajouter d'autres onglets ici si nécessaire */}
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
