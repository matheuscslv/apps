import { Animated } from 'react-native';
import FaIcon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  background: transparent;
  position: absolute;
  z-index: 10;
  top: 0;
  overflow: hidden;
`;

export const SuggestionContent = styled(Animated.View)`
  margin: 15px 0;
  background-color: #fff;
  shadow-radius: 2.22px;
  shadow-opacity: 0.22;
  shadow-offset: 0 1px;
  shadow-color: #000;

  elevation: 3;
`;

export const SuggestionItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;

  background-color: #fff;
  padding: 0 10px;
  height: 54px;
`;

export const Name = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
  padding: 0 10px;
`;

export const Icon = styled(FaIcon)`
  font-size: 26px;
  color: #999;
  padding: 0 5px;
`;
