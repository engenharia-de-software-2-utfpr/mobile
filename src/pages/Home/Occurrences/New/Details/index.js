import NetInfo from '@react-native-community/netinfo';
import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Code} from 'react-content-loader/native';
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
  const [details, setDetails] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [criticityLevel, setCriticityLevel] = useState(3);;

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

  async function createOccurrence() {}

  return (
    <Container>
      <DetailsTitle>Aqui você pode descrever a ocorrência</DetailsTitle>
      <DetailsInput value={details} onChangeText={setDetails} />
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
              selected={category.id === selected}
              key={category.id}
              onPress={() => {
                setSelected(category.id);
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
