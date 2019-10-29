import React from 'react';
import {Alert} from 'react-native';
import {HeaderBackButton} from 'react-navigation-stack';
import {useSelector, useDispatch} from 'react-redux';
import {clearOccurrence} from '../../store/actions/occurrence';

// import { Container } from './styles';

export default function HeaderBack({navigation}) {
  const occurrence = useSelector(state => state.occurrence);
  const dispatch = useDispatch();

  function handleBack() {
    if (
      occurrence.photos.length ||
      occurrence.videos.length ||
      occurrence.audios.length
    ) {
      Alert.alert('Confirmação', 'Deseja descartar essa ocorrência?', [
        {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
        {
          text: 'Sim',
          onPress: () => {
            dispatch(clearOccurrence());
            navigation.pop();
          },
        },
      ]);
    } else {
      navigation.pop();
    }
  }

  return <HeaderBackButton onPress={handleBack} />;
}
