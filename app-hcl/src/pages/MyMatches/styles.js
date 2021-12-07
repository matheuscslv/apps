import styled from 'styled-components/native';

import { colors, NunitoSemiBold, NunitoBold, Nunito } from '~/styles';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 20,
  },
})`
  background: ${colors.background};
`;
