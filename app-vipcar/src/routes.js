import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import logo from '~/assets/logo.png';

import Login from '~/pages/Login';
import Home from '~/pages/Home';
import Detail from '~/components/Detail';

//https://codedaily.io/tutorials/52/Create-an-Instagram-Press-and-Hold-Image-Preview-Modal-with-Gesture-Actions-in-React-Native
//https://stackoverflow.com/questions/49915297/how-to-display-blob-image-in-react-native

//const Routes = createAppContainer(createStackNavigator({Login, Home, Detail}));

const Routes = (userLogged = false) =>
  createAppContainer(
    createStackNavigator(
      {
        Login,
        Home,
        Detail,
      },
      {
        defaultNavigationOptions: ({navigation}) => ({
          headerBackTitle: null,
        }),
        initialRouteName: userLogged ? 'Home' : 'Login',
      },
    ),
  );

/* Login.navigationOptions = ({navigation}) => ({
  headerStyle: {backgroundColor: '#414a69'},
  headerTintColor: '#fff',
  headerTitle: 'Faça seu login',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
  headerRight: <TouchableOpacity></TouchableOpacity>,
}); */

export default Routes;
