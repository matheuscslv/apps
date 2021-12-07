import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
  flex-direction: column;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 10px;
  padding-top: 10px;
`;

export const TextMid = styled.Text`
  font-size: 16px;
  flex-direction: row;
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.title};
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;
