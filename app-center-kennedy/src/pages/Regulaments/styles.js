import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #f7f7f7;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  background: #fff;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f1f1f1;
`;

export const Title = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 16px;
`;

export const SubTitle = styled.Text`
  margin-top: 3px;
  color: #999;
  font-size: 14px;
  line-height: 20px;
`;
