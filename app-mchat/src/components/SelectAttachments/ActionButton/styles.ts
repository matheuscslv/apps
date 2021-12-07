import { TouchableOpacityProps } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Action = styled.TouchableOpacity.attrs<TouchableOpacityProps>({
  activeOpacity: 0.8,
})`
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FaIcon)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Label = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary};
`;
