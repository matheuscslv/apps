import styled from 'styled-components/native';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled.View`
  background: ${({ theme }) => theme.colors.white};
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding: 20px 30px;
  border-bottom-width: 1.5px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
  font-size: 20px;
  margin-left: 20px;
`;

export const Body = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 70,
  },
})`
  max-height: 80%;
`;

export const ItemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.darker};
  font-size: 16px;
`;

export const Description = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 14px;
`;

export const Marker = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.white};
  border-width: 2px;
  color: ${({ theme }) => theme.colors.darker};
  margin-right: 30px;
`;

export const ImageCard = styled.Image`
  height: 35px;
  width: 40px;
`;
