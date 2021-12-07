import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ButtonBag from '~/Components/ButtonBag';
import ButtonProfile from '~/Components/ButtonProfile';
import Cart from '~/pages/Cart';
import Category from '~/pages/Category';
import MyRequests from '~/pages/MyRequests';
import { colors } from '~/styles';

import ButtonDrawer from './buttonDrawer';
import defaultStackOptions from './defaultStackOptions';

import ProductList from '~/pages/ProductList';
import DetailCompany from '~/pages/DetailCompany';
import Products from '~/pages/DetailCompany/Section/Products';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

export default createBottomTabNavigator(
  {
    Inicio: {
      screen: createStackNavigator(
        {
          Category: {
            screen: Category,
            navigationOptions: {
              headerLeft: ButtonDrawer
            },
          },
          ProductList, DetailCompany,
          Products: {
            screen: Products,
            navigationOptions: {
              headerTitle: "Produtos"
            },
          }
        },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            //headerLeft: ButtonDrawer,
            headerTitle: 'Início',
          },
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="store" size={28} color={tintColor} />
        ),
        tabBarLabel: 'Início',
      }),
    },
    Cesta: {
      screen: createStackNavigator(
        { Cart },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Minhas Cestas',
          },
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <ButtonBag tintColor={tintColor} />,
        tabBarLabel: 'Cestas',
      }),
    },
    Pedidos: {
      screen: createStackNavigator(
        {
          MyRequests,
        },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Pedidos',
          },
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => <ButtonProfile tintColor={tintColor} />,
        tabBarLabel: 'Pedidos',
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: true,
      activeTintColor: colors.primary,
      inactiveTintColor: '#999',
      activeBackgroundColor: '#fff',
      style: {
        backgroundColor: '#fff',
        borderTopWidth: 0.6,
        borderTopColor: '#ebebeb',
        height: 60,
        paddingBottom: 5,
        paddingTop: 5,
      },
    },
  }
);
