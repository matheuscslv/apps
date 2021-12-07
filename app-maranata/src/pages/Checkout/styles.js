import styled, { css } from 'styled-components/native';
import MaIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background: ${({ theme }) => theme.colors.background};
  flex: 1px;
`;

export const Icon = styled(MaIcon)`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.success : theme.colors.regular};
`;

export const Content = styled.View`
  padding-bottom: 10px;
  background: ${({ theme }) => theme.colors.white};
  margin: 10px 0;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ContentPayment = styled.View`
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.white};
  margin: 10px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ContentUser = styled.View`
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.white};
  margin: 10px 0;
  flex-direction: row;
`;

export const Header = styled.View`
  padding: 15px;
  border-bottom-width: 0.4px;
  border-bottom-color: ${({ theme }) => theme.colors.light};
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-weight: bold;
  font-size: 14px;
`;

export const UserInformations = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  padding: 0 10px;
`;

export const Address = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};
  padding: 10px 10px 0 10px;
`;

export const NumberCard = styled.Text`
  flex: 1;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const OptionsPayment = styled.View`
  background: ${({ theme }) => theme.colors.white};
  margin: 10px 0;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const OptionButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 10px;
  justify-content: center;
  align-items: center;

  ${({ selected }) =>
    selected &&
    css`
      border-width: 2px;
      border-color: ${({ theme }) => theme.colors.success};
      border-radius: 4px;
    `}
`;

export const OptionName = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};
  margin-top: 5px;

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.colors.success};
      font-weight: bold;
    `}
`;

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 10px;
`;

export const TitleItem = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const ValueItem = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};
`;

export const Bold = styled.Text`
  font-weight: bold;
`;
