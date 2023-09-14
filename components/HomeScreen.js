import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Mov'Finder</Text>
      </View>

      <View style={styles.intro}>
        <Text style={styles.introText}>
          Swipe tes films/séries préférés et compare tes likes avec tes amis !
        </Text>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Films')}
      >
        <Text style={styles.buttonText}>C'est parti</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.features}>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>🎬</Text>
          <Text style={styles.featureTitle}>Large sélection</Text>
          <Text style={styles.featureText}>
            Une large variété de films et séries disponibles
          </Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>❤️</Text>
          <Text style={styles.featureTitle}>Sélection Aléatoire</Text>
          <Text style={styles.featureText}>
            La possibilité de sélectionner un film aléatoire parmi ta liste de Likes !
          </Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureIcon}>📱</Text>
          <Text style={styles.featureTitle}>Mobile Friendly</Text>
          <Text style={styles.featureText}>
            Toujours avec toi, peu importe où tu es
          </Text>
        </View>
      </View>

      <View style={styles.contact}>
        <Text style={styles.contactTitle}>Nous contacter</Text>
        <Text style={styles.contactText}>
          Tu as une question ? Contacte-nous sur notre email.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  intro: {
    alignItems: 'center',
    marginVertical: 20,
  },
  introText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  feature: {
    alignItems: 'center',
    width: '30%',
  },
  featureIcon: {
    fontSize: 50,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  featureText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  contact: {
    alignItems: 'center',
    marginVertical: 20,
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
