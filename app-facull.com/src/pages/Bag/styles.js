import { Platform } from 'react-native';

import styled, { css } from 'styled-components';

import { colors, NunitoBold, metrics } from '~/styles';

export const Container = styled.View`
  background: ${colors.background};
  flex: 1;
`;

export const ContentPayment = styled.View`
  padding-top: 20px;
  background-color: #fff;
  elevation: 20;
`;

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const Total = styled.Text`
  padding: 0 30px;
  font-size: 18px;
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
      `
    : css`
        font-family: 'Nunito SemiBold';
      `}
`;

export const Amount = styled(Total)`
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
        font-weight: bold;
      `
    : css`
        font-family: 'Nunito Bold';
      `}
`;

export const SelectPayment = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 10px 0;
`;

export const Replace = styled(Total)`
  color: #f00;
`;

export const Payment = styled.View``;

export const TypePayment = styled(Total)`
  color: #666;
  font-size: 14px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 54px;
  justify-content: center;
  align-items: center;
  background: #ea570c;
  border-bottom-width: 1px;
  border-bottom-color: #ea570c;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
        font-weight: bold;
      `
    : css`
        font-family: 'Nunito Bold';
      `}
`;

export const IsEmptyContainer = styled.View`
  height: ${metrics.screenHeight - 160}px;
  justify-content: center;
  align-items: center;
`;

export const IsEmptyImage = styled.Image`
  height: 100px;
  width: 100px;
`;

export const IsEmptyText = styled(NunitoBold)`
  font-size: 20px;
  margin-top: 10px;
  color: #666;
`;
