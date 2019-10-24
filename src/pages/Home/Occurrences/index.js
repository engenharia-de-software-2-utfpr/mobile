import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-elements';
import MapView from 'react-native-maps';
import {Container} from './styles';

export default function Occurrence({navigation}) {
  return (
    <Container>
      <MapView
        initialRegion={{
          latitude: -24.046329,
          longitude: -52.37802,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{flex: 1}}
      />
      <View
        style={{
          position: 'absolute', //use absolute position to show button on top of the map
          top: '88%',
          alignSelf: 'center', //for align to right
        }}>
        <Button
          title="Tem algo errado aqui!"
          onPress={() => {
            navigation.navigate('New');
          }}
          buttonStyle={{
            backgroundColor: 'black',
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 50,
          }}
        />
      </View>
    </Container>
  );
}
