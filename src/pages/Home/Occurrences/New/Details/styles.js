import styled from 'styled-components/native';
import {TextInput, FlatList} from 'react-native';
import {Chip} from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 0% 8%;
`;

export const DetailsTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding: 8%;
`;

export const DetailsInput = styled(TextInput).attrs({
  textAlignVertical: 'top',
  multiline: true,
  numberOfLines: 8,
  maxLength: 500,
})`
  background-color: #eeeeee;
  border-radius: 5;
`;

export const CategoryTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding: 8%;
`;

export const CategoryContainer = styled.View`
  max-height: 10%;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CategoryChip = styled(Chip)`
  margin: 4px;
`;

export const CriticityLevelTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding: 8%;
`;
