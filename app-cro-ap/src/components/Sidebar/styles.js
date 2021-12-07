import styled from "styled-components/native";

export const Container = styled.View``;

export const Header = styled.View`
  padding: 20px 0;

  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
`;

export const User = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: #999;
`;
export const Email = styled.Text.attrs({})`
  font-size: 12px;
  color: #999;
`;

export const Logout = styled.Text`
  font-size: 12px;
  color: #f00;
`;

export const Avatar = styled.Image`
  height: 80;
  width: 80;
  border-radius: 40;
  border-width: 1px;
  border-color: #8b0000;
`;

export const Login = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: #8b0000;
  text-transform: uppercase;
`;

export const LogoutView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;
