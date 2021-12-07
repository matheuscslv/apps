import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

export const Center = styled.View`
  margin: 10px;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  height: 150px;
  width: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
`;

export const BoxProfile = styled.View`
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 10px;
`;

export const ViewProfile = styled.View`
  align-items: center;
  margin-top: 10px;
  padding-bottom: 15px;
`;

export const Avatar = styled.View`
  background-color: #aaa;
  height: 70px;
  width: 70px;
  border-radius: 65;
  justify-content: center;
  align-items: center;
`;

export const Icone = styled(Icon)`
  margin-right: 10px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-family: 'Quicksand-Bold';
`;

export const Email = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: 14px;
`;

export const Informations = styled.View`
  justify-content: center;
  align-items: center;
`;

export const TextAvatar = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
`;

export const Top = styled.View`
  background-color: #efeef4;
  padding-horizontal: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;
export const Info = styled.Text`
  font-family: 'Quicksand-Regular';
  font-size: 12px;
`;

export const Session = styled.Text`
  font-family: 'Quicksand-Regular';
  margin-top: 4px;
  font-size: 16px;
  margin-left: 4px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const Item = styled.View``;

export const NameItem = styled.Text`
  font-family: 'Quicksand-Regular';
  color: #111;
  margin-left: 10px;
  text-transform: uppercase;
`;

export const Logout = styled.Text`
  color: #f00;
  text-transform: uppercase;
`;

export const BoxNotify = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 10px;
  height: 44px;
  border-bottom-color: #f6f6f6;
  border-bottom-width: 1px;
`;

export const BoxLogout = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-horizontal: 10px;
  height: 44px;
  border-top-color: #f6f6f6;
  border-top-width: 1px;
`;
