import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Text} from 'react-native';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {removePhoto} from '../../store/actions/photo';
import {removeVideo} from '../../store/actions/video';
import {
  Container,
  MediaTile,
  MediaTileContainer,
  AudioMediaTileContainer,
  AudioMediaIcon,
} from './styles';
import {removeAudio} from '../../store/actions/audio';

const mediaPath =
  'file://' + RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

function MediaList({tiles, type}) {
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
                  if (type === 'photo') {
                    dispatch(removePhoto(tile));
                  } else if (type === 'video') {
                    dispatch(removeVideo(tile));
                  } else if (type === 'audio') {
                    dispatch(removeAudio(tile));
                  }
                },
              },
            ]);
          }}>
          {type === 'audio' ? (
            <AudioMediaTileContainer>
              <AudioMediaIcon />
            </AudioMediaTileContainer>
          ) : (
            <MediaTile source={{uri: mediaPath + '/' + tile}} />
          )}
        </MediaTileContainer>
      ))}
    </Container>
  );
}

MediaList.propTypes = {
  type: PropTypes.oneOf(['photo', 'video', 'audio']),
};

export default MediaList;
