import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Item = styled.View`
  padding: 20px;
  background: ${({ theme }) => theme.colors.white};
  margin-top: 10px;

  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const HeaderCard = styled.View`
  justify-content: center;
  align-items: center;
`;

export const IconeCheck = styled(Icon)`
  color: ${({ theme }) => theme.colors.title};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
  margin-top: 3px;
  line-height: 25px;
`;

export const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 25px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding-top: 15px;
  height: 34px;
  border-top-width: 0.5px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
`;
