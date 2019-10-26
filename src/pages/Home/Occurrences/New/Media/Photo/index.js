import React from 'react';
import {Orientation} from 'react-native-camera';
import Camera from '../../../../../../components/Camera';
import MediaList from '../../../../../../components/MediaList';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {v4} from 'uuid';

import RNFS from 'react-native-fs';

import {
  Container,
  MediaListContainer,
  ActionButtonContainer,
  ActionButton,
  ActionButtonInner,
  CameraIcon,
  CameraContainer,
  MediaContainer,
} from './styles';
import {requestStoragePermission} from '../../../../../../utils/permissions';

const mediaPath = RNFS.ExternalStorageDirectoryPath + '/RioDoCampoLimpo';

export default function Photo({navigation}) {
  const photos = useSelector(state => state.occurrence.photos);
  const dispatch = useDispatch();

  const [camera, setCamera] = useState(null);

  async function handleClick() {
    await requestStoragePermission();

    const {uri} = await camera.takePictureAsync({
      quality: 0.8,
      fixOrientation: true,
      skipProcessing: true,
      pauseAfterCapture: false,
    });

    const dest = `${mediaPath}/${v4()}.jpg`;

    console.log({dest});

    await RNFS.copyFile(uri, dest);
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
