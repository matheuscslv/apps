import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import styled from 'styled-components/native';

interface IContainerProps {
  keyboardHeight: number;
}

const getBottomSpaceScreen = (keyboardHeight: number): number => {
  if (Platform.OS === 'ios') {
    if (keyboardHeight === 0) return getBottomSpace() ?? 0;

    if (keyboardHeight > 0) return keyboardHeight;
  }

  return 0;
};

export const Container = styled.View<IContainerProps>`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  padding-bottom: ${({ keyboardHeight }) =>
    getBottomSpaceScreen(keyboardHeight)}px;
`;
