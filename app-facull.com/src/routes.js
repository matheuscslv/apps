import React from 'react';
import { Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import account from '~/assets/account.png';
import Logo from '~/assets/facull.png';
import menu_rounded from '~/assets/menu_rounded.png';
import menu from '~/assets/menu.png';
import bag from '~/assets/take-away-food.png';
import ButtonBag from '~/Components/ButtonBag';
import About from '~/pages/About';
import Bag from '~/pages/Bag';
import Cards from '~/pages/Cards';
import Category from '~/pages/Category';
import ListAllProducts from '~/pages/ListAllProducts';
import ProductList from '~/pages/ProductList';
import Profile from '~/pages/Profile';
import Account from '~/pages/Profile/Account';
import Address from '~/pages/Profile/Address';
import ResetPassword from '~/pages/Profile/ResetPassword';
import PurchaseConfirmation from '~/pages/PurchaseConfirmation';
import Shopping from '~/pages/Shopping';
import PurchaseDetail from '~/pages/Shopping/PurchaseDetail';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import { colors } from '~/styles';

import ButtonProfile from '~/Components/ButtonProfile';

const defaultOptionStackNavigator = {
  headerStyle: {
    height: Platform.OS === 'ios' ? 80 : 70,
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  // headerLeft: <View />,
  headerTitle: (
    <Image
      style={{
        height: 25,
        width: 150,
        alignSelf: 'flex-start',
      }}
      resizeMode="contain"
      source={Logo}
    />
  ),
  // headerRight: <View />,
  headerBackTitleVisible: false,
};

const MainTabBottomNavigator = createBottomTabNavigator(
  {
    Listagem: {
      screen: createStackNavigator(
        { ListAllProducts },
        {
          defaultNavigationOptions: defaultOptionStackNavigator,
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={menu}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        ),
      }),
    },
    Inicio: {
      screen: createStackNavigator(
        { Category, ProductList },
        {
          defaultNavigationOptions: defaultOptionStackNavigator,
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={menu_rounded}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        ),
      }),
    },
    Sacola: {
      screen: createStackNavigator(
        { Bag, Cards, PurchaseConfirmation },
        {
          defaultNavigationOptions: defaultOptionStackNavigator,
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <ButtonBag tintColor={focused ? colors.secundary : colors.primary} />
        ),
      }),
    },
    Conta: {
      screen: createStackNavigator(
        {
          Profile,
          Address,
          Account,
          ResetPassword,
          Shopping,
          PurchaseDetail,
          About,
          Cards,
        },
        {
          defaultNavigationOptions: defaultOptionStackNavigator,
        }
      ),
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor, focused }) => (
          <ButtonProfile
            tintColor={focused ? colors.secundary : colors.primary}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#FFF',
      activeBackgroundColor: colors.secundary,
      inactiveTintColor: '#FFF',
      style: {
        backgroundColor: colors.primary,
        borderTopWidth: 0,
        height: 65,
      },
    },
  }
);

const Routes = (userLogged = false) =>
  createAppContainer(
    createStackNavigator(
      {
        Main: {
          screen: MainTabBottomNavigator,
          navigationOptions: { header: null },
        },
        ProductList,
        SignUp,
        SignIn,
        ResetPassword,
      },
      {
        defaultNavigationOptions: defaultOptionStackNavigator,
      }
    )
  );

export default Routes;
