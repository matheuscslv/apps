import React, { useCallback, useState, useRef, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import logo from '~/assets/maranata.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import UserActions from '~/store/ducks/user';
import { HeaderBackButton } from '@react-navigation/stack'

import ModalForgotPassword from './ForgotPassword';
import {
  Container,
  Header,
  Logo,
  Content,
  ForgotPasswordButton,
  ForgotPasswordText,
  Actions,
  SignUpButton,
  SignUpText,
  OrText,
} from './styles';
import getValidationErrors from '~/utils/getValidationErrors';
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const formRef = useRef(null);
  const loading = useSelector((state) => state.user.loading);
  const [modalForgotPassword, setModal] = useState(false);

  useEffect(()=>{
    navigation.setOptions({
      headerLeft: (props) =>  <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
    })
  })

  const navigateSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Email invalido!')
          .required('Campo obrigatório!')
          .max(100),
        password: Yup.string()
          .required('Campo obrigatório!')
          .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
      });

      await validationSchema.validate(data, { abortEarly: false });

      const { email, password } = data;

      dispatch(UserActions.getDataRequest({ email, password }));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
    }
  }, []);

  const handleFocusInput = useCallback((fieldName) => {
    const tagetInput = formRef.current.getFieldRef(fieldName);
    tagetInput.focus();
  }, []);

  return (
    <Container>
      <Header>
        <Logo source={logo} />
      </Header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Content>
          <Input
            name="email"
            title="Email"
            placeholder="Informe seu email"
            keyboardType="email-address"
            onSubmitEditing={() => handleFocusInput('password')}
            returnKeyType="next"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            name="password"
            title="Senha"
            placeholder="Sua senha secreta"
            returnKeyType="send"
            secureTextEntry
          />

          <ForgotPasswordButton onPress={() => setModal(true)}>
            <ForgotPasswordText>Esqueceu a senha ?</ForgotPasswordText>
          </ForgotPasswordButton>
        </Content>
      </Form>
      <Actions>
        <Button
          onSubmit={() => formRef.current.submitForm()}
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
