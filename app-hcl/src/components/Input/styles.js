import styled from 'styled-components/native';

import { Nunito, colors } from '~/styles';

export const Label = styled.Text`
  color: #000;
  margin: 15px 0 10px 0;
`;

export const Input = styled.TextInput.attrs({ placeholderTextColor: '#777' })`
  color: #222;
  padding: 5px 15px;

  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

export const Error = styled(Nunito)`
  color: ${colors.danger};
  font-size: 12px;
`;
