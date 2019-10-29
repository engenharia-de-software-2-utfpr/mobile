import styled from 'styled-components/native';
import {Button} from 'react-native-paper';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import Success from '../../../../../assets/success.json';
import {ProgressBar, Colors} from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  margin: 0% 12%;
`;

export const Title = styled(Text)``;

export const OfflineIcon = styled(Icon).attrs({
  name: 'wifi-off',
  size: 72,
})``;

export const Caption = styled.Text`
  text-align: center;
`;

export const SuccessAnimation = styled(Lottie).attrs({
  source: Success,
  autoPlay: true,
  loop: false,
  speed: 0.75,
  autoSize: true,
})``;

export const Progress = styled(ProgressBar).attrs({
  indeterminate: true,
  // progress: 0,
})`
  width: 200px;
`;

export const Back = styled(Button).attrs({mode: 'outlined'})``;
