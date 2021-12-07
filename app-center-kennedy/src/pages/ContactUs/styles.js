import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 20px;
  flex: 1;
  background-color: #fff;
`;

export const Title = styled.Text`
  color: #555;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  line-height: 24px;
`;

export const SubTitle = styled.Text`
  color: #999;
  font-size: 14px;
  line-height: 22px;
  text-align: center;
`;

export const Content = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background: #fff;
  border-bottom-color: #f1f1f1;
  border-bottom-width: 1px;
`;

export const Number = styled.Text`
  color: #333;
  font-size: 16px;
`;
