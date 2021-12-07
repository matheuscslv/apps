import FeIcon from 'react-native-vector-icons/Feather';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const ContentInput = styled.View`
  padding: 5px 15px 15px;
  flex-direction: row;
  background-color: transparent;
  max-height: ${10 * 16}px;
  min-height: 40px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.black};
  margin: 0 10px;
  padding: 10px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background: transparent;
  margin-top: auto;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary};

  justify-content: center;
  align-items: center;
`;

export const Icon = styled(FaIcon).attrs({
  name: 'send-o',
})`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`;

export const ButtonPlus = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
  hitSlop: {
    left: 20,
    bottom: 20,
    top: 40,
    right: 10,
  },
})`
  margin-top: auto;
  width: 25px;
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const IconPlus = styled(FeIcon).attrs({
  name: 'plus',
})`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.primary};
`;
