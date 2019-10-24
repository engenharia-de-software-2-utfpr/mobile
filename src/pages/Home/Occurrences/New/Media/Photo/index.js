import React from 'react';
import {Text} from 'react-native';

import MediaHeader from '../../../../../../components/MediaHeader';

import {Container} from './styles';

export default function Photo({navigation}) {
  return (
    <Container>
      <MediaHeader navigation={navigation} />
    </Container>
  );
}
