import React from 'react';
import {View} from 'react-native';

import {Container, Header, CloseIcon, Center, Next} from './styles';

export default function MediaHeader(props) {
  const {navigation} = props;

  return (
    <Container>
      <Header>
        <CloseIcon onPress={() => navigation.pop()} />
        <Center />
        <Next>Avançar</Next>
      </Header>
    </Container>
  );
}
