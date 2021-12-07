import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  Container,
  Card,
  InputContainer,
  Label,
  Error,
  Input,
  InputMask,
  Button,
  ButtonText,
} from './styles';

export default function PasswordAccess() {
  const senhaRef = useRef();
  const confirmSenhaRef = useRef();

  const Validation = Yup.object().shape({
    oldSenha: Yup.string()
      .required('Campo obrigatório!')
      .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
    senha: Yup.string()
      .required('Campo obrigatório!')
      .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'Senhas não coincidem')
      .required('Campo obrigatório!'),
  });

  function handleSubmit(values, resetForm) {
    console.log(values);
  }

  return (
    <Container>
      <Formik
        validationSchema={Validation}
        initialValues={{
          oldSenha: '',
          senha: '',
          confirmSenha: '',
        }}
        enableReinitialize
        onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}>
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          isValid,
          handleBlur,
          touched,
          resetForm,
        }) => (
          <>
            <InputContainer>
              <Label>
                Senha Antiga{' '}
                {errors.oldSenha && <Error> {errors.oldSenha} </Error>}
              </Label>

              <Input
                error={errors.oldSenha}
                onChangeText={handleChange('oldSenha')}
                keyboardType="default"
                secureTextEntry
                value={values.oldSenha}
                placeholder="Sua senha secreta"
                returnKeyType="next"
                onSubmitEditing={() => senhaRef.current.focus()}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Nova Senha {errors.senha && <Error> {errors.senha} </Error>}
              </Label>

              <Input
                error={errors.senha}
                onChangeText={handleChange('senha')}
                keyboardType="default"
                secureTextEntry
                value={values.senha}
                placeholder="Sua senha secreta"
                ref={senhaRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmSenhaRef.current.focus()}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Confirmar Nova Senha{' '}
                {errors.confirmSenha && <Error> {errors.confirmSenha} </Error>}
              </Label>
              <Input
                error={errors.confirmSenha}
                onChangeText={handleChange('confirmSenha')}
                keyboardType="default"
                secureTextEntry
                value={values.confirmSenha}
                placeholder="Confirme sua senha"
                ref={confirmSenhaRef}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
              />
            </InputContainer>
            <Button disabled={!isValid} onPress={handleSubmit}>
              <ButtonText> ALTERAR </ButtonText>
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
}

PasswordAccess.navigationOptions = {
  headerTitle: 'Alterar Senha',
};
