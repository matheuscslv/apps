import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import SideBar from '~/Components/SideBar';
import Adresses from '~/pages/Adresses';
import MyCards from '~/pages/MyCards';
import MyRequests from '~/pages/MyRequests';
import Profile from '~/pages/Profile';
import Password from '~/pages/Password';
import { colors } from '~/styles';

import BottomNavigator from './BottomNavigator';
import ButtonDrawer from './buttonDrawer';
import defaultStackOptions from './defaultStackOptions';

export default createDrawerNavigator(
  {
    Main: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="store" size={22} color={tintColor} />
        ),
        title: 'Início',
      },
    },
    Perfil: {
      screen: createStackNavigator(
        { Profile },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Meu perfil',
          },
        }
      ),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="account" size={22} color={tintColor} />
        ),
      },
    },
    'Meus Cartões': {
      screen: createStackNavigator(
        { MyCards },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Meus Cartões',
          },
        }
      ),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="credit-card" size={22} color={tintColor} />
        ),
      },
    },
    'Meus Pedidos': {
      screen: createStackNavigator(
        { MyRequests },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Meus Pedidos',
          },
        }
      ),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="format-list-numbered" size={22} color={tintColor} />
        ),
      },
    },
    Endereços: {
      screen: createStackNavigator(
        { Adresses },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Endereços de Entrega',
          },
        }
      ),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="map-marker" size={22} color={tintColor} />
        ),
      },
    },
    Senha: {
      screen: createStackNavigator(
        { Password },
        {
          defaultNavigationOptions: {
            ...defaultStackOptions,
            headerLeft: ButtonDrawer,
            headerTitle: 'Senha',
          },
        }
      ),
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="lock" size={22} color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: SideBar,
    contentOptions: {
      activeTintColor: colors.primary,
    },
    drawerBackgroundColor: '#f6f6f6',
    drawerWidth: 250,
  }
);
