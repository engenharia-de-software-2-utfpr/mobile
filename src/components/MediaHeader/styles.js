import styled from 'styled-components/native';
import {Header as ElHeader} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

// TODO: corrigir gambiarra para centralizar componentes

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled(ElHeader).attrs({
  flex: 1,
  backgroundColor: '#efefef',
  containerStyle: {
    height: 50,
  },
})``;

export const CloseIcon = styled(Icon).attrs({
  name: 'close',
  size: 22,
})`
  padding-bottom: 20%;
  padding-left: 5px;
`;

export const Center = styled.View``;

export const Next = styled.Text`
  padding-bottom: 22%;
  padding-right: 10px;
  font-weight: bold;
`;
