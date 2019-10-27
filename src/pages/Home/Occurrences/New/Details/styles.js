import {TextInput, Text} from 'react-native';
import {Chip} from 'react-native-paper';
import styled from 'styled-components/native';
import {FAB} from 'react-native-paper';

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
  margin-bottom: 4%;
`;

export const CategoryChip = styled(Chip).attrs({})`
  margin: 4px;
`;

export const CriticityLevelTitle = styled.Text`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  padding-top: 12%;
  padding-bottom: 4%;
`;

export const CriticityLevelContainer = styled.View`
  align-items: center;
`;

export const CriticityLevelLabelContainer = styled.View`
  width: 200;
  flex-direction: row;
  justify-content: space-between;
`;

export const Error = styled.Text`
  text-align: center;
`;

export const Fab = styled(FAB).attrs({icon: 'check'})`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
`;
