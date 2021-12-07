import React, { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from '@unform/mobile';
import { MaskService } from 'react-native-masked-text';

import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import UserActions from '~/store/ducks/user';

import { Container, Header, Welcome, Content, Scroll, Info } from './styles';
import getValidationErrors from '~/utils/getValidationErrors';

export default function Account() {
  const dispatch = useDispatch();
  const formRef = useRef();
  const data_user = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const validationSchema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório!'),
        telefone: Yup.string().required('Campo obrigatório!'),
      });

      await validationSchema.validate(data, { abortEarly: false });

      const { name, telefone } = data;

      dispatch(
        UserActions.setRefreshDataRequest({
          name,
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

  return (
    <Container>
      <Scroll>
        <Header>
          <Welcome>Sua conta</Welcome>
          <Info>Você não pode alterar seu CPF e Email!</Info>
        </Header>
        <Form initialData={data_user} ref={formRef} onSubmit={handleSubmit}>
          <Content>
            <Input
              name="name"
              title="Nome"
              returnKeyType="next"
              placeholder="Ex: Maria Silva"
              autoCapitalize="words"
            />

            <Input
              name="email"
              title="Email"
              editable={false}
              returnKeyType="next"
              keyboardType="email-address"
              placeholder="Seu email"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              name="cpf"
              title="CPF"
              editable={false}
              returnKeyType="next"
              keyboardType="decimal-pad"
              placeholder="Somente numeros"
            />

            <Input
              name="telefone"
              title="Telefone pessoal"
              returnKeyType="next"
              keyboardType="decimal-pad"
              placeholder="(96) 99999-9999"
              onChangeText={(text) => {
                const formatted = MaskService.toMask('cel-phone', text, {
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                });
                formRef.current.setFieldValue('telefone', formatted);
              }}
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
