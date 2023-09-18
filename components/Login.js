import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        console.log('User registered successfully', data);

        // Stocker le token pour l'utiliser plus tard
        await AsyncStorage.setItem('@token', data.token);
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <Text>Pseudo</Text>
      <TextInput value={username} onChangeText={setUsername} placeholder="Pseudo" />
      <Text>Mot de passe</Text>
      <TextInput value={password} onChangeText={setPassword} placeholder="Mot de passe" secureTextEntry />
      <Button title="S'inscrire" onPress={handleSubmit} />
      {errors.map((error, index) => (
        <Text key={index}>{error.field}: {error.message}</Text>
      ))}
    </View>
  );
};

export default Login;
