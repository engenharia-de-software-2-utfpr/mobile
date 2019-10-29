import Lottie from 'lottie-react-native';
import React, {useEffect} from 'react';
import Sensitive from 'react-native-sensitive-info';
import {useNavigation} from 'react-navigation-hooks';
import Loading from '../../assets/loading.json';
import {Container} from './styles';

export default function AuthLoading() {
  const navigation = useNavigation();

  useEffect(() => {
    async function checkIfIsAuthenticated() {
      const token = await Sensitive.getItem('token', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });

      if (token) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Auth');
      }
    }
    checkIfIsAuthenticated();
  }, [navigation]);

  return (
    <Container>
      <Lottie source={Loading} autoPlay loop />
    </Container>
  );
}
