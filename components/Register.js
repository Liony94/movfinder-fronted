import React, { useState, useRef, useEffect }  from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const navigation = useNavigation();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

        // Mettre à jour l'état d'authentification
        setIsAuthenticated(true);
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.input}
        />
        <Text style={styles.label}>Pseudo</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Pseudo"
          style={styles.input}
        />
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.signupText} onPress={() => navigation.navigate('Connexion')}>
          Vous avez déjà un compte? Connectez-vous
        </Text>
        <Button title="S'inscrire" onPress={handleSubmit} />
        {errors.map((error, index) => (
          <Text key={index} style={styles.errorText}>
            {error.field}: {error.message}
          </Text>
        ))}
      </View>
    </Animated.View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 20,
      padding: 8,
    },
    signupText: {
      textAlign: 'center',
      color: 'blue',
      textDecorationLine: 'underline',
    },    
    errorText: {
      color: 'red',
    },
  });

export default Register;
