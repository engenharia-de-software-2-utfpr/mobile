import styled from 'styled-components/native';
import {Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 12px;
  /* background-color: black; */
`;

export const MediaTileContainer = styled.TouchableOpacity``;

export const MediaTile = styled(Image).attrs({
  width: 50,
  height: 50,
})`
  margin: 4px;
  width: 50;
  height: 50;
`;

export const AudioMediaTileContainer = styled.View`
  background-color: lightgray;
  margin: 4px;
  width: 50;
  height: 50;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const AudioMediaIcon = styled(Icon).attrs({
  name: 'audiotrack',
  size: 28,
  color: 'black',
})``;
