import React from 'react';
import {View, Text} from 'react-native';

import {Container, DetailsTitle, DetailsInput, CategoryTitle} from './styles';

export default function Details() {
  return (
    <Container>
      <DetailsTitle>Aqui você pode descrever a ocorrência</DetailsTitle>
      <DetailsInput />
      <CategoryTitle>
        Em qual categoria sua ocorrência mais se encaixa?
      </CategoryTitle>
    </Container>
  );
}
