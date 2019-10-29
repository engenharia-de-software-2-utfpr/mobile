import React from 'react';

import {Container} from './styles';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import Toast from 'react-native-root-toast';

export default function Advance() {
  const navigation = useNavigation();
  const occurrence = useSelector(state => state.occurrence);

  return (
    <Container
      onPress={() => {
        if (!occurrence.photos.length && !occurrence.videos.length) {
          Toast.show('Você deve enviar pelo menos uma foto ou um video', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
          });
        } else {
          navigation.navigate('Details');
        }
      }}>
      <Text>Próximo</Text>
    </Container>
  );
}
