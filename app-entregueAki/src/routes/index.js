import { createAppContainer } from 'react-navigation';

import DrawerNavigator from './DrawerNavigator';
import { createStackNavigator } from 'react-navigation-stack';
import defaultStackOptions from './defaultStackOptions';

import ProductList from '~/pages/ProductList';
import DetailCompany from '~/pages/DetailCompany';
import DetailRequest from '~/pages/MyRequests/DetailRequest';

import NewAddress from '~/pages/Adresses/NewAddress';
import DetailAddress from '~/pages/Adresses/DetailAddress';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';

import Products from '~/pages/DetailCompany/Section/Products';

const Routes = () => createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: DrawerNavigator,
        navigationOptions: { header: null },
      },
      ProductList: {
        screen: ProductList,
        navigationOptions: {
          ...defaultStackOptions,
          //headerTitle: 'Empresas',
        },
      },
      DetailCompany: {
        screen: DetailCompany,
        navigationOptions: {
          ...defaultStackOptions,
          //headerTitle: 'Empresa',
        },
      },
      Products: {
        screen: Products,
        navigationOptions: {
          ...defaultStackOptions,
          headerTitle: 'Produtos',
        },
      },
      NewAddress: {
        screen: NewAddress,
        navigationOptions: {
          ...defaultStackOptions,
          headerTitle: 'Adicionar Endereço',
        },
      },
      DetailAddress: {
        screen: DetailAddress,
        navigationOptions: {
          ...defaultStackOptions,
          headerTitle: 'Detalhes do Endereço',
        },
      },

      DetailRequest: {
        screen: DetailRequest,
        navigationOptions: {
          ...defaultStackOptions,
          headerTitle: 'Detalhes do Pedido',
        },
      },

      SignIn: {
        screen: SignIn,
        navigationOptions: {
          ...defaultStackOptions,
          headerTitle: 'Entre na Sua Conta',
        },
      },
      SignUp: {
        screen: SignUp,
        navigationOptions: {
          ...defaultStackOptions,
          headerTitle: 'Cadastre-se',
        },
      },
    }
  )
);

export default Routes;
