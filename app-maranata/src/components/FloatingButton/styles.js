import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
  margin: 15px 20px 10px;
  padding: 0 10px;
  justify-content: space-between;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-width: 1.5px;
  background: transparent;
  height: 38px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;
