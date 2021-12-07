import React from 'react';
import { TouchableOpacity } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Detail from '~/pages/Detail';
import Login from '~/pages/Login';
import { colors, NunitoBold } from '~/styles';

import AppDrawerNavigator from './MainDrawerNavigator';

const defaultOptionStackNavigator = ({ navigation }) => {
  return {
    headerStyle: {
      backgroundColor: colors.secundary,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      }
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => {
      if (navigation.state.routeName === 'Login') {
        return null;
      }

      const { params } = navigation.state.routes[0].routes[0].routes[0];

      if (navigation.state.index !== 0) {
        return null;
      }

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => params.refresh()}
        >
          <FAIcon
            name="repeat"
            size={20}
            color={colors.primary}
            style={{ paddingRight: 12 }}
          />
        </TouchableOpacity>
      );
    },
    headerTitle: () => {
      if (navigation.state.routeName === 'Login') {
        return null;
      }

      const { index } = navigation.state.routes[0];

      if (navigation.state.index !== 0) {
        return null;
      }

      switch (index) {
        case 0:
          return (
            <NunitoBold
              style={{
                color: colors.primary,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Vigentes
            </NunitoBold>
          );
        case 1:
          return (
            <NunitoBold
              style={{
                color: colors.primary,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Finalizadas
            </NunitoBold>
          );
        case 2:
          return (
            <NunitoBold
              style={{
                color: colors.primary,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Minhas
            </NunitoBold>
          );
        default:
          return null;
      }
    },
  };
};

const Routes = (userLogged = false) =>
  createAppContainer(
    createStackNavigator(
      {
        Main: {
          screen: AppDrawerNavigator,
        },
        Login,
        Detail,
      },
      {
        initialRouteName: userLogged ? 'Main' : 'Login',
        defaultNavigationOptions: defaultOptionStackNavigator,
      }
    )
  );

export default Routes;
