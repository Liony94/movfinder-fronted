import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation, setIsAuthenticated }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        setIsAuthenticated(false);
        navigation.navigate('Connexion');
        return;
      }

      try {
        const response = await fetch('https://127.0.0.1:8000/api/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          await AsyncStorage.removeItem('@token');
          setIsAuthenticated(false);
          navigation.navigate('Connexion');
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@token');
    setIsAuthenticated(false);
    navigation.navigate('Connexion');
  };

  if (!user) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Image 
            source={{ uri: user.profileImage }} 
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.email}</Text>
          <View style={{ marginLeft: 'auto' }}>
            <TouchableOpacity style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }} onPress={() => {/* Ajoutez une action de modification de profil ici */}}>
              <Text style={{ color: 'white' }}>Modifier le profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10 }} onPress={handleLogout}>
              <Text style={{ color: 'white' }}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Mes Stats</Text>
          <Text>Films aimés : {user.numberOfLikedMovies}</Text>
          <Text>Séries aimées : {user.numberOfLikedSeries}</Text>
          <Text>Amis : {user.numberOfFriends}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
