import React from 'react';
import { StyleSheet, ImageBackground, Text } from 'react-native';
import carteirinha from '~/assets/CartaoExample.png';

import { Container } from './styles';

export default function Card() {
  return (
    <Container>
      <ImageBackground source={carteirinha} style={styles.backgroundImage}>
        <Text style={styles.titulo}>Título</Text>
      </ImageBackground>
    </Container>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'contain',
    position: 'absolute',
    height: '60%',
    width: '100%',
    flex: 1,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26,
  },
});
