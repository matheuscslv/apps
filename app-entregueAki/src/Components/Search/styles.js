import styled from 'styled-components/native';
import { colors, metrics } from '~/styles';
export const Container = styled.View`
  flex-direction: row;
  margin: 10px 0;
  justify-content: space-between;
  align-items: stretch;
  align-self: stretch;
  border-radius: 0px;
  border-color: ${colors.primary};
  border-width: 1px;
`;

export const InputSearch = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  maxLength: 50,
})`
width: 80%;
color: ${colors.primary};
  height: 44px;
  padding: 0px 15px;
  margin-right: 10px;
  font-family:'Quicksand-Bold';
 /*  border-radius: 2px;
  border-color: ${colors.border};
  border-width: 1px; */
`;

export const ButtonClear = styled.TouchableOpacity.attrs({})`
  height: 44px;
  width: 5%;
  margin-right: 10px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;
