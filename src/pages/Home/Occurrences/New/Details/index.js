import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Code} from 'react-content-loader/native';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import Slider from '@react-native-community/slider';
import {Avatar} from 'react-native-paper';
import icons from '../../../../../assets/icons';
import api from '../../../../../services/api';
import {
  CategoryChip,
  CategoryContainer,
  CategoryTitle,
  Container,
  DetailsInput,
  DetailsTitle,
  Error,
  Fab,
  CriticityLevelTitle,
  CriticityLevelContainer,
  CriticityLevelLabelContainer,
} from './styles';

export default function Details() {
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [criticityLevel, setCriticityLevel] = useState(3);

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
          console.tron.log(data);
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

  async function createOccurrence() {
    if (selectedCategory === null) {
      Toast.show('Escolha uma categoria', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
    }

    const cachedOccurrences = JSON.parse(
      await AsyncStorage.getItem('@occurrences'),
    );

    console.tron.log(cachedOccurrences);
  }

  return (
    <Container>
      <DetailsTitle>Aqui você pode descrever a ocorrência</DetailsTitle>
      <DetailsInput value={description} onChangeText={setDescription} />
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
              selected={category.id === selectedCategory}
              key={category.id}
              onPress={() => {
                setSelectedCategory(category.id);
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
          value={criticityLevel}
          onValueChange={setCriticityLevel}
          maximumTrackTintColor="#d3d3d3"
          minimumTrackTintColor="rgb(252, 228, 149)"
        />
        <CriticityLevelLabelContainer>
          <Text>Pouco grave</Text>
          <Text>Muito grave</Text>
        </CriticityLevelLabelContainer>
      </CriticityLevelContainer>

      <Fab onPress={createOccurrence} />
    </Container>
  );
}
