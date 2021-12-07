import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux';

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

export default function Profile() {
  const nomeRef = useRef();
  let dataRef = useRef();
  const celularRef = useRef();
  const emailRef = useRef();
  const profile = useSelector(state => state.user.data);

  const Validation = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório!'),
    cpf: Yup.string()
      .cpf('Informe um CPF válido!')
      .required('Campo obrigatório!'),
    data_nasc: Yup.string()
      .datebr('Data inválida!')
      .required('Campo obrigatório!'),
    telefone: Yup.string().required('Campo obrigatório!'),
    email: Yup.string()
      .email('Email invalido!')
      .required('Campo obrigatório!'),
  });

  function handleSubmit(values, resetForm) {
    console.log(values);
  }

  return (
    <Container>
      <Formik
        validationSchema={Validation}
        initialValues={profile}
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
              <Label>CPF {errors.cpf && <Error> {errors.cpf} </Error>}</Label>
              <Input
                editable={false}
                selectTextOnFocus={false}
                keyboardType="decimal-pad"
                error={errors.cpf}
                onChangeText={handleChange('cpf')}
                value={values.cpf}
                placeholder="Somente numeros"
                returnKeyType="next"
                onSubmitEditing={() => nomeRef.current.focus()}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Nome Completo {errors.nome && <Error> {errors.nome} </Error>}
              </Label>
              <Input
                error={errors.nome}
                onChangeText={handleChange('nome')}
                value={values.nome}
                placeholder="Ex: Maria Silva"
                ref={nomeRef}
                returnKeyType="next"
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Data de nascimento{' '}
                {errors.data_nasc && <Error> {errors.data_nasc} </Error>}
              </Label>
              <InputMask
                mask={true}
                type="datetime"
                options={{
                  format: 'DD/MM/YYYY',
                }}
                error={errors.data_nasc}
                onChangeText={handleChange('data_nasc')}
                value={values.data_nasc}
                placeholder="DD/MM/AAAA"
                keyboardType="number-pad"
                returnKeyType="next"
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Celular {errors.telefone && <Error> {errors.telefone} </Error>}
              </Label>
              <InputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                error={errors.telefone}
                onChangeText={handleChange('telefone')}
                value={values.telefone}
                placeholder="(XX) 9XXXX-XXXX"
                keyboardType="number-pad"
                ref={celularRef}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                E-mail {errors.email && <Error> {errors.email} </Error>}
              </Label>
              <Input
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Ex: maria.silva@mail.com"
                keyboardType="email-address"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={handleSubmit}
              />
            </InputContainer>
            <Button disabled={!isValid} onPress={handleSubmit}>
              <ButtonText> SALVAR </ButtonText>
            </Button>
          </>
        )}
      </Formik>
    </Container>
  );
}

Profile.navigationOptions = {
  headerTitle: 'Dados Pessoais',
};
