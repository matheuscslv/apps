import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Text, Keyboard, Animated, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import header from '~/assets/headerLogin.png';
import logo from '~/assets/icone.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { UserTypes } from '~/store/ducks/user';
import { colors } from '~/styles';

import { Container, BackgroundImage, FormContent, ImageLogo } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const loading = useSelector(state => state.user.loading);
  const [heigthKeyboard] = useState(new Animated.Value(200))
  const [opacityOffSet] = useState(new Animated.Value(1))

  useEffect(()=>{
   Keyboard.addListener('keyboardDidShow', keyboardDidShow);
   Keyboard.addListener('keyboardDidHide', keyboardDidHide);
  }, [])

  function keyboardDidShow(e){
    Animated.sequence([
      Animated.timing(heigthKeyboard, {
        toValue: 200 - Dimensions.get('window').height - e.endCoordinates.height,
        duration: 100,
      }),
    Animated.timing(opacityOffSet, {
      toValue: 0,
        duration: 100,
    } )
    ]).start()
  }

  function keyboardDidHide(e){
    Animated.sequence([
    Animated.timing(heigthKeyboard, {
      toValue: 300,
      duration: 100,
    }),

    Animated.timing(opacityOffSet, {
      toValue: 1,
      duration: 100,
    })
    ]).start()
  }

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um email válido')
          .max(100, 'Máximo 100 caracteres')
          .required('Seu email é obrigatório'),
        password: Yup.string()
          .max(100, 'Máximo 100 caracteres')
          .required('Sua senha é obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch({
        type: UserTypes.HANDLE_LOGIN_REQUEST,
        data,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach(e => {
          errorMessages[e.path] = e.message;
        });
        formRef.current.setErrors(errorMessages);
      }

      return false;
    }
  }

  const focusPasswordInput = useCallback(() => {
    const passwordInput = formRef.current.getFieldRef('password');
    passwordInput.focus();
  }, []);

  return (

    <Container>
      
      <BackgroundImage source={header} style={{
        height: heigthKeyboard
      }}>
        <ImageLogo source={logo} style={{
       opacity: opacityOffSet.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 130],
        extrapolate: 'clamp'
      }),
      height: opacityOffSet.interpolate({
        inputRange: [0, 1],
        outputRange: [25, 130],
        extrapolate: 'clamp'
      })
      }}  />
      </BackgroundImage>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContent>
          <Input
            name="email"
            style={{
              height: 44,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.secundary,
              borderBottomColor: colors.secundary,
              textAlign: 'center',
            }}
            placeholder="Seu email"
            autoCorret={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={focusPasswordInput}
          />
          <Input
            name="password"
            style={{
              height: 44,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.secundary,
              borderBottomColor: colors.secundary,
              textAlign: 'center',
              marginTop: 30,
            }}
            placeholder="Sua senha secreta"
            autoCapitalize="none"
            returnKeyType="send"
            onSubmitEditing={() => formRef.current.submitForm()}
            secureTextEntry
          />
          <Button
            title="Entrar"
            style={{
              marginTop: 40,
            }}
            loading={loading}
            disabled={loading}
            onSubmit={() => formRef.current.submitForm()}
          />
        </FormContent>
      </Form>
    </Container>
  );
}

Login.navigationOptions = {
  header: () => null,
};
