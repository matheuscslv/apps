import styled from 'styled-components/native';

interface ITextProps {
  color: string;
  size: number;
}

export const Container = styled.View`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 21px;
  color: ${(props) => props.theme.colors.title};
`;

export const Text = styled.Text<ITextProps>`
  color: ${(props) => props.theme.colors.subtitle};
  font-size: ${(props) => props.size}px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;
