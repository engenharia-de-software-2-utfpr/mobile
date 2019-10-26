import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';

import {Container, MediaTile} from './styles';

export default function MediaList({tiles}) {
  return (
    <Container>
      {tiles.map(tile => (
        <MediaTile source={{uri: tile}} />
      ))}
    </Container>
  );
}
