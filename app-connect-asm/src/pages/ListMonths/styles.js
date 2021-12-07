import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {colors} from '~/styles';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

export const Icone = styled(Icon)`
  margin-right: 10px;
`;

export const Top = styled.View`
  background-color: #efeef4;
  padding-horizontal: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

export const Session = styled.Text`
  font-family: 'Quicksand-Regular';
  margin-top: 4px;
  font-size: 16px;
  margin-left: 4px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const Item = styled.View``;

export const NameItem = styled.Text`
  font-family: 'Quicksand-Regular';
  color: #111;
  margin-left: 10px;
  text-transform: uppercase;
`;

export const BoxNotify = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 10px;
  height: 44px;
  border-bottom-color: #f6f6f6;
  border-bottom-width: 1px;
`;

export const ButtonAnnual = styled.TouchableOpacity`
  background-color: ${colors.primary};
  padding: 10px;
  margin: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: row;
`;

export const ButtonAnnualText = styled.Text`
  font-family: 'Quicksand-Bold';
  color: #fff;
  text-transform: uppercase;
`;
