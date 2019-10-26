import Lottie from 'lottie-react-native';
import React from 'react';
import Wip from '../../../../../../assets/wip.json';
import {Container} from './styles';

export default function Audio() {
  return (
    <Container>
      <Lottie source={Wip} autoPlay loop />
    </Container>
  );
}
