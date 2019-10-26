import styled from 'styled-components/native';
import {Image} from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 12px;
  /* background-color: black; */
`;

// export const MediaTileContainer = styled.View``

export const MediaTile = styled(Image).attrs({
  width: 50,
  height: 50,
})`
  margin: 4px;
  width: 50;
  height: 50;
`;
