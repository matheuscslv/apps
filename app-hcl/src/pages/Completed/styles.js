import styled from 'styled-components/native';

import { colors, NunitoSemiBold, NunitoBold, Nunito } from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  flex: 1;
  background: ${colors.background};
`;
