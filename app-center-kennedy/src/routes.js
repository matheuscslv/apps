import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {colors} from '~/styles';
import Home from '~/pages/Home';
import Departments from '~/pages/Departments';
import SubDepartments from '~/pages/Departments/SubDepartments';
import Account from '~/pages/Account';
import Cart from '~/pages/Cart';
import Warranty from '~/pages/Cart/Warranty';
import Results from '~/components/Results';
import Login from '~/pages/Login';
import Search from '~/pages/Search';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
import PasswordAccess from '~/pages/PasswordAccess';
import Regulaments from '~/pages/Regulaments';
import RegulamentDetail from '~/pages/Regulaments/Detail';
import DetailProduct from '~/components/DetailProduct';
import ContactUs from '~/pages/ContactUs';
import PrivacyPolicies from '~/pages/PrivacyPolicies';
import Doubts from '~/pages/Doubts';
import CredCard from '~/pages/CredCard';
import Adresses from '~/pages/Adresses';
import MapStores from '~/pages/MapStores';

import {StackActions, NavigationActions} from 'react-navigation';

const defaultOptionStackNavigator = {
  headerStyle: {
    backgroundColor: colors.primary,
  },
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitle: 'Center Kennedy',
};

/* : createStackNavigator(
      {Home, Cupom, Perfil, Login},
      {
        defaultNavigationOptions: defaultOptionStackNavigator,
      },
    ), */
const MainTabBottomNavigator = createBottomTabNavigator(
  {
    Inicio: createStackNavigator(
      {Home},
      {
        defaultNavigationOptions: {
          ...defaultOptionStackNavigator,
          headerRight: (
            <TouchableOpacity style={{marginRight: 10}}>
              <Icon name="magnify" size={35} color="#fff" />
            </TouchableOpacity>
          ),
        },
      },
    ),
    Departamentos: createStackNavigator(
      {Departments},
      {
        defaultNavigationOptions: defaultOptionStackNavigator,
      },
    ),
    Carrinho: createStackNavigator(
      {Cart},
      {
        defaultNavigationOptions: defaultOptionStackNavigator,
      },
    ),
    Conta: createStackNavigator(
      {Account},
      {
        defaultNavigationOptions: defaultOptionStackNavigator,
      },
    ),
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      header: null,
      tabBarIcon: ({tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Inicio':
            iconName = 'home';
            break;
          case 'Departamentos':
            iconName = 'format-list-bulleted';
            break;
          case 'Carrinho':
            iconName = 'cart-outline';
            break;
          case 'Conta':
            iconName = 'account-outline';
            break;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FFF',
      activeBackgroundColor: '#2d8e66',
      inactiveTintColor: '#FFF',
      style: {
        backgroundColor: colors.primary,
      },
    },
  },
);

const Routes = (userLogged = false) =>
  createAppContainer(
    createStackNavigator(
      {
        Main: {
          screen: MainTabBottomNavigator,
          navigationOptions: {header: null},
        },
        Login,
        Search,
        Home,
        SubDepartments,
        Results,
        DetailProduct,
        Cart,
        Warranty,
        Profile,
        Register,
        PasswordAccess,
        Regulaments,
        RegulamentDetail,
        ContactUs,
        PrivacyPolicies,
        Doubts,
        CredCard,
        Adresses,
        MapStores,
      },
      {
        defaultNavigationOptions: defaultOptionStackNavigator,
      },
    ),
  );

export default Routes;
