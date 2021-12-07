import React, { useContext } from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesRoutes from './categories.routes';
import HomeRoutes from './home.routes';
import CartRoutes from './cart.routes';
import UserRoutes from './user.routes';
import ButtonBag from '~/components/ButtonBag';
import ButtonProfile from '~/components/ButtonProfile';

const Tabs = createBottomTabNavigator();

export default function Routes() {
  const { colors } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#312e38',
        },
      }}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: '#999',
        activeBackgroundColor: '#fff',
        style: {
          backgroundColor: '#fff',
          borderTopWidth: 0.6,
          borderTopColor: '#ebebeb',
          height: 60 + getBottomSpace(),
          paddingBottom: 5 + +getBottomSpace(),
          paddingTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Products"
        component={HomeRoutes}
        options={{
          title: 'Produtos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Categories"
        component={CategoriesRoutes}
        options={{
          title: 'Departamentos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="format-list-bulleted-type" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CartRoutes}
        options={{
          title: 'Carrinho',
          tabBarIcon: ButtonBag,
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={UserRoutes}
        options={{
          title: 'Minha Conta',
          tabBarIcon: ButtonProfile,
        }}
      />
    </Tabs.Navigator>
  );
}
