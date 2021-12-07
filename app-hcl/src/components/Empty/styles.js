import styled from 'styled-components/native';

import { NunitoSemiBold } from '~/styles';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(NunitoSemiBold)`
  font-size: 14px;
  text-align: center;
  padding: 0 30px;
`;
