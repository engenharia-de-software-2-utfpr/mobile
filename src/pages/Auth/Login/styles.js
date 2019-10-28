import styled from 'styled-components/native';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
`;

export const Gradient = styled(LinearGradient).attrs({
  colors: ['#E0EAFC', '#CFDEF3'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
})`
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 8% 12%;
`;

export const ButtonContainer = styled.View``;

export const Facebook = styled(Button).attrs({mode: 'contained'})`
  padding: 4px;
`;

export const Phone = styled(Button).attrs({mode: 'outlined'})`
  margin-top: 12px;
  padding: 4px;
`;
