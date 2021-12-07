import styled from 'styled-components/native';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView``;

export const ContainerModal = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 50px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ViewModal = styled.View`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${colors.primary};
  padding: 10px 20px;
  width: 100%;
`;

export const TitleModal = styled.Text`
  color: ${colors.primary};
  font-size: 18px;
  padding: 10px 0;
  border-bottom-color: #999;
  border-bottom-width: 1px;
  margin-bottom: 8px;
`;

export const Option = styled.TouchableOpacity`
  padding: 15px 0;
  border-bottom-color: #f3f3f3;
  border-bottom-width: 1px;
  justify-content: center;
`;

export const OptionText = styled.Text`
  color: #555;
  font-size: 15px;
`;
