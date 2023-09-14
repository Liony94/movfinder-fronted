import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import Films from './components/Films';
import { StatusBar } from 'expo-status-bar';

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
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Films" component={Films} />
        {/* Vous pouvez ajouter d'autres onglets ici si nécessaire */}
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
