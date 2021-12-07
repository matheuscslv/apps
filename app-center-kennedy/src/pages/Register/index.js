import React, {useRef, useState, useEffect} from 'react';
import {Switch} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  Container,
  InputContainer,
  InputContainer2,
  Label,
  Error,
  Input,
  InputMask,
  Button,
  ButtonText,
} from './styles';

export default function Register({onSubmit, navigation}) {
  const nomeRef = useRef();
  let dataRef = useRef();
  const celularRef = useRef();
  const emailRef = useRef();
  const senhaRef = useRef();
  const confirmSenhaRef = useRef();
  const [form, setForm] = useState(null);
  const [isSubscribe, setSubscribe] = useState(false);

  useEffect(() => {
    const propValues = navigation.getParam('data_user');
    if (propValues) {
      setForm({
        nome: propValues.name,
        cpf: '',
        data_nasc: propValues.birthday,
        telefone: '',
        email: propValues.email,
        senha: '',
        confirmSenha: '',
      });
    } else {
      setForm({
        nome: '',
        cpf: '',
        data_nasc: '',
        telefone: '',
        email: '',
        senha: '',
        confirmSenha: '',
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    senha: Yup.string()
      .required('Campo obrigatório!')
      .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
    confirmSenha: Yup.string()
      .oneOf([Yup.ref('senha'), null], 'Senhas não coincidem')
      .required('Campo obrigatório!'),
  });

  function handleSubmit(values, resetForm) {
    console.log({...values, isSubscribe});
  }

  return (
    <Container>
      {form && (
        <Formik
          validationSchema={Validation}
          initialValues={form}
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
                  Celular{' '}
                  {errors.telefone && <Error> {errors.telefone} </Error>}
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
                  onSubmitEditing={() => senhaRef.current.focus()}
                />
              </InputContainer>

              <InputContainer>
                <Label>
                  Senha {errors.senha && <Error> {errors.senha} </Error>}
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
                  Confirmar Senha{' '}
                  {errors.confirmSenha && (
                    <Error> {errors.confirmSenha} </Error>
                  )}
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
              <InputContainer2>
                <Label style={{width: '80%', fontWeight: 'normal'}}>
                  Desejar receber ofertas em seu email ?
                </Label>
                <Switch
                  onValueChange={() => setSubscribe(!isSubscribe)}
                  value={isSubscribe}
                />
              </InputContainer2>
              <Button disabled={!isValid} onPress={handleSubmit}>
                <ButtonText> SALVAR </ButtonText>
              </Button>
            </>
          )}
        </Formik>
      )}
    </Container>
  );
}

Register.navigationOptions = {
  headerTitle: 'Registre-se',
};
