import React from 'react';
import { View, Text, Image } from 'react-native'

import { Container } from './styles'
import { SafeAreaView } from 'react-navigation';

import LinearGradient from 'react-native-linear-gradient';


export default function Login() {
  return (
    <Container>
      <LinearGradient colors={['#F4F4FA', '#EDF0F8']} style={{ flex: 1, alignItems: 'center' }}>
        <Image source={require('../../assets/logo.png')} />

      </LinearGradient>
    </Container>
  )
}
