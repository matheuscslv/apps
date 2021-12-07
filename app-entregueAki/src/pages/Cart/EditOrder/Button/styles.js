import styled from 'styled-components/native';
import { colors } from '~/styles';

export const ButtonChange = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 30px;
  padding: 0 10px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.primary};

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
  text-transform: uppercase;
`;
