import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  flex: 1;
`;

export const ButtonContainer = styled.View`
  position: absolute;
  top: 88%;
  align-self: center;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 50;
  border-radius: 50;
  width: 180;
`;

export const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;
