import React, {useEffect, useState} from 'react';
import {Text, Platform} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

import {
  Container,
  Title,
  Content,
  Button1,
  IconButton,
  TextButton,
  TitleSmall,
  Button2,
} from './styles';

export default function Login({navigation}) {
  const [auth, setAuth] = useState({
    userInfo: null,
    logged: false,
  });
  const [profileFacebook, setProfileFacebook] = useState(null);
  const [profileGmail, setProfileGmail] = useState(null);
  const requestManager = new GraphRequestManager();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        Platform.OS == 'ios'
          ? '43495082237-rk3negpjrsa5d89tikiru6n86q8q66bj.apps.googleusercontent.com'
          : '43495082237-0jseg92n8rdbor44dglcm2bpua1stjh5.apps.googleusercontent.com',
      offlineAccess: true,
      hostsDomain: '',
      loginHint: '',
      accountName: '',
      iosClientId:
        Platform.OS == 'ios'
          ? '43495082237-rk3negpjrsa5d89tikiru6n86q8q66bj.apps.googleusercontent.com'
          : '43495082237-0jseg92n8rdbor44dglcm2bpua1stjh5.apps.googleusercontent.com',
    });
  }, []);

  async function signIn() {
    if (!profileGmail) {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        setAuth({userInfo: userInfo, logged: true});
        const {email, givenName, familyName, photo} = userInfo.user;
        const profile = {
          email,
          name: `${givenName} ${familyName}`,
          avatar: photo,
          birthday: '',
        };
        setProfileGmail(profile);
        navigation.navigate('Register', {
          data_user: profile,
        });
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
        console.log(error);
      }
    } else {
      navigation.navigate('Register', {
        data_user: profileGmail,
      });
    }
  }

  async function signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setAuth({userInfo: null, logged: false}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  }

  async function getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setAuth({...auth, userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        setAuth({...auth, logged: false});
      } else {
        // some other error
        setAuth({...auth, logged: false});
      }
    }
  }

  async function facebookLogin() {
    if (!profileFacebook) {
      LoginManager.logInWithPermissions([
        'public_profile',
        'user_birthday',
        'email',
      ]).then(
        function(result) {
          if (result.isCancelled) {
            console.log('Login cancelled');
          } else {
            let access_token = '';
            AccessToken.getCurrentAccessToken().then(data => {
              access_token = data.accessToken.toString();
              const request = new GraphRequest(
                '/me',
                {
                  parameters: {
                    fields: {
                      string: 'birthday, name, email,hometown', // what you want to get
                    },
                    access_token: {
                      string: access_token, // put your accessToken here
                    },
                  },
                },
                (error, result) => {
                  if (result) {
                    const profile = result;
                    profile.avatar = `https://graph.facebook.com/${
                      result.id
                    }/picture`;
                    const formatDate = profile.birthday.split('/');
                    profile.birthday = `${formatDate[1]}/${formatDate[0]}/${
                      formatDate[2]
                    }`;

                    setProfileFacebook(profile);
                    navigation.navigate('Register', {
                      data_user: profile,
                    });
                  } else {
                    alert('Erro na autenticação');
                  }
                },
              );

              requestManager.addRequest(request).start();
            });
          }
        },
        function(error) {
          console.log('Login fail with error: ' + error);
        },
      );
    } else {
      navigation.navigate('Register', {
        data_user: profileFacebook,
      });
    }
  }

  return (
    <Container>
      <Text
        style={{
          fontSize: 22,
          textAlign: 'center',
        }}>
        Bem Vindo!
      </Text>
      <Title>Entre com sua rede social</Title>
      <Content>
        <Button1 bk="#3E569C" onPress={facebookLogin}>
          <IconButton name="facebook" />
          <TextButton style={{marginLeft: 40}}>Facebook</TextButton>
        </Button1>

        <Button1 bk="	#DB4C2C" onPress={signIn}>
          <IconButton name="google" />
          <TextButton style={{marginLeft: 40}}>Google</TextButton>
        </Button1>
        {/* <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}

          // disabled={this.state.isSigninInProgress}
        /> */}
      </Content>
      <TitleSmall>
        * Seus dados serão preservados e nada será postado em sua linha do tempo
      </TitleSmall>
      <Title> ou </Title>
      <Button2 onPress={() => navigation.navigate('Register')}>
        <TextButton>Entre com seu e-mail e CPF</TextButton>
      </Button2>
    </Container>
  );
}

Login.navigationOptions = {
  headerTitle: 'Entrar',
};
