import React, {useEffect, useState} from 'react';
import Toast from 'react-native-root-toast';
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

export default function Photo({navigation}) {
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

    const {uri} = await camera.takePictureAsync({
      quality: 0.8,
      fixOrientation: true,
      skipProcessing: true,
      pauseAfterCapture: false,
    });

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

  return (
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
  );
}
