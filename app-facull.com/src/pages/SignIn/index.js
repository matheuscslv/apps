import React, {
  useCallback,
  useState,
  useRef,
  createRef,
  forwardRef,
} from 'react';
import { ActivityIndicator } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { useSelector, useDispatch } from 'react-redux';

import logo from '~/assets/logo.png';
import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';
import { UserTypes } from '~/store/ducks/user';

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
} from './styles';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalForgotPassword, setModal] = useState(false);
  const passwordRef = createRef();
  const emailRef = createRef();

  const navigateSignUp = useCallback(() => {
    navigation.navigate('SignUp');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function renderButtonLoginFB() {
    // eslint-disable-next-line no-lone-blocks
    {
      /* <TouchableOpacity
            style={styles.botao}
            activeOpacity={0.7}
            onPress={() => {}}
          >
            {this.state.loading1 ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={{ color: '#FFF', fontSize: 16 }}>
                Entrar com Facebook
              </Text>
            )}
          </TouchableOpacity> */
    }

    // eslint-disable-next-line no-lone-blocks
    {
      /* <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data.accessToken.toString());
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          /> */
    }
  }

  function handleForgotPassword() {}

  return (
    <Container>
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
        <OrText> ou </OrText>
        <SignUpButton onPress={navigateSignUp} disabled={loading}>
          <SignUpText>CADASTRE-SE</SignUpText>
        </SignUpButton>
      </Actions>
      <ModalForgotPassword modal={modalForgotPassword} setModal={setModal} />
    </Container>
  );
}
