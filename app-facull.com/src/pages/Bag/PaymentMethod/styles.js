import styled from 'styled-components/native';

import { NunitoBold, colors } from '~/styles';

export const Container = styled.View`
  background: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled.View`
  background: #fff;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding: 20px 30px;
  border-bottom-width: 1.5px;
  border-bottom-color: #f7f7f7;
`;

export const HeaderTitle = styled(NunitoBold)`
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
  color: #333;
  font-family: 'Nunito';
  font-size: 16px;
`;

export const Description = styled.Text`
  font-family: 'Nunito';
  font-size: 14px;
  color: #555;
`;

export const Marker = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  background-color: ${({ selected }) => (selected ? colors.primary : '#fff')};
  border-width: 2px;
  color: #333;
  margin-right: 30px;
`;

export const ImageCard = styled.Image`
  height: 35px;
  width: 40px;
`;
