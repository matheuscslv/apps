import FaIcon from 'react-native-vector-icons/FontAwesome';

import TooltipComponent from '@components/Tooltip';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};
  padding: 15px;
  border-bottom-color: ${({ theme }) => theme.colors.lighter};
  border-bottom-width: 1px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(FaIcon).attrs({
  name: 'chevron-right',
})`
  color: ${({ theme }) => theme.colors.regular};
  font-size: 20px;
`;

export const Tooltip = styled(TooltipComponent)`
  margin: 0 15px 0 auto;
`;
