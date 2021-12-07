import styled from 'styled-components/native';
import {colors} from '~/styles/';

export const Container = styled.View`
  flex: 1;
`;

export const ViewImage = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Center = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  height: 100px;
  width: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const ViewImageTitle = styled.Text`
  color: ${colors.primary};
  font-family: 'Quicksand-Regular';
  font-size: 16;
  text-transform: uppercase;
`;

export const ViewImageText = styled.Text`
  color: #999;
  font-family: 'Quicksand-Regular';
  text-transform: uppercase;
`;

export const PasswordInput = styled.TextInput`
  background-color: #eee;
  font-family: 'Quicksand-Regular';
  border-radius: 25px;
  height: 40px;
  width: 100%;
  color: ${colors.regular};
  text-align: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 15px;
  padding-bottom: 0;
  padding-top: 0;
`;
