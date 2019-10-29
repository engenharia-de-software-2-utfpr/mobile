import auth from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import Sensitive from 'react-native-sensitive-info';
import {material} from 'react-native-typography';
import {useNavigation} from 'react-navigation-hooks';
import api from '../../../services/api';
import {ButtonContainer, Container, Facebook, Gradient, Phone} from './styles';

export default function Login() {
  const navigation = useNavigation();

  useEffect(() => {
    async function checkIfIsAuthenticated() {
      const token = await Sensitive.getItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });

      if (token) {
        navigation.navigate('Home');
      }
    }
    checkIfIsAuthenticated();
  }, [navigation]);

  async function handleFacebookSignIn() {
    await LoginManager.logInWithPermissions(['public_profile']);
    const data = await AccessToken.getCurrentAccessToken();

    if (data) {
      const credential = auth.FacebookAuthProvider.credential(data.accessToken);

      const firebaseUserCredential = await auth().signInWithCredential(
        credential,
      );
      const token = await firebaseUserCredential.user.getIdToken();

      try {
        const response = await api.post('user/signup', {token});

        Sensitive.setItem('token', response.data.data.token, {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        });
        navigation.navigate('Home');
      } catch (error) {
        console.tron.error(error);
      }
    }
  }

  return (
    <Container>
      <Gradient>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <Image
            source={require('../../../assets/logo.png')}
            style={{marginBottom: 16}}
          />
          <Text style={{...material.subheading, textAlign: 'center'}}>
            Contribua para termos uma cidade mais limpa e agradável
          </Text>
        </View>
        <View style={{flex: 0.3, justifyContent: 'flex-end'}}>
          <ButtonContainer>
            <Facebook onPress={handleFacebookSignIn}>
              Entrar com o Facebook
            </Facebook>
            <Phone onPress={() => {}}>Entrar com o celular</Phone>
          </ButtonContainer>
        </View>
      </Gradient>
    </Container>
  );
}
