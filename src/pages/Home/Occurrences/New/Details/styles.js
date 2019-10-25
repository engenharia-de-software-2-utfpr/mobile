import styled from 'styled-components/native';
import {TextInput} from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 24px 12px;
`;

export const DetailsTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-bottom: 5%;
`;

export const DetailsInput = styled(TextInput).attrs({
  textAlignVertical: 'top',
  multiline: true,
  numberOfLines: 8,
  maxLength: 500,
})`
  background-color: lightgray;
  border-radius: 5;
`;

export const CategoryTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-bottom: 5%;
  padding-top: 5%;
`;
