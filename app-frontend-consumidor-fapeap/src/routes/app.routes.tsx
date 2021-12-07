import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';

import { somaUnitaria } from '../components/SumTotalBag';
import CartContext from '../contexts/cart';
import DetailsDelivery from '../screens/DetailsDelivery';
import EditProfile from '../screens/EditProfile';
import Home from '../screens/Home';
import Mixer from '../screens/Mixer';
import MyDelivery from '../screens/My delivery';
import Order from '../screens/Order';
import Product from '../screens/Product';
import Profile from '../screens/Profile';
import RecoveryPassword from '../screens/RecoveryPassword';
import Register from '../screens/Register';
import Route from '../screens/Route';
import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        labelStyle: {
          fontFamily: 'Ubuntu-Regular',
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDelivery"
        component={MyDelivery}
        options={{
          tabBarLabel: 'Meus pedidos',
          tabBarIcon: ({ color, size }) => (
            <Icon name="bars" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppRoutes: React.FC = () => {
  const { cart } = useContext(CartContext);
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Order')}
            style={{ marginRight: 10 }}
          >
            <Icon name="shopping-cart" color="#fff" size={30} />

            {cart.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: colors.danger,
                  width: 20,
                  height: 20,
                  borderRadius: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  right: 0,
                  top: 0,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Ubuntu-Bold',
                    fontSize: 11,
                    color: '#fff',
                  }}
                >
                  {somaUnitaria(cart)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ),
      })}
      initialRouteName="Home"
    >
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{
          title: 'Quero Açaí',
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name="Mixer"
        component={Mixer}
        options={{
          title: 'Detalhes da batedeira',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          title: 'Detalhes do Carrinho',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          title: 'Detalhes do Item',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MyDelivery"
        component={MyDelivery}
        options={{
          title: 'Meus pedidos',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Perfil',
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edição de Perfil',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="DetailsDelivery"
        component={DetailsDelivery}
        options={{
          title: 'Detalhes do Pedido',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerRight: () => null,
        }}
      />

      <Stack.Screen
        name="Route"
        component={Route}
        options={{
          title: 'Rota do Pedido',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.primary,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTitleStyle: {
            fontFamily: 'Ubuntu-Bold',
          },
          headerTintColor: '#FFF',
          headerTitleAlign: 'center',
          headerRight: () => null,
        }}
      />

      <Stack.Screen
        name="SignIn"
        options={{ headerShown: false, headerRight: () => null }}
        component={SignIn}
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: false, headerRight: () => null }}
        component={Register}
      />
      <Stack.Screen
        name="RecoveryPassword"
        options={{ headerShown: false, headerRight: () => null }}
        component={RecoveryPassword}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
