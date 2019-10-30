import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Slider from '@react-native-community/slider';
import React, {useEffect, useState} from 'react';
import {Code} from 'react-content-loader/native';
import {Text} from 'react-native';
import {Avatar} from 'react-native-paper';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from 'react-navigation-hooks';
import icons from '../../../../../assets/icons';
import api from '../../../../../services/api';
import {
  createOccurrence,
  updateOccurrence,
} from '../../../../../store/actions/occurrence';
import {
  CategoryChip,
  CategoryContainer,
  CategoryTitle,
  Container,
  CriticityLevelContainer,
  CriticityLevelLabelContainer,
  CriticityLevelTitle,
  DetailsInput,
  DetailsTitle,
  Error,
  Fab,
} from './styles';
import Geolocation from '@react-native-community/geolocation';

export default function Details() {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const occurrence = useSelector(state => state.occurrence);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadCategories() {
      const {isConnected} = await NetInfo.fetch();

      if (isConnected) {
        try {
          const {data} = await api.get('occurrence-category');
          setCategories(data);

          AsyncStorage.setItem('@categories', JSON.stringify(data));
        } catch (err) {
          setError(
            'Não foi possível carregar as categorias. Por favor, verifique a conexão.',
          );
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const data = await AsyncStorage.getItem('@categories');
          setCategories(JSON.parse(data));
        } catch (err) {
          setError(
            'Não foi possível carregar as categorias. Por favor, verifique a conexão.',
          );
        } finally {
          setLoading(false);
        }
      }
    }

    loadCategories();
  }, []);

  async function handleFab() {
    if (occurrence.category === null) {
      Toast.show('Escolha uma categoria', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    } else if (!occurrence.description.length) {
      Toast.show('Descrição vazia', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    } else {
      dispatch(createOccurrence());
      navigation.navigate('Upload');
    }
  }

  return (
    <Container>
      <DetailsTitle>Aqui você pode descrever a ocorrência</DetailsTitle>
      <DetailsInput
        value={occurrence.description}
        onChangeText={description => dispatch(updateOccurrence({description}))}
      />
      <CategoryTitle>
        Em qual categoria sua ocorrência se encaixa?
      </CategoryTitle>

      <CategoryContainer>
        {error ? (
          <Error>{error}</Error>
        ) : loading ? (
          <Code />
        ) : (
          categories.map(category => (
            <CategoryChip
              selected={category.id === occurrence.category}
              key={category.id}
              onPress={() => {
                dispatch(updateOccurrence({category: category.id}));
              }}
              selectedColor="transparent"
              avatar={
                <Avatar.Image
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  size={16}
                  source={icons[category.id]}
                />
              }>
              {category.description}
            </CategoryChip>
          ))
        )}
      </CategoryContainer>

      <CriticityLevelTitle>
        Diga-nos a gravidade dessa ocorrência na sua opinião
      </CriticityLevelTitle>
      <CriticityLevelContainer>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={occurrence.criticityLevel}
          onValueChange={criticityLevel =>
            dispatch(updateOccurrence({criticityLevel}))
          }
          maximumTrackTintColor="#d3d3d3"
          minimumTrackTintColor="rgb(252, 228, 149)"
        />
        <CriticityLevelLabelContainer>
          <Text>Pouco grave</Text>
          <Text>Muito grave</Text>
        </CriticityLevelLabelContainer>
      </CriticityLevelContainer>

      <Fab onPress={handleFab} />
    </Container>
  );
}
