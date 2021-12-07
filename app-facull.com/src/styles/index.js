import { Platform } from 'react-native';

import styled, { css } from 'styled-components/native';

import colors from './colors';
import metrics from './metrics';

const NunitoSemiBold = styled.Text`
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
        font-weight: 600;
      `
    : css`
        font-family: 'Nunito SemiBold';
      `}
`;

const NunitoBold = styled.Text`
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
        font-weight: bold;
      `
    : css`
        font-family: 'Nunito Bold';
      `}
`;

const NunitoItalic = styled.Text`
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
        font-style: italic;
      `
    : css`
        font-family: 'Nunito Italic';
      `}
`;

const Nunito = styled.Text`
  color: #333;
  font-family: 'Nunito';
`;

const NunitoBlack = styled.Text`
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Nunito';
        font-weight: 900;
      `
    : css`
        font-family: 'Nunito Black';
      `}
`;

const PlatformType = Platform.OS;

export {
  colors,
  metrics,
  NunitoSemiBold,
  NunitoBold,
  NunitoBlack,
  Nunito,
  PlatformType,
  NunitoItalic,
};
