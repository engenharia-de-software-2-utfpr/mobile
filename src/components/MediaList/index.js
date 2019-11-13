import React from 'react';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {removePhoto} from '../../store/actions/photo';
import {removeVideo} from '../../store/actions/video';
import {Container, MediaTile, MediaTileContainer} from './styles';

const mediaPath =
  'file://' + RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export default function MediaList({tiles, isVideo}) {
  const dispatch = useDispatch();

  return (
    <Container>
      {tiles.map(tile => (
        <MediaTileContainer
          key={tile}
          onLongPress={() => {
            Alert.alert('Confirmação', 'Deseja remover?', [
              {text: 'Cancelar', onPress: () => {}, style: 'cancel'},
              {
                text: 'Sim',
                onPress: () => {
                  if (isVideo) {
                    dispatch(removeVideo(tile));
                  } else {
                    dispatch(removePhoto(tile));
                  }
                },
              },
            ]);
          }}>
          <MediaTile source={{uri: mediaPath + '/' + tile}} />
        </MediaTileContainer>
      ))}
    </Container>
  );
}
