import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import Films from './components/Films';
import Register from './components/Register';
import Profile from './components/Profile';
import Login from './components/Login';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Création du Stack Navigator
const Stack = createStackNavigator();

function AuthStack({ setIsAuthenticated }) {
  return (
    <Stack.Navigator initialRouteName="Inscription" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inscription">
        {(props) => <Register {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
      <Stack.Screen name="Connexion">
        {(props) => <Login {...props} setIsAuthenticated={setIsAuthenticated} />}
      </Stack.Screen>
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
        // Vérifiez la validité du token avec votre API
        try {
          const response = await fetch('https://127.0.0.1:8000/api/verify_token', {  // Mettez votre propre endpoint
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            // Le token n'est pas valide, le supprimer
            await AsyncStorage.removeItem('@token');
          }
        } catch (error) {
          console.error('An error occurred', error);
        }
      }
    };

    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Films" component={Films} />
        {isAuthenticated ? (
          <Tab.Screen name="Profil">
            {(props) => <Profile {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Tab.Screen>
        ) : (
           <Tab.Screen name="Auth" options={{ title: "Connexion / Inscription" }}>
            {(props) => <AuthStack {...props} setIsAuthenticated={setIsAuthenticated} />}
          </Tab.Screen>
        )}
        {/* Vous pouvez ajouter d'autres onglets ici si nécessaire */}
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
