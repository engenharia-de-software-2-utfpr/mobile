import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  /* justify-content: flex-start; */
`;

export const AudioContainer = styled.View`
  flex: 0.7;
  justify-content: center;
  align-items: center;
`;

export const AudioIcon = styled(Icon).attrs({
  name: 'mic',
  size: 96,
})``;

export const MediaContainer = styled.View`
  flex: 0.3;
  background-color: white;
`;

export const MediaListContainer = styled.View`
  flex: 1;
`;

export const ActionButtonContainer = styled.View`
  flex: 1;
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

export const MicIconRecord = styled(Icon).attrs({
  name: 'mic',
  size: 28,
  color: 'white',
})``;

export const MicIconStop = styled(Icon).attrs({
  name: 'stop',
  size: 28,
  color: 'white',
})``;
