import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';

// TODO: corrigir flex-layout camera

export const Container = styled.View`
  flex: 1;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  flex-direction: column;
`;

export const Camera = styled(RNCamera)`
  flex: 1;
`;
