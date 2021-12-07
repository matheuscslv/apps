import styled from 'styled-components/native';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
  background: #f7f7f7;
  flex: 1;
  padding: 10px;
`;

export const Content = styled.View`
  background: #fff;
  padding: 10px;
  border-radius: 2px;
  elevation: 5;
  margin-bottom: 10px;
`;

export const Price = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: bold;
  text-transform: uppercase;
`;

export const Session = styled.TouchableOpacity.attrs({
  activeOpacity: 0.3,
})`
  padding-left: 5px;
  padding: 15px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #444;
  font-weight: bold;
  padding: 5px 10px 10px;
`;

export const Info = styled.Text`
  font-size: 16px;
  color: #444;
  padding: 5px 10px;
`;

export const Options = styled.View`
  background: #fff;
  border-radius: 2px;
  elevation: 5;
  margin-bottom: 10px;
`;

export const Item = styled.TouchableOpacity.attrs({
  activeOpacity: 0.3,
})`
  padding-left: 5px;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #f7f7f7;
`;

export const Span = styled.Text`
  font-size: 14px;
  color: #666;
  padding: 5px 10px;
`;
