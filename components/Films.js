import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

const Films = () => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://image.tmdb.org/t/p/w500/path_to_your_movie_image',
          }}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>Nom du film</Text>
          <View style={styles.divider} />
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>👎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>❤️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 420,
    borderRadius: 15,
    minHeight: 600,
  },
  image: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 8,
  },
  actionText: {
    fontSize: 24,
  },
});

export default Films;
