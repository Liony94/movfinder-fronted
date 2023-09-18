import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const Profile = () => {
  const [user, setUser] = useState(null);

  // Simulation d'un appel API pour récupérer les données de l'utilisateur
  useEffect(() => {
    fetch('https://127.0.0.1:8000/api/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer VOTRE_JWT_ICI`,  // Remplacer par votre token JWT
      },
    })
    .then(response => response.json())
    .then(data => {
      setUser(data);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
  }, []);

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
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.username}</Text>
          </View>
          <View style={{ marginLeft: 'auto' }}>
            <TouchableOpacity style={{ backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Modifier le profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10 }}>
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

        {/* Vous pouvez ajouter ici les derniers films aimés, séries aimées et les matches */}
      </View>
    </ScrollView>
  );
};

export default Profile;
