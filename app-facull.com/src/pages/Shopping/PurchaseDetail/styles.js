import Dash from 'react-native-dash';

import styled from 'styled-components/native';

import { colors, NunitoSemiBold, Nunito, NunitoBold } from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 30,
  },
})`
  background: #fff;
  flex: 1;
  margin: 20px 30px;
`;

export const Header = styled.View`
  align-items: center;
  margin: 30px 0;
`;

export const HeaderTitle = styled(NunitoSemiBold)`
  font-size: 20px;
  margin-top: 20px;
`;

export const Content = styled.View``;

export const ContainerTransaction = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-radius: 1px;
  margin: 20px 0;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  flex: 1;
`;

export const Title = styled(Nunito)`
  font-size: 15px;
  width: 60%;
`;

export const Value = styled(NunitoBold)`
  font-size: 15px;
  color: #333;
`;

export const ContainerInfo = styled.View`
  margin: 20px 0;
`;

export const DashedBorder = styled(Dash).attrs({
  dashColor: '#ccc',
})`
  height: 1px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin: 20px 0;
  align-items: center;
  border-radius: 2px;
  justify-content: center;
  background-color: ${colors.primary};
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;
