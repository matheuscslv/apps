import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { defaultStackStyles, StackImageHeaderStyles } from './styles';
const CartRoutes = createStackNavigator();

import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';
import Adresses from '~/pages/Adresses';
import PurchaseDetail from '~/pages/Shopping/PurchaseDetail';
import AddressForm from '~/pages/Adresses/AddressForm';

export default function () {
  const { colors } = useTheme();
  const stackStyles = defaultStackStyles(colors);
  return (
    <CartRoutes.Navigator screenOptions={stackStyles}>
      <CartRoutes.Screen
        name="Main"
        component={Cart}
        options={StackImageHeaderStyles}
      />
      <CartRoutes.Screen
        name="Adresses"
        component={Adresses}
        options={{
          headerTitle: 'Meus endereços',
        }}
      />
       <CartRoutes.Screen
        name="AddressForm"
        component={AddressForm}
        options={{
          headerTitle: 'Endereço de entrega',
        }}
      />
      <CartRoutes.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerTitle: 'Finalização da compra',
        }}
      />
      <CartRoutes.Screen
        name="PurchaseDetail"
        component={PurchaseDetail}
        options={{
          headerTitle: 'Detalhes do pedido',
        }}
      />
    </CartRoutes.Navigator>
  );
}
