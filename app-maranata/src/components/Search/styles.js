import styled from 'styled-components/native';
import FaIcon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
  align-items: stretch;
  align-self: stretch;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-width: 1.5px;
`;

export const InputSearch = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  maxLength: 50,
})`
  width: 80%;
  color: ${({ theme }) => theme.colors.black};
  height: 44px;
  padding: 0px 15px;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ButtonClear = styled.TouchableOpacity.attrs({})`
  height: 44px;
  width: 5%;
  margin-right: 10px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FaIcon)`
  color: ${({ theme }) => theme.colors.secundary};
`;
