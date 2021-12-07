import React, { useState } from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import Input from '@components/Input';
import KeyboardView from '@components/KeyboardView';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import * as S from './styles';

interface ISubmitForm {
  cpf: string;
}

const LogOut: React.FC = () => {
  const formRef = React.useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = React.useCallback(async (data: ISubmitForm) => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        cpf: Yup.string().required('Campo obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      setLoading(true);

      try {
        const response = await api.post('sessao/consumidor/reset_senha', {
          cpf: data.cpf,
        });
        Alert.alert('Sucesso!', response.data.message);
        setLoading(false);
        navigation.goBack();
      } catch (error) {
        Alert.alert(
          'Não foi possível recuperar senha',
          error.response.data.error,
        );
        setLoading(false);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <KeyboardView>
      <S.Container>
        <FormProvider onSubmit={handleSubmit} ref={formRef}>
          <S.Title>Recupere sua senha</S.Title>
          <S.Subtitle>
            favor, insira o CPF da sua conta para receber o link para
            recuperação de senha.
          </S.Subtitle>

          <S.Form>
            <Input
              containerStyle={{
                marginTop: 15,
                maxWidth: 350,
              }}
              icon="info"
              label="Seu CPF"
              name="cpf"
              placeholder="Seu CPF"
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="send"
              onChangeText={(text) => {
                let formatted = text;

                formatted = MaskService.toMask('cpf', text);

                formRef.current?.setFieldValue('cpf', formatted);
              }}
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <S.ButtonSignIn
              onPress={() => formRef.current?.submitForm()}
              loading={loading}
            >
              Enviar
            </S.ButtonSignIn>
          </S.Form>
        </FormProvider>
      </S.Container>
    </KeyboardView>
  );
};

export default LogOut;
