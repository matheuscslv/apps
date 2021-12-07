import styled from 'styled-components/native';

import { NunitoSemiBold, NunitoBold, colors } from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  padding: 20px 0;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

export const User = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: #999;
  margin: 5px 0;
`;
export const Session = styled.Text`
  font-size: 12px;
  color: #999;
`;

export const Avatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border-width: 1px;
  border-color: #fff;
  margin: 10px 0;
`;

export const Login = styled.Text`
  font-size: 14px;
  color: #f00;
  text-transform: uppercase;
`;

export const LogoutButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;

  border-top-width: 1px;
  border-top-color: #ddd;
`;

export const LogoutText = styled(NunitoBold)`
  margin-left: 30px;
  color: #f00;
`;
