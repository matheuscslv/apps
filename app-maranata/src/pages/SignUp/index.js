import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { MaskService } from 'react-native-masked-text';

import Button from '~/components/Button';
import Input from '~/components/Input';
import '~/scripts/validations';
import UserActions from '~/store/ducks/user';

import {
  Container,
  HeaderText,
  Content,
  Scroll,
  Actions,
  SignInButton,
  SignInText,
  SignUpButton,
  SignUpText,
  OrText,
} from './styles';
import getValidationErrors from '~/utils/getValidationErrors';

export default function SignUp({ navigation }) {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const loading = useSelector((state) => state.user.loading);

  const navigateToLogin = useCallback(() => {
    navigation.navigate('SignIn');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        cpf: Yup.string()
          .cpf('Informe um CPF válido!')
          .required('Campo obrigatório!')
          .max(14, 'CPF invalido!'),
        telefone: Yup.string().required('Campo obrigatório!'),
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

      await validationSchema.validate(data, { abortEarly: false });

      const { name, email, password, cpf, telefone } = data;

      dispatch(
        UserActions.getRegisterRequest({
          name,
          email,
          password,
          cpf,
          telefone,
        }),
      );
      formRef.current?.setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      console.log(err);
    }
  }, []);

  const handleFocusInput = useCallback((fieldName) => {
    const tagetInput = formRef.current.getFieldRef(fieldName);
    tagetInput.focus();
  }, []);

  return (
    <Container>
      <Scroll>
        <HeaderText>Cadastre-se</HeaderText>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Content>
            <Input
              name="name"
              title="Nome"
              returnKeyType="next"
              onSubmitEditing={() => handleFocusInput('email')}
              placeholder="Ex: Maria Silva"
              autoCapitalize="words"
            />

            <Input
              name="email"
              title="Email"
              returnKeyType="next"
              onSubmitEditing={() => handleFocusInput('cpf')}
              keyboardType="email-address"
              placeholder="Seu email"
              autoCapitalize="none"
            />

            <Input
              name="cpf"
              title="CPF"
              subTitle="(para compras no app)"
              returnKeyType="next"
              keyboardType="decimal-pad"
              placeholder="Somente numeros"
              onSubmitEditing={() => handleFocusInput('telefone')}
              onChangeText={(text) => {
                const formatted = MaskService.toMask('cpf', text);
                formRef.current.setFieldValue('cpf', formatted);
              }}
            />
            <Input
              name="telefone"
              title="Telefone pessoal"
              returnKeyType="next"
              keyboardType="decimal-pad"
              placeholder="(96) 99999-9999"
              onSubmitEditing={() => handleFocusInput('password')}
              onChangeText={(text) => {
                const formatted = MaskService.toMask('cel-phone', text, {
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                });
                formRef.current.setFieldValue('telefone', formatted);
              }}
            />

            <Input
              name="password"
              title="Senha"
              returnKeyType="next"
              onSubmitEditing={() => handleFocusInput('confirm_password')}
              placeholder="Sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              name="confirmPassword"
              title="Confirme sua senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current.submitForm()}
              placeholder="Sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </Content>
        </Form>

        <Actions>
          <Button
            title="CADASTRAR"
            onPress={() => formRef.current.submitForm()}
            loading={loading}
          />
          <OrText> ou </OrText>
          <SignInButton onPress={navigateToLogin}>
            <SignInText>FAÇA LOGIN</SignInText>
          </SignInButton>
        </Actions>
      </Scroll>
    </Container>
  );
}
