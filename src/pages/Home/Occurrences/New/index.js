import React from 'react';
import {View, Text} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {material} from 'react-native-typography';

import {Container} from './styles';

export default function NewOccurrence() {
  return (
    <Container>
      <Text style={material.title}>Cadastrando nova ocorrência</Text>

      <Input
        containerStyle={{paddingTop: '10%'}}
        placeholder="Descreva aqui a ocorrência"
        multiline
        numberOfLines={10}
        textAlignVertical="top"
        inputStyle={{backgroundColor: '#f5f5f5', borderRadius: 5, padding: 15}}
        inputContainerStyle={{borderBottomWidth: 0}}
      />

      <Text style={material.body2}>Cadastrando nova ocorrência</Text>
    </Container>
  );
}
