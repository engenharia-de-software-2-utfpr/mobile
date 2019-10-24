import React, {useEffect} from 'react';
import {View} from 'react-native';

import {Container, Header, CloseIcon, Center, Next} from './styles';

export default function MediaHeader(props) {
  const {navigation} = props;

  useEffect(() => {
    console.log(navigation.goBack);
  }, [navigation.goBack]);
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
