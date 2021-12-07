import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  background: ${(props) => props.theme.colors.white};
  flex-direction: row;
  margin: 10px 0 0 0;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 14px;
  color: ${(props) => props.theme.colors.title};
`;

export const Text = styled.Text`
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
  color: ${(props) => props.theme.colors.subtitle};
`;

export const Content = styled.View``;
