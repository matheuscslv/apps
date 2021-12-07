import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import UserActions from '~/store/ducks/user';

import { Container, Scroll, Header, Welcome, Content, Info } from './styles';
import getValidationErrors from '~/utils/getValidationErrors';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const data_user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const validationSchema = Yup.object().shape({
        password: Yup.string()
          .required('Campo obrigatório!')
          .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Senhas não coincidem')
          .required('Campo obrigatório!'),
      });

      await validationSchema.validate(data, { abortEarly: false });

      const { password } = data;

      dispatch(
        UserActions.setRefreshPasswordRequest({
          password,
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

  return (
    <Container>
      <Scroll>
        <Header>
          <Welcome>Senha de acesso</Welcome>
          <Info>Altere sua senha e proteja seus dados!</Info>
        </Header>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={data_user}>
          <Content>
            <Input name="email" title="Email" editable={false} />
            <Input
              name="password"
              title="Nova senha"
              returnKeyType="next"
              placeholder="Sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Input
              name="confirmPassword"
              title="Confirme sua nova senha"
              returnKeyType="send"
              placeholder="Sua senha"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Button
              style={{ marginTop: 20 }}
              title="SALVAR"
              disabled={loading}
              loading={loading}
              onSubmit={() => formRef.current.submitForm()}
            />
          </Content>
        </Form>
      </Scroll>
    </Container>
  );
}
