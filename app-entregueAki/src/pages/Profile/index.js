import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';
import { UserTypes } from '~/store/ducks/user';

import { Container, Header, Welcome, Content, Scroll, Info } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const data_user = useSelector((state) => state.user.data);
  const [loading, setLoading] = useState(false);

  const validation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required('Campo obrigatório!'),
      telefone: Yup.string(),
    });
  }, []);

  function handleRefreshData(values) {
    setLoading(true);
    const { email, ...data } = values;
    console.log(data);
    dispatch({
      type: UserTypes.SET_REFRESH_DATA_REQUEST,
      data,
      setLoading,
    });
  }

  return (
    <Container>
      <Scroll>
        <Header>
          <Welcome>Sua conta</Welcome>
          <Info>Você não pode alterar seu Email!</Info>
        </Header>

        <Formik
          validationSchema={validation}
          initialValues={{
            name: data_user?.nome || '',
            email: data_user?.email || '',
            telefone: data_user?.telefone || '',
            cpf: data_user?.cpf || '',
            // data_nascimento: '',
          }}
          enableReinitialize
          onSubmit={(values) => handleRefreshData(values)}
        >
          {({ values, handleSubmit, handleChange, errors, isValid }) => (
            <Content>
              <InputDefault
                title="Nome"
                errorData={errors.name}
                returnKeyType="next"
                error={errors.name}
                onChangeText={handleChange('name')}
                value={values.name}
                placeholder="Ex: Maria Silva"
                autoCapitalize="words"
              />

              <InputDefault
                title="Email"
                errorData={errors.email}
                editable={false}
                returnKeyType="next"
                // onSubmitEditing={() => cpfRef.current.focus()}
                selectTextOnFocus={false}
                keyboardType="email-address"
                error={errors.email}
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="Seu email"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <InputDefault
                title="CPF"
                errorData={errors.cpf}
                returnKeyType="next"
                keyboardType="decimal-pad"
                error={errors.cpf}
                onChangeText={handleChange('cpf')}
                value={values.cpf}
                placeholder="Somente numeros"
              />

              <InputDefault
                title="Telefone pessoal"
                errorData={errors.telefone}
                returnKeyType="next"
                keyboardType="decimal-pad"
                error={errors.telefone}
                onChangeText={handleChange('telefone')}
                value={values.telefone}
                placeholder="(96) 99999-9999"
                onSubmitEditing={handleSubmit}
                type="cel-phone"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
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

Profile.navigationOptions = {
  headerTitle: 'Minha Conta',
};
