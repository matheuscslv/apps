import { ViewProps } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TooltipView from '@components/Tooltip';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled(MCIcons)`
  font-size: 23px;
`;

export const Tooltip = styled(TooltipView)<ViewProps>`
  margin-left: 5px;
  position: absolute;

  left: 30px;
  top: 0px;
`;
