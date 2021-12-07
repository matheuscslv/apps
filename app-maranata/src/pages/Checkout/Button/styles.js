import styled from 'styled-components/native';

export const ButtonChange = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 30px;
  padding: 0 10px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;
