import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: corrigir flex-layout camera

export const Container = styled.View`
  flex: 1;
  /* align-items: flex-start; */
  /* justify-content: flex-start; */
  flex-direction: column;
`;

export const Camera = styled(RNCamera)`
  flex: 0.7;
`;

export const MediaListContainer = styled.View`
  flex: 0.1;
  background-color: black;
`;

export const ActionButtonContainer = styled.View`
  flex: 0.2;
  background-color: black;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  width: 60;
  height: 60;
  border-radius: 50;
  background-color: lightgray;
  align-items: center;
  justify-content: center;
`;

export const ActionButtonInner = styled.View`
  width: 50;
  height: 50;
  border-radius: 50;
  background-color: gray;
  align-items: center;
  justify-content: center;
`;

export const CameraIcon = styled(Icon).attrs({
  name: 'camera',
  size: 28,
  color: 'white',
})``;
