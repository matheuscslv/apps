import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

import { colors, NunitoSemiBold, NunitoBlack, Nunito } from '~/styles';

export const Container = styled.View`
  background: #fff;
  flex-direction: row;
  padding: 20px;
  height: 140px;
  border-bottom-color: #f7f7f7;
  border-bottom-width: 1.5px;
`;

export const ImageFood = styled.Image`
  height: 100%;
  width: 100px;
  border-radius: 4px;
`;

export const Info = styled.View`
  margin-left: 15px;
  flex: 1;
`;

export const TitleFood = styled(NunitoBlack)`
  font-size: 14px;
  color: ${colors.titleColor};
  letter-spacing: 0.6px;
`;

export const CategoryFood = styled(Nunito)`
  font-size: 14px;
  color: ${colors.subTitleColor};
  margin-top: 3px;
  text-transform: capitalize;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const Amount = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Action = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  justify-content: center;
  align-items: center;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  background-color: ${props => props.color};
`;

export const ActionIcon = styled(Icon).attrs({
  color: '#fff',
  size: 14,
})`
  padding: 0;
  margin: 0;
  text-align: center;
`;

export const NumberItem = styled(NunitoSemiBold)`
  margin: 0 20px;
  color: #000;
  text-align: center;
`;

export const Price = styled(NunitoSemiBold)`
  font-size: 18px;
  color: ${colors.primary};
`;
