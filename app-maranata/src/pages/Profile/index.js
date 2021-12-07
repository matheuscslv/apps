import React from 'react';
import { View, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { ShoppingTypes } from '~/store/ducks/shopping';
import { UserTypes } from '~/store/ducks/user';
import { WalletTypes } from '~/store/ducks/wallet';

import {
  Container,
  Header,
  Welcome,
  Email,
  Option,
  Content,
  IconItem,
  IconSelectItem,
  TextItem,
  ContentLoginRequired,
  TextLoginRequired,
  Tooltip,
  TooltipText,
} from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user.data);
  const total = useSelector((state) => state.shopping.notification);

  function handleLogin() {
    navigation.navigate('Auth');
  }

  function handleLogout() {
    Alert.alert(
      'Atenção',
      'Deseja mesmo sair de sua conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            dispatch({
              type: UserTypes.GET_LOGOUT_REQUEST,
            });
            dispatch({
              type: WalletTypes.RESET_DATA,
            });
            dispatch({
              type: ShoppingTypes.RESET_SHOPPING_DATA,
            });
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      {userLogged ? (
        <>
          <Header>
            <Welcome>Olá, {userLogged.name}</Welcome>
            <Email>{userLogged.email}</Email>
          </Header>
          <Option onPress={() => navigation.navigate('Account')}>
            <Content>
              <IconItem name="user" />
              <TextItem>Minha conta</TextItem>
            </Content>
            <IconSelectItem />
          </Option>
          <Option onPress={() => navigation.navigate('Adresses')}>
            <Content>
              <IconItem name="location" />
              <TextItem>Meus endereços</TextItem>
            </Content>
            <IconSelectItem />
          </Option>
          <Option onPress={() => navigation.navigate('ResetPassword')}>
            <Content>
              <IconItem name="lock" />
              <TextItem>Alterar senha</TextItem>
            </Content>
            <IconSelectItem />
          </Option>
          <Option onPress={() => navigation.navigate('Shopping')}>
            <Content>
              <IconItem name="cart" />
              <TextItem>Meus pedidos</TextItem>
            </Content>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {total > 0 && (
                <Tooltip>
                  <TooltipText>{total}</TooltipText>
                </Tooltip>
              )}
              <IconSelectItem />
            </View>
          </Option>
          <Option onPress={() => navigation.navigate('Cards')}>
            <Content>
              <IconItem name="credit-card" />
              <TextItem>Meus cartões</TextItem>
            </Content>
            <IconSelectItem />
          </Option>
          <Option onPress={() => navigation.navigate('AboutMaranata')}>
            <Content>
              <IconItem name="exclamation" />
              <TextItem>Sobre a maranata</TextItem>
            </Content>
            <IconSelectItem />
          </Option>
          <Option onPress={() => navigation.navigate('About')}>
            <Content>
              <IconItem name="question" />
              <TextItem>Sobre o app</TextItem>
            </Content>
            <IconSelectItem />
          </Option>
          <Option onPress={handleLogout}>
            <Content>
              <IconItem name="minus" />
              <TextItem>Sair da minha conta</TextItem>
            </Content>
          </Option>
        </>
      ) : (
        <ContentLoginRequired>
          <TextLoginRequired>
            Faça login para efetuar compras e acessar seu perfil
          </TextLoginRequired>
          <Button title="Fazer login" onSubmit={handleLogin} width="50%" />
        </ContentLoginRequired>
      )}
    </Container>
  );
}
