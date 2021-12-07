import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
} from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, TouchableOpacity, Platform } from 'react-native';
import Complaint from '~/pages/Complaint';
import Help from '~/pages/Help';
import Home from '~/pages/Home';
import Notification from '~/pages/Notification';
import Professionals from '~/pages/Professionals';
import Notices from '~/pages/Notices';
import Detail from '~/pages/Notices/Detail';
import Login from '~/pages/Login';
import Partnerships from '~/pages/Partnerships';
import Wallet from '~/pages/Partnerships/Wallet';
import logo from './assets/brasao.png';
import Sidebar from './components/Sidebar';
import Information from '~/pages/Information';
import { colors } from './styles';

const AppDrawerNavigator = createDrawerNavigator(
  {
    
    Início: {
      screen: Home,
    },
    'Conheça o CRO': {
      screen: Information,
    },
    Notícias: {
      screen: Notices,
    },
    Agenda: {
      screen: Notification,
    },
    'Fale com CRO': {
      screen: Help,
    },
    Profissionais: {
      screen: Professionals,
    },
    Denuncie: {
      screen: Complaint,
    },

    Parcerias: {
      screen: Partnerships,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image
          style={{
            flex: 1,
            width: 38,
            height: 38,
            marginRight: Platform.OS === 'ios' ? 0 : 50,
          }}
          resizeMode="contain"
          source={logo}
        />
      ),
      headerLeft: (
        <TouchableOpacity
          hitSlop={{
            top: 7,
            left: 7,
            right: 7,
            bottom: 7,
          }}
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={{ paddingLeft: 12 }}
        >
          <Icon name="md-menu" size={30} color={colors.primary} />
        </TouchableOpacity>
      ),
    }),
    contentComponent: Sidebar,
    contentOptions: {
      activeTintColor: colors.primary,
    },
    drawerBackgroundColor: '#f6f6f6',
    drawerWidth: 250,
  },
);

const AppStackNavigator = createStackNavigator(
  {
    User: AppDrawerNavigator,
    Login,
    Wallet,
    Detail,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerTitle: (
        <Image
          style={{
            flex: 1,
            width: 38,
            height: 38,
            marginRight: Platform.OS === 'ios' ? 0 : 50,
          }}
          resizeMode="contain"
          source={logo}
        />
      ),
    }),
    headerBackTitleVisible: false
  },
);
const Routes = createAppContainer(AppStackNavigator);

export default Routes;
