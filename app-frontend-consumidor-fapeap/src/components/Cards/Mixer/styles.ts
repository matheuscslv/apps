import styled from 'styled-components/native';

interface ITextProps {
  color: string;
}

export const Container = styled.TouchableOpacity`
  background: ${(props) => props.theme.colors.white};
  padding: 10px;
  flex-direction: row;
  margin: 5px 0 0 0;
  align-items: center;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 5px;
  margin-right: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  color: ${(props) => props.theme.colors.title};
`;

export const Text = styled.Text<ITextProps>`
  color: ${(props) => props.color};
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
  color: ${(props) => props.theme.colors.subtitle};
`;

export const Content = styled.View``;
