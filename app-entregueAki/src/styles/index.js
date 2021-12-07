import { Platform } from 'react-native';

import styled, { css } from 'styled-components/native';

import colors from './colors';
import metrics from './metrics';

const NunitoSemiBold = styled.Text`
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Quicksand-Bold';
        font-weight: 600;
      `
    : css`
        font-family: 'Quicksand-Bold';
      `}
`;

const NunitoBold = styled.Text`
  color: #333;
  ${Platform.OS === 'ios'
    ? css`
        font-family: 'Quicksand-Bold';
      `
    : css`
        font-family: 'Quicksand-Bold';
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
  font-family: 'Quicksand-Regular';
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
