import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import Toast from 'react-native-root-toast';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import {useDispatch, useSelector} from 'react-redux';
import Camera from '../../../../../../components/Camera';
import MediaList from '../../../../../../components/MediaList';
import {addPhoto} from '../../../../../../store/actions/photo';
import {requestStoragePermission} from '../../../../../../utils/permissions';
import {
  ActionButton,
  ActionButtonContainer,
  ActionButtonInner,
  CameraContainer,
  CameraIcon,
  Container,
  MediaContainer,
  MediaListContainer,
} from './styles';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export default function Photo({navigation}) {
  const occurrence = useSelector(state => state.occurrence);
  const photos = useSelector(state => state.occurrence.photos);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

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
    await requestStoragePermission();

    RNFS.exists(mediaPath).then(exists => {
      if (!exists) {
        RNFS.mkdir(mediaPath, {});
      }
    });

    const {uri} = await camera
      .takePictureAsync({
        width: 1920,
        skipProcessing: true,
        fixOrientation: false,
      })
      .catch(error => console.tron.error(error));

    dispatch(addPhoto(uri));

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
        <CameraContainer>
          <Camera navigation={navigation} setCamera={setCamera} />
        </CameraContainer>
        <MediaContainer>
          <MediaListContainer>
            <MediaList tiles={photos} />
          </MediaListContainer>
          <ActionButtonContainer>
            <ActionButton onPress={handleClick}>
              <ActionButtonInner>
                <CameraIcon />
              </ActionButtonInner>
            </ActionButton>
          </ActionButtonContainer>
        </MediaContainer>
      </Container>
    </AndroidBackHandler>
  );
}
