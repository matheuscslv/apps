import styled, { css } from 'styled-components/native';
import AdIcon from 'react-native-vector-icons/AntDesign';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background: ${({ theme }) => theme.colors.primary};
  height: 50px;
  width: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 10;

  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background: ${({ theme }) => theme.colors.white};
  justify-content: space-between;
  padding: 15px;
  border-radius: 4px;
  margin: 10px;
  flex-direction: row;
  align-items: center;

  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  ${({ isDefault }) =>
    isDefault &&
    css`
      border-left-width: 5px;
      border-left-color: ${({ theme }) => theme.colors.primary};
    `}
`;

export const InfoAdress = styled.View``;

export const Street = styled.Text`
  font-size: 16px;
  margin: 3px 0;
  color: ${({ theme }) => theme.colors.darker};
`;

export const Neighborhood = styled.Text`
  font-size: 14px;
  margin: 3px 0;
  color: ${({ theme }) => theme.colors.darker};
`;

export const Zip = styled.Text`
  font-size: 13px;
  margin: 3px 0;
  color: ${({ theme }) => theme.colors.darker};
`;

export const ActionIcon = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: { top: 10, bottom: 10, left: 10, right: 10 },
})`
  justify-content: center;
  align-items: center;
`;

export const LabelIcon = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 12px;
  line-height: 20px;
`;

export const ContentListIsEmpty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

export const TextListIsEmpty = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const TextSelected = styled.Text`
  line-height: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 12px;
`;

export const Icon = styled(AdIcon)`
  color: ${({ theme }) => theme.colors.primary};
`;

export const IconPlus = styled(AdIcon)`
  color: ${({ theme }) => theme.colors.white};
`;
