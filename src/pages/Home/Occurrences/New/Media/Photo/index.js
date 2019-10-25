import React from 'react';
import Camera from '../../../../../../components/Camera';
import {Container} from './styles';

export default function Photo({navigation}) {
  return (
    <Container>
      <Camera navigation={navigation} />
    </Container>
  );
}
