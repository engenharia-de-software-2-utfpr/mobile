import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {List} from 'react-content-loader/native';
import {Button} from 'react-native-paper';
import Sensitive from 'react-native-sensitive-info';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';
import {clearOccurrence} from '../../../store/actions/occurrence';
import {Container, Loadings} from './styles';

export default function Settings() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function handleLogOut() {
    await dispatch(clearOccurrence());
    await Sensitive.deleteItem('token', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
    await AsyncStorage.clear();
    navigation.navigate('AuthLoading');
  }

  return (
    <Container>
      <Loadings>
        <List />
        <List />
        <List />
      </Loadings>
      <Button onPress={handleLogOut}>Sair</Button>
    </Container>
  );
}
