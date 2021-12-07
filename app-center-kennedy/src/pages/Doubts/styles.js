import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background: #f6f6f6;
`;

export const Title = styled.Text.attrs({
  activeOpacity: 0.5,
})`
  color: #666;
  font-size: 14px;
`;

export const Info = styled.Text`
  padding: 20px;
  color: #222;
  font-size: 14px;
  text-align: justify;
`;
