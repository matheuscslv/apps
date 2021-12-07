import React, { useState, useEffect } from 'react';
import api from '~/services/api';

import { Center } from '~/styles/global';
import { Container, Email, Password, Button, ButtonText } from './styles';
import { Dropdown } from 'react-native-material-dropdown';

import {
  View,
  KeyboardAvoidingView,
  Text,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

import store from '~/services/storage';

import {
  createAppContainer,
  StackActions,
  NavigationActions,
} from 'react-navigation';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [lojas, setLojas] = useState([
    {
      value: 'VipCar Matriz',
    },
  ]);
  const [loja, setLoja] = useState(lojas[0].value);

  async function signIn(values) {
    setLoading(true);

    try {
      const user = await api.post(`/auth/login`, {
        email: values.email,
        password: values.password,
      });
      await store.save('User', user.data);

      props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })],
        }),
      );
    } catch (error) {
      Alert.alert('Erro de autenticação', 'Verifique suas credenciais!');
    } finally {
      setLoading(false);
    }

    //console.log(values);
    //console.log(loja);
  }

  async function clear() {
    //await store.save('User', null);
  }

  useEffect(() => {
    clear();
  }, []);

  const Validation = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Campo obrigatório!'),
    password: Yup.string().required('Campo obrigatório!'),
  });

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding" enabled>
        {/* <Email onChange={setEmail} placeholder="Email" placeholderTextColor="#414a69" />
      <Password
        onChange={setPassword}
        placeholder="Senha"
        placeholderTextColor="#414a69"
        secureTextEntry={true}
      />

      <View style={{ marginBottom: 10 }}>
        <Dropdown
          label="Loja"
          textColor="#414a69"
          data={[
            {
              value: 'VipCar Matriz',
            },
          ]}
        />
      </View>

      <Button onPress={signIn}>
        <Center>
          <ButtonText>Entrar</ButtonText>
        </Center>
      </Button> */}

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ width: 200, height: 100 }}
            resizeMode={'contain'}
            source={logo}
          />
        </View>

        <Formik
          validationSchema={Validation}
          validateOnBlur
          validateOnChange={!false}
          initialValues={{
            email: '' /* '05.paulotarso@gmail.com' */,
            password: '' /* '123456' */,
          }}
          onSubmit={values => signIn(values)}
          render={({
            values,
            handleSubmit,
            handleChange,
            errors,
            isValid,
            handleBlur,
            touched,
          }) => (
              <>
                <Email
                  onBlur={handleBlur('email')}
                  error={errors.email && touched.email}
                  value={values.email}
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  //onChange={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#414a69"
                />

                {!!errors.email && !!touched.email && (
                  <Text style={{ color: '#f00' }}> {errors.email} </Text>
                )}

                <Password
                  onBlur={handleBlur('password')}
                  error={errors.password && touched.password}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  value={values.password}
                  //onChange={setPassword}
                  placeholder="Senha"
                  placeholderTextColor="#414a69"
                  secureTextEntry={true}
                />

                {!!errors.password && touched.password && (
                  <Text style={{ color: '#f00' }}> {errors.password} </Text>
                )}

                <View style={{ marginBottom: 10 }}>
                  {/* <Dropdown
                  label="Loja"
                  textColor="#414a69"
                  onChangeText={text => setLoja(text)}
                  data={lojas}
                  value={lojas[0].value}
                /> */}
                </View>

                <Button onPress={handleSubmit} disabled={!isValid}>
                  <Center>
                    {loading ? (
                      <ActivityIndicator size={'small'} color="#fff" />
                    ) : (
                        <ButtonText>Entrar</ButtonText>
                      )}
                  </Center>
                </Button>
              </>
            )}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}

Login.navigationOptions = {
  header: null,
};
