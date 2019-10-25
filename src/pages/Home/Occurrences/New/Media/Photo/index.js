import React, {useEffect} from 'react';
import {Text} from 'react-native';

import MediaHeader from '../../../../../../components/MediaHeader';
import Camera from '../../../../../../components/Camera';

import {Container} from './styles';

export default function Photo({navigation}) {
  return (
    <Container>
      {/* <MediaHeader navigation={navigation} /> */}
      <Camera navigation={navigation} />
    </Container>
  );
}
