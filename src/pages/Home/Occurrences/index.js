import React from 'react';
import {Button, ButtonContainer, ButtonText, Container, Map} from './styles';

export default function Occurrence({navigation}) {
  return (
    <Container>
      <Map
        initialRegion={{
          latitude: -24.046329,
          longitude: -52.37802,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <ButtonContainer>
        <Button
          onPress={() => {
            navigation.navigate('Media');
          }}>
          <ButtonText>Tem algo errado aqui!</ButtonText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}
