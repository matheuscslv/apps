import { Animated } from 'react-native';

import styled from 'styled-components/native';

import { colors, NunitoSemiBold, Nunito, NunitoBold } from '~/styles';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${colors.background};
`;

export const Separator = styled.View`
  padding: 20px 30px 10px 30px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  text-transform: uppercase;
  color: ${({ color }) => color || colors.success};
  font-size: 16px;
`;

export const Quantily = styled.Text`
  text-transform: uppercase;
  color: ${({ color }) => color || colors.success};
  font-size: 16px;
`;

export const Header = styled.View``;

export const HeaderTitle = styled(NunitoBold)`
  color: #fff;
  text-transform: uppercase;
  font-size: 16px;
  letter-spacing: 1px;
`;

export const HeaderSubTitle = styled(NunitoSemiBold)`
  color: #fff;
  font-size: 12px;
  margin-top: 5px;
`;

export const Buttons = styled(Animated.View)`
  flex-direction: row;
  padding: 15px 20px;
  position: absolute;
  width: auto;
  height: 60px;
  bottom: 0;
  align-self: center;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.7);

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const ButtonConfirmation = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: { top: 20, bottom: 40, left: 20, right: 20 },
})`
  flex-direction: row;
  align-items: center;
`;
export const ButtonName = styled(NunitoSemiBold)`
  text-transform: uppercase;
  color: #fff;
  margin-left: 10px;
`;

export const ButtonGuest = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: { top: 20, bottom: 40, left: 20, right: 20 },
})``;

export const Divider = styled.View`
  width: 1px;
  height: 130%;
  background: ${colors.primary};
  margin: 0 30px;
`;
