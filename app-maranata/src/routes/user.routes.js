import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { defaultStackStyles, StackImageHeaderStyles } from './styles';

const UserRoutes = createStackNavigator();

import Profile from '~/pages/Profile';
import About from '~/pages/About';
import AboutMaranata from '~/pages/AboutMaranata';
import Shopping from '~/pages/Shopping';
import PurchaseDetail from '~/pages/Shopping/PurchaseDetail';
import Adresses from '~/pages/Adresses';
import AddressForm from '~/pages/Adresses/AddressForm';
import Account from '~/pages/Account';
import ResetPassword from '~/pages/ResetPassword';
import Cards from '~/pages/Cards';

export default function () {
  const { colors } = useTheme();
  const stackStyles = defaultStackStyles(colors);

  return (
    <UserRoutes.Navigator screenOptions={stackStyles}>
      <UserRoutes.Screen
        name="Main"
        component={Profile}
        options={StackImageHeaderStyles}
      />
      <UserRoutes.Screen
        name="Adresses"
        component={Adresses}
        options={{
          headerTitle: 'Meus endereços',
        }}
      />
      <UserRoutes.Screen
        name="AddressForm"
        component={AddressForm}
        options={{
          headerTitle: 'Endereço de entrega',
        }}
      />
      <UserRoutes.Screen
        name="Shopping"
        component={Shopping}
        options={{
          headerTitle: 'Meus pedidos',
        }}
      />
      <UserRoutes.Screen
        name="PurchaseDetail"
        component={PurchaseDetail}
        options={{
          headerTitle: 'Detalhes do pedido',
        }}
      />
      <UserRoutes.Screen
        name="AboutMaranata"
        component={AboutMaranata}
        options={{
          headerTitle: 'Sobre a maranata',
        }}
      />
      <UserRoutes.Screen
        name="About"
        component={About}
        options={{
          headerTitle: 'Sobre o APP',
        }}
      />
      <UserRoutes.Screen
        name="Account"
        component={Account}
        options={{
          headerTitle: 'Minha conta',
        }}
      />
      <UserRoutes.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTitle: 'Altere sua senha',
        }}
      />
      <UserRoutes.Screen
        name="Cards"
        component={Cards}
        options={{
          headerTitle: 'Meus cartões',
        }}
      />
    </UserRoutes.Navigator>
  );
}
