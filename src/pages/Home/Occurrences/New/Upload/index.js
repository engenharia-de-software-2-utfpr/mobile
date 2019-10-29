import NetInfo from '@react-native-community/netinfo';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {material} from 'react-native-typography';
import {NavigationActions, StackActions} from 'react-navigation';
import {useFocusEffect, useNavigation} from 'react-navigation-hooks';
import {useSelector} from 'react-redux';
import {
  Back,
  Caption,
  Container,
  OfflineIcon,
  Progress,
  SuccessAnimation,
  Title,
} from './styles';

export default function Upload() {
  const [online, setOnline] = useState(false);
  const navigation = useNavigation();

  const uploading = useSelector(state => state.uploading);

  useFocusEffect(() => {
    async function checkOnline() {
      const {isConnected} = await NetInfo.fetch();
      setOnline(isConnected);
    }

    checkOnline();
  }, []);

  return (
    <Container>
      {!online ? (
        <>
          <Title style={material.title}>Parece que você está offline</Title>
          <OfflineIcon />
          <Caption style={material.body2}>
            Não se preocupe, sua ocorrência será enviada assim que você se
            conectar novamente
          </Caption>
          <Back
            onPress={() => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Home'})],
              });
              navigation.dispatch(resetAction);
            }}>
            <Text>Voltar para a tela principal</Text>
          </Back>
        </>
      ) : (
        <>
          <Title style={material.title}>Pronto!</Title>
          <SuccessAnimation />
          <Caption style={material.body2}>
            {uploading
              ? 'Estamos enviando sua ocorrência'
              : 'Ocorrência enviada!'}
          </Caption>
          {uploading ? (
            <Progress />
          ) : (
            <Back
              onPress={() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({routeName: 'Home'})],
                });
                navigation.dispatch(resetAction);
              }}>
              <Text>Voltar para a tela principal</Text>
            </Back>
          )}
        </>
      )}
    </Container>
  );
}
