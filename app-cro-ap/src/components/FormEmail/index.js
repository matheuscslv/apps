import React, {useEffect} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import {
  Input,
  InputLabel,
  Form,
  InputComplaint,
  BoxButton,
  ButtonSend,
  ButtonText,
  Error,
  TellInput,
} from './styles';
import Required from '../Required';


export default function FormEmail({
  setForm, form, sendForm, loading, type = 'Mensagem', newForm = false
}) {
  const Validation = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório!'),
    nome: Yup.string().required('Campo obrigatório!'),
    texto: Yup.string().required('Campo obrigatório!'),
  });


  return (
    <Form>
      <Formik
        validationSchema={Validation}
        validateOnBlur
        validateOnChange={!false}
        initialValues={form}
        enableReinitialize={true}
        onSubmit={(values, {resetForm}) => sendForm(values, resetForm)}
        render={({
          values, handleSubmit, handleChange, errors, isValid, handleBlur, touched, resetForm
        }) => (
          <>
            <InputLabel>Nome <Required /></InputLabel>
            <Input
              placeholder="Ex: Maria da silva"
              onBlur={handleBlur('nome')}
              error={errors.nome && touched.nome}
              onChangeText={handleChange('nome')}
              value={values.nome}
            />
            {(!!errors.nome && !!touched.nome) && <Error> {errors.nome} </Error>}
            <InputLabel>Telefone </InputLabel>
            <TellInput
              type="cel-phone"
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              keyboardType="numeric"
              placeholder="Ex: (96) 99999-9999"
              onChangeText={handleChange('telefone')}
              value={values.telefone}
            />
            <InputLabel>Email <Required /> </InputLabel>
            <Input
              placeholder="Ex: mariasilva@email.com"
              onBlur={handleBlur('email')}
              error={errors.email && touched.email}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {(!!errors.email && !!touched.email) && <Error> {errors.email} </Error>}
            <InputLabel>{type} <Required /></InputLabel>
            <InputComplaint
              placeholder="Escreva até 255 caracteres"
              onBlur={handleBlur('texto')}
              error={errors.texto && touched.texto}
              onChangeText={handleChange('texto')}
              value={values.texto}
            />
            {(!!errors.texto && !!touched.texto) && <Error> {errors.texto} </Error>}

            <BoxButton>
              <ButtonSend onPress={handleSubmit} disabled={!isValid}>
                { loading
                  ? <ActivityIndicator size="small" color="#fff" />
                  : <ButtonText>Enviar </ButtonText>
              }
              </ButtonSend>
            </BoxButton>

          </>
        )}
      />

    </Form>
  );
}
