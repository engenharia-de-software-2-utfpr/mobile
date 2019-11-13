import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import {useDispatch, useSelector} from 'react-redux';
import MediaList from '../../../../../../components/MediaList';
import {
  requestAudioPermission,
  requestStoragePermission,
} from '../../../../../../utils/permissions';
import {
  ActionButton,
  ActionButtonContainer,
  ActionButtonInner,
  AudioContainer,
  AudioIcon,
  Container,
  MediaContainer,
  MediaListContainer,
  MicIconRecord,
  MicIconStop,
} from './styles';
import AudioRecord from 'react-native-audio-record';
import {addAudioFailure, addAudio} from '../../../../../../store/actions/audio';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export default function Audio({navigation}) {
  const occurrence = useSelector(state => state.occurrence);
  const videos = useSelector(state => state.occurrence.videos);
  const audios = useSelector(state => state.occurrence.audios);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (error) {
      Toast.show(error, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  }, [error]);

  async function handleClick() {
    await requestAudioPermission();
    await requestStoragePermission();

    RNFS.exists(mediaPath).then(exists => {
      if (!exists) {
        RNFS.mkdir(mediaPath, {});
      }
    });

    if (!recording) {
      // Verifica antes de gravar
      if (occurrence.videos.audio >= 1) {
        dispatch(addAudioFailure('Você pode gravar no máximo 1 audio'));
      } else {
        setRecording(true);
        AudioRecord.init({});
        AudioRecord.start();
      }
    } else {
      const audioFile = await AudioRecord.stop();
      setRecording(false);
      dispatch(addAudio(audioFile));
    }

    if (error) {
      Toast.show(error, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }
  }

  function handleBack() {
    return false;
  }

  return (
    <AndroidBackHandler onBackPress={handleBack}>
      <Container>
        <AudioContainer>
          <AudioIcon />
        </AudioContainer>
        <MediaContainer>
          <MediaListContainer>
            <MediaList tiles={audios} type={'audio'} />
          </MediaListContainer>
          <ActionButtonContainer>
            <ActionButton onPress={handleClick}>
              <ActionButtonInner>
                {recording ? <MicIconStop /> : <MicIconRecord />}
              </ActionButtonInner>
            </ActionButton>
          </ActionButtonContainer>
        </MediaContainer>
      </Container>
    </AndroidBackHandler>
  );
}
