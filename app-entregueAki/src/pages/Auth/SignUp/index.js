import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';
import { UserTypes } from '~/store/ducks/user';

import {
  Container,
  HeaderText,
  Content,
  Scroll,
  Actions,
  SignInButton,
  SignInText,
  OrText,
} from './styles';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const cpfRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const validation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required('Campo obrigatório!'),
      // cpf: Yup.string().cpf('Informe um CPF válido!').required('Campo obrigatório!').max(12),
      // data_nascimento: Yup.string().datebr('Data inválida'),
      // telefone: Yup.string(),
      email: Yup.string()
        .email('Email invalido!')
        .required('Campo obrigatório!')
        .max(100),
      password: Yup.string()
        .required('Campo obrigatório!')
        .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas não coincidem')
        .required('Campo obrigatório!'),
    });
  }, []);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('SignIn');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSignUp(values, resetForm) {
    setLoading(true);
    const { confirmPassword, ...data } = values;

    dispatch({
      type: UserTypes.GET_REGISTER_REQUEST,
      data,
      setLoading,
      resetForm,
    });
  }

  return (
    <Container>
      <Scroll>
        <HeaderText>Cadastre-se</HeaderText>
        <Formik
          validationSchema={validation}
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            // data_nascimento: '',
          }}
          enableReinitialize
          onSubmit={(values, { resetForm }) => handleSignUp(values, resetForm)}
        >
          {({ values, handleSubmit, handleChange, errors, isValid }) => (
            <>
              <Content>
                <InputDefault
                  title="Nome"
                  ref={null}
                  errorData={errors.name}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current.focus()}
                  error={errors.name}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder="Ex: Maria Silva"
                  autoCapitalize="words"
                />

                <InputDefault
                  title="Email"
                  errorData={errors.email}
                  ref={emailRef}
                  returnKeyType="next"
                  onSubmitEditing={() => cpfRef.current.focus()}
                  selectTextOnFocus={false}
                  keyboardType="email-address"
                  error={errors.email}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder="Seu email"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {/* <InputDefault
                  title="CPF"
                  //subTitle="(para compras no app)"
                  errorData={errors.cpf}
                  ref={cpfRef}
                  returnKeyType="next"
                  keyboardType="decimal-pad"
                  error={errors.cpf}
                  onChangeText={handleChange('cpf')}
                  value={values.cpf}
                  placeholder="Somente numeros"
                /> */}

                {/* <InputDefault
                title="Data de nascimento"
                subTitle="(para compras no app)"
                errorData={errors.data_nascimento}
                returnKeyType="next"
                keyboardType="decimal-pad"
                error={errors.data_nascimento}
                onChangeText={handleChange('data_nascimento')}
                value={values.data_nascimento}
                placeholder="30/10/1999"
                type="datetime"
                options={{
                  format: 'DD/MM/YYYY',
                }}
              /> */}

                {/* <InputDefault
                  ref={null}
                  title="Telefone pessoal"
                  errorData={errors.telefone}
                  returnKeyType="next"
                  keyboardType="decimal-pad"
                  error={errors.telefone}
                  onChangeText={handleChange('telefone')}
                  value={values.telefone}
                  placeholder="(96) 99999-9999"
                  onSubmitEditing={() => passwordRef.current.focus()}
                  type="cel-phone"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                /> */}

                <InputDefault
                  title="Senha"
                  errorData={errors.password}
                  ref={passwordRef}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                  error={errors.password}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  placeholder="Sua senha"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <InputDefault
                  title="Confirme sua senha"
                  errorData={errors.confirmPassword}
                  ref={confirmPasswordRef}
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  error={errors.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder="Sua senha"
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </Content>

              <Actions>
                <ButtonDefault
                  title="CADASTRAR"
                  disabled={!isValid}
                  onPress={handleSubmit}
                  loading={loading}
                />
                <OrText> ou </OrText>
                <SignInButton onPress={navigateToLogin}>
                  <SignInText>FAÇA LOGIN</SignInText>
                </SignInButton>
              </Actions>
            </>
          )}
        </Formik>
      </Scroll>
    </Container>
  );
}

SignUp.navigationOptions = {
  header: null,
};
