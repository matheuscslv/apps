import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { withNavigation } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { useSelector, useDispatch } from 'react-redux';

import profile from '~/assets/profile.png';
import { UserTypes } from '~/store/ducks/user';
import { colors } from '~/styles';

import {
  Container,
  Header,
  User,
  Email,
  Avatar,
  LogoutButton,
  LogoutText,
} from './styles';

function SideBar(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { items, ...rest } = props;
  const filteredItems = items.filter(item => item.key !== 'Perfil');
  const email = useSelector(state => state.user.data?.email);
  const name = useSelector(state => state.user.data?.name);
  const avatar = useSelector(state => state.user.data?.url);

  function handleLogout() {
    Alert.alert(
      'Atenção',
      `Deseja mesmo sair de sua conta?`,
      [
        {
          text: 'NÃO',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => {
            setLoading(true);
            dispatch({
              type: UserTypes.HANDLE_LOGOUT_REQUEST,
              setLoading: () => setLoading(false),
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Perfil');
        }}
      >
        <Header>
          <Avatar source={avatar ? { uri: avatar } : profile} />
          <User>{name}</User>
          <Email>{email}</Email>
        </Header>
      </TouchableOpacity>
      <ScrollView>
        <DrawerItems items={filteredItems} {...rest} />
        <LogoutButton onPress={handleLogout}>
          {loading ? (
            <ActivityIndicator
              style={{ marginLeft: 4 }}
              size="small"
              color={colors.danger}
            />
          ) : (
            <Icon name="close-o" size={30} color={colors.danger} />
          )}
          <LogoutText>SAIR</LogoutText>
        </LogoutButton>
      </ScrollView>
    </Container>
  );
}

export default withNavigation(SideBar);
