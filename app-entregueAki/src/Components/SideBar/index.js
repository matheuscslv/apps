import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';
import { DrawerItems } from 'react-navigation-drawer';
import { useDispatch, useSelector } from 'react-redux';

import { UserTypes } from '~/store/ducks/user';
import { colors } from '~/styles';

import { Container, LogoutButton, LogoutText, Header, Session } from './styles';
import store from '~/services/storage';

/* import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk'; */

import logout from '~/Components/Logout';

function SideBar(props) {
  const dispatch = useDispatch();

  const token = useSelector(state => state.user.token);
  const user = useSelector(state => state.user.data);

  const [loading, setLoading] = useState(false);
  const { items, ...rest } = props;

  useEffect(() => {
    /*  GoogleSignin.configure({
       webClientId:
         Platform.OS == 'ios'
           ? '247632958355-9uebldrr58pohb8lqa3gfdmnm8gj0ds5.apps.googleusercontent.com'
           : '247632958355-sui9371tf19ge6phjduat1l1rj3al4nu.apps.googleusercontent.com',

       offlineAccess: true,
       hostsDomain: '',
       loginHint: '',
       forceConsentPrompt: true,
       accountName: '',
       iosClientId:
         Platform.OS == 'ios'
           ? '247632958355-9uebldrr58pohb8lqa3gfdmnm8gj0ds5.apps.googleusercontent.com'
           : '247632958355-sui9371tf19ge6phjduat1l1rj3al4nu.apps.googleusercontent.com',
     }); */
  }, []);

  function handleLogout() {
    Alert.alert(
      'Atenção',
      `Deseja mesmo sair de sua conta?`,
      [
        {
          text: 'NÃO',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => {
            setLoading(true);

            try {
              logout();
            } catch (error) {
              alert(error)
            }

            dispatch({
              type: UserTypes.GET_LOGOUT_REQUEST,
              setLoading
            });

            props.navigation.navigate("SignIn")
          },
        },
      ],
      { cancelable: false }
    );
  }

  function verifyAuth(route) {
    if (route.route.key == "Main") {
      props.onItemPress(route);
    } else {
      if (token == null) {
        props.navigation.navigate("SignIn")
      } else {
        props.onItemPress(route);
      }
    }
    return;
  }

  return (
    <Container>
      <ScrollView>
        <Header>
          <Session>Menu</Session>
        </Header>
        <DrawerItems items={items} {...rest} onItemPress={(route) => verifyAuth(route)} />
        {token &&
          <LogoutButton onPress={handleLogout}>
            {loading ? (
              <ActivityIndicator
                style={{ marginLeft: 4 }}
                size="small"
                color={colors.danger}
              />
            ) : (
                <Icon name="account-minus" size={25} color={"#f00"} />
              )}
            <LogoutText>Sair da conta</LogoutText>
          </LogoutButton>
        }
      </ScrollView>
    </Container>
  );
}

export default withNavigation(SideBar);
