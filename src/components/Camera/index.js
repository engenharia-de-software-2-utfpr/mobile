import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Camera, Container} from './styles';

export default function MediaHolder({navigation, setCamera}) {
  const [focus, setFocus] = useState(true);

  useEffect(() => {
    navigation.addListener('willFocus', () => {
      setFocus(true);
    });

    navigation.addListener('willBlur', () => {
      setFocus(false);
    });
  }, [navigation]);

  return (
    <Container>
      {focus ? (
        <Camera
          ref={cam => {
            setCamera(cam);
          }}
          captureAudio={true}
          type={RNCamera.Constants.Type.back}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message: 'Precisamos de sua permissão para usarmos a camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar',
          }}
        />
      ) : (
        <View style={{flex: 1}} />
      )}
    </Container>
  );
}
