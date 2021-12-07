import React, {
  useCallback,
  useState,
  useRef,
  createRef,
  forwardRef,
  useEffect,
} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import logo from '~/assets/logo-app-mobile.png';
import { UserTypes } from '~/store/ducks/user';

import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';

import ModalForgotPassword from './ForgotPassword';
import {
  Container,
  Header,
  Logo,
  Content,
  Scroll,
  ForgotPasswordButton,
  ForgotPasswordText,
  Actions,
  SignInButton,
  SignInText,
  SignUpButton,
  SignUpText,
  OrText,
  ContentAuth,
  Button1,
  IconButton,
  TextButton,
} from './styles';

import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import api from '~/services/api';
import store from '~/services/storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import appleAuth, {
  AppleButton,
  AppleAuthRequestOperation,
  AppleAuthRequestScope,
  AppleAuthCredentialState,
} from '@invertase/react-native-apple-authentication';

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalForgotPassword, setModal] = useState(false);
  const passwordRef = createRef();
  const emailRef = createRef();

  const requestManager = new GraphRequestManager();

  const [auth, setAuth] = useState({
    userInfo: null,
    logged: false,
  });

  useEffect(() => {
    GoogleSignin.configure({
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
    });
  }, []);

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setAuth({ userInfo: userInfo, logged: true });
      //alert(JSON.stringify(userInfo.user));

      setLoading(true);
      api
        .post('/login', {
          email: userInfo.user.email,
          password: userInfo.user.id,
        })
        .then((response) => {
          if (!response.data.status) {
            handleSignUpGoogle(userInfo.user, userInfo.idToken);
          } else {
            handleSubmitGoogle(
              userInfo.user.email,
              userInfo.user.id,
              userInfo.idToken
            );
          }
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        //alert(String(error))
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
        //alert(String(error))
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        //alert(String(error))
      } else {
        // some other error happened
      }
      alert(String(error));
      console.log(String(error));
    }
  }

  async function handleSubmitGoogle(email, password, idToken) {
    setLoading(true);

    await store.save('idToken', idToken);

    dispatch({
      type: UserTypes.GET_DATA_REQUEST,
      email,
      password,
      setLoading,
    });
  }

  async function handleSignUpGoogle(values, idToken) {
    setLoading(true);
    const data = {
      name: values.name,
      email: values.email,
      telefone: '',
      password: values.id,
    };

    await store.save('idToken', idToken);

    dispatch({
      type: UserTypes.GET_REGISTER_REQUEST,
      data,
      setLoading,
    });
  }

  const navigateSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, []);

  function handleSubmit() {
    setLoading(true);
    dispatch({
      type: UserTypes.GET_DATA_REQUEST,
      email,
      password,
      setLoading,
    });
  }

  async function handleSubmitFB(email, password, access_token) {
    setLoading(true);

    await store.save('access_token', access_token);

    dispatch({
      type: UserTypes.GET_DATA_REQUEST,
      email,
      password,
      setLoading,
    });
  }

  async function handleSignUp(values, access_token) {
    setLoading(true);
    const data = {
      name: values.first_name + ' ' + values.last_name,
      email: values.email,
      telefone: '',
      password: values.id,
    };

    await store.save('access_token', access_token);

    dispatch({
      type: UserTypes.GET_REGISTER_REQUEST,
      data,
      setLoading,
    });
  }

  async function facebookLogin() {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    LoginManager.logInWithPermissions([
      'public_profile',
      'user_friends',
      'email',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          let access_token = '';
          AccessToken.getCurrentAccessToken().then((data) => {
            access_token = data.accessToken.toString();
            const request = new GraphRequest(
              '/me',
              {
                parameters: {
                  fields: {
                    string: 'id, first_name, last_name, email', // what you want to get
                  },
                  access_token: {
                    string: access_token, // put your accessToken here
                  },
                },
              },
              (error, result) => {
                if (result) {
                  //const profile = result;
                  //profile.avatar = `https://graph.facebook.com/${result.id}/picture`;
                  //const formatDate = profile.birthday.split('/');
                  //profile.birthday = `${formatDate[1]}/${formatDate[0]}/${formatDate[2]}`;

                  //setProfileFacebook(profile);
                  //setAccessToken(access_token);

                  setLoading(true);
                  api
                    .post('/login', {
                      email: result.email,
                      password: result.id,
                    })
                    .then((response) => {
                      if (!response.data.status) {
                        handleSignUp(result, access_token);
                      } else {
                        handleSubmitFB(result.email, result.id, access_token);
                      }
                    });

                  /* navigation.navigate('Register', {
                    data_user: profile,
                  }); */
                } else {
                  alert('Erro na autenticação');
                }
              }
            );

            requestManager.addRequest(request).start();
          });
        }
      },
      function (error) {
        alert('Login fail with error: ' + error);
      }
    );
  }

  async function handleSubmitApple(email, password, authorizationCode) {
    setLoading(true);

    await store.save('authorizationCode', authorizationCode);

    dispatch({
      type: UserTypes.GET_DATA_REQUEST,
      email,
      password,
      setLoading,
    });
  }

  async function handleSignUpApple(values, authorizationCode) {
    setLoading(true);
    const data = {
      name: values.fullName.givenName,
      email: values.email,
      telefone: '',
      password: values.email,
    };

    await store.save('authorizationCode', authorizationCode);

    dispatch({
      type: UserTypes.GET_REGISTER_REQUEST,
      data,
      setLoading,
    });
  }

  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    // get current authentication state for user
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
      setLoading(true);
      api
        .post('/login', {
          email: appleAuthRequestResponse.email,
          password: appleAuthRequestResponse.email,
        })
        .then((response) => {
          if (!response.data.status) {
            handleSignUpApple(appleAuthRequestResponse, appleAuthRequestResponse.authorizationCode);
          } else {
            handleSubmitApple(
              appleAuthRequestResponse.email,
              appleAuthRequestResponse.email,
              appleAuthRequestResponse.authorizationCode
            );
          }
        });
    }
  }

  return (
    <Container>
      <ScrollView>
        <Header>
          <Logo source={logo} />
        </Header>
        <Content>
          <InputDefault
            title="Email"
            placeholder="Informe seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onSubmitEditing={() => passwordRef.current.focus()}
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <InputDefault
            title="Senha"
            placeholder="Sua senha secreta"
            value={password}
            onChangeText={setPassword}
            returnKeyType="send"
            secureTextEntry
            ref={passwordRef}
          />

          <ForgotPasswordButton onPress={() => setModal(true)}>
            <ForgotPasswordText>Esqueceu a senha ?</ForgotPasswordText>
          </ForgotPasswordButton>
        </Content>
        <Actions>
          <ButtonDefault
            onSubmit={handleSubmit}
            loading={loading}
            title="ENTRAR"
            width="60%"
          />

          <ContentAuth>
            <Button1 bk="#3E569C" onPress={facebookLogin}>
              <IconButton name="facebook" />
              <TextButton style={{ marginLeft: 40 }}>Facebook</TextButton>
            </Button1>

            <Button1 bk="	#DB4C2C" onPress={signIn}>
              <IconButton name="google" />
              <TextButton style={{ marginLeft: 40 }}>Google</TextButton>
            </Button1>
          </ContentAuth>

          {Platform.OS === 'ios' &&
            <ContentAuth>
              <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: 160,
                  height: 45,
                }}
                onPress={() => onAppleButtonPress()}
              />
            </ContentAuth>
          }

          <OrText> ou </OrText>

          <SignUpButton
            /* onPress={navigateSignUp} */ onPress={navigateSignUp}
            disabled={loading}
          >
            <SignUpText>CADASTRE-SE</SignUpText>
          </SignUpButton>
        </Actions>

        <ModalForgotPassword modal={modalForgotPassword} setModal={setModal} />
      </ScrollView>
    </Container>
  );
}
