import React from 'react';
import {View, Text, ListI} from 'react-native';

import {
  Container,
  DetailsTitle,
  DetailsInput,
  CategoryTitle,
  CategoryList,
  CriticityLevelTitle,
  CategoryContainer,
  CategoryChip,
} from './styles';

export default function Details() {
  return (
    <Container>
      <DetailsTitle>Aqui você pode descrever a ocorrência</DetailsTitle>
      <DetailsInput />
      <CategoryTitle>
        Em qual categoria sua ocorrência se encaixa?
      </CategoryTitle>

      <CategoryContainer>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
        <CategoryChip icon="information" onPress={() => console.log('Pressed')}>
          Example Chip
        </CategoryChip>
      </CategoryContainer>

      {/* <CriticityLevelTitle>
        Se possível, informe o nível de criticidade
      </CriticityLevelTitle> */}
    </Container>
  );
}
