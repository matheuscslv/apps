import { TextInputMask } from 'react-native-masked-text';

import styled from 'styled-components/native';

import { colors } from '~/styles';

export const Label = styled.Text`
  color: ${colors.titleColor};
  font-size: 14px;
  margin: 10px 0;
  font-family:"Quicksand-Regular";
`;

export const SampleInput = styled.TextInput`
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.subTitleColor};
  height: 44px;
  padding: 0 15px;
  color: ${({ editable }) =>
    editable ? colors.textInput : colors.subTitleColor};
  font-family:"Quicksand-Regular";
`;

export const InputMask = styled(TextInputMask)`
  border-bottom-width: 0.5px;
  border-bottom-color: ${colors.subTitleColor};
  font-family:"Quicksand-Regular";
  height: 44px;
  padding: 0 15px;
  color: ${({ editable }) =>
    editable ? colors.textInput : colors.subTitleColor};
`;

export const Error = styled.Text`
  color: #f00;
  font-size: 12px;
  font-weight: normal;
`;

export const Info = styled.Text`
  font-size: 10px;
`;
