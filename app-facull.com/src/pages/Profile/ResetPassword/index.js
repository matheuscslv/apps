import React, { useState, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';
import { UserTypes } from '~/store/ducks/user';

import { Container, Scroll, Header, Welcome, Content, Info } from './styles';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const data_user = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const confirmPasswordRef = useRef();

  const validation = useMemo(() => {
    return Yup.object().shape({
      password: Yup.string()
        .required('Campo obrigatório!')
        .min(4, 'Informe uma senha de pelo menos 4(quatro) digitos'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas não coincidem')
        .required('Campo obrigatório!'),
    });
  }, []);

  function handleRefreshPassword(values) {
    setLoading(true);
    const { password } = values;
    dispatch({
      type: UserTypes.SET_REFRESH_PASSWORD_REQUEST,
      password,
      setLoading,
    });
  }

  return (
    <Container>
      <Scroll>
        <Header>
          <Welcome>Senha de acesso</Welcome>
          <Info>Altere sua senha e proteja seus dados!</Info>
        </Header>

        <Formik
          validationSchema={validation}
          initialValues={{
            email: data_user.email,
            password: '',
            confirmPassword: '',
          }}
          enableReinitialize
          onSubmit={values => handleRefreshPassword(values)}
        >
          {({ values, handleSubmit, handleChange, errors, isValid }) => (
            <Content>
              <InputDefault
                ref={null}
                title="Email"
                value={values.email}
                editable={false}
              />

              <InputDefault
                ref={null}
                title="Nova senha"
                errorData={errors.password}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordRef.current.focus()}
                error={errors.password}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Sua senha"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
              <InputDefault
                ref={confirmPasswordRef}
                title="Confirme sua nova senha"
                errorData={errors.confirmPassword}
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                error={errors.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                value={values.confirmPassword}
                placeholder="Sua senha"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <ButtonDefault
                style={{ marginTop: 20 }}
                title="SALVAR"
                disabled={!isValid || loading}
                loading={loading}
                onSubmit={handleSubmit}
              />
            </Content>
          )}
        </Formik>
      </Scroll>
    </Container>
  );
}
ResetPassword.navigationOptions = {
  headerTitle: 'Alterar Senha',
};
