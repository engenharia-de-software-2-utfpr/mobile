import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import {useDispatch, useSelector} from 'react-redux';
import Camera from '../../../../../../components/Camera';
import MediaList from '../../../../../../components/MediaList';
import {addVideo, addVideoFailure} from '../../../../../../store/actions/video';
import {
  requestStoragePermission,
  requestAudioPermission,
} from '../../../../../../utils/permissions';
import {
  ActionButton,
  ActionButtonContainer,
  ActionButtonInner,
  CameraContainer,
  CameraIconRecord,
  CameraIconStop,
  Container,
  MediaContainer,
  MediaListContainer,
} from './styles';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export default function Video({navigation}) {
  const occurrence = useSelector(state => state.occurrence);
  const videos = useSelector(state => state.occurrence.videos);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

  const [recording, setRecording] = useState(false);
  const [camera, setCamera] = useState(null);

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
      if (occurrence.videos.length >= 1) {
        dispatch(addVideoFailure('Você pode gravar no máximo 1 vídeo'));
      } else {
        const promise = camera.recordAsync({
          quality: '720p',
          maxDuration: 60 * 5,
          maxFileSize: 1024 * 1024 * 100,
        });

        if (promise) {
          setRecording(true);
          const data = await promise;
          setRecording(false);

          dispatch(addVideo(data.uri));
        }
      }
    } else {
      camera.stopRecording();
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

    // const {uri} = await camera
    //   .takePictureAsync({
    //     width: 1920,
    //     skipProcessing: true,
    //     fixOrientation: false,
    //   })
    //   .catch(error => console.tron.error(error));

    // dispatch(addPhoto(uri));

    // if (error) {
    //   Toast.show(error, {
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.BOTTOM,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //   });
    // }
  }

  function handleBack() {
    return false;
  }

  return (
    <AndroidBackHandler onBackPress={handleBack}>
      <Container>
        <CameraContainer>
          <Camera navigation={navigation} setCamera={setCamera} />
        </CameraContainer>
        <MediaContainer>
          <MediaListContainer>
            <MediaList tiles={videos} isVideo={true} />
          </MediaListContainer>
          <ActionButtonContainer>
            <ActionButton onPress={handleClick}>
              <ActionButtonInner>
                {recording ? <CameraIconStop /> : <CameraIconRecord />}
              </ActionButtonInner>
            </ActionButton>
          </ActionButtonContainer>
        </MediaContainer>
      </Container>
    </AndroidBackHandler>
  );
}
