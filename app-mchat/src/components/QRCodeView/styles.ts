import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

export const Content = styled.View`
  background: #fcf2f8;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const HeaderText = styled.Text`
  margin: 0 20px;
  text-align: center;
  font-size: 18px;

  color: ${({ theme }) => theme.colors.title};
  line-height: 24px;
`;

export const ButtonBack = styled(RectButton)`
  height: 64px;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonBackText = styled.Text`
  text-align: center;
  font-size: 24px;

  color: ${({ theme }) => theme.colors.primary};
  line-height: 24px;
`;
