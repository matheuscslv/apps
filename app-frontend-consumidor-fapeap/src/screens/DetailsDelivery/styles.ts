import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: 'Ubuntu-Bold';
  font-size: 14px;
`;

export const Subtitle = styled.Text`
  font-family: 'Ubuntu-Regular';
  font-size: 14px;
`;

export const BorderBottom = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-top: 10px;
`;

export const StatusView = styled.View`
  margin-top: 10px;
  align-items: center;
`;

export const PrincipalText = styled.Text`
  font-family: Ubuntu-Bold;
  font-size: 18px;
  color: #444444;
  top: 5%;
`;
