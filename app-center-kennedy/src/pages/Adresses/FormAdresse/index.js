import React, {useState} from 'react';
import {ActivityIndicator, Switch} from 'react-native';

import {
  ContainerModal,
  ViewModal,
  InputContainer,
  Buttons,
  Button,
  ButtonText,
  TitleModal,
  InputFrete,
  Error,
  Label,
} from './styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {colors} from '~/styles';

export default function FormAdresse({setModal, setEditing, editForm}) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(editForm ? editForm : null);
  const [zipcode, setZipcode] = useState('');
  const [errorZipcode, setErrorZipcode] = useState(null);
  const [isDefault, setIsDefault] = useState(
    editForm ? editForm.isDefault : false,
  );

  const Validation = Yup.object().shape({
    street: Yup.string().required('Campo obrigatório!'),
    neighborhood: Yup.string().required('Campo obrigatório!'),
    complemento: Yup.string(),
    number: Yup.string().required('Campo obrigatório!'),
    state: Yup.string().required('Campo obrigatório!'),
    ponto_referencia: Yup.string(),
  });

  function handleSubmit(values, resetForm) {
    console.log(values);
  }

  async function getAdress() {
    setLoading(true);
    try {
      if (zipcode.length !== 8) {
        setErrorZipcode(true);
        return;
      }
      const response = await axios.get(
        `https://viacep.com.br/ws/${zipcode}/json/`,
      );
      const {
        logradouro: street,
        bairro: neighborhood,
        localidade: city,
        uf: state,
      } = response.data;
      console.log(street, neighborhood, city, state);
      setForm({
        zipcode,
        street,
        neighborhood,
        state,
        city,
        number: '',
        complemento: '',
        ponto_referencia: '',
      });
    } catch (e) {
      setErrorZipcode(true);
    }
    setLoading(false);
  }

  return (
    <ContainerModal>
      {form ? (
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
            <ViewModal>
              <TitleModal>Adicionar endereço de entrega</TitleModal>
              <InputContainer>
                <InputFrete disabled placeholder="cep" value={values.zipcode} />
              </InputContainer>
              <InputContainer>
                <InputFrete
                  disabled
                  placeholder="Endereço"
                  value={values.street}
                />
              </InputContainer>
              <InputContainer>
                <InputFrete
                  disabled
                  placeholder="Bairro"
                  value={values.neighborhood}
                />
              </InputContainer>
              <InputContainer>
                <InputFrete
                  wdth={40}
                  disabled
                  placeholder="municipio"
                  value={values.city}
                />
                <InputFrete
                  wdth={40}
                  disabled
                  placeholder="state"
                  value={values.state}
                />
              </InputContainer>
              <InputContainer>
                <InputFrete placeholder="Número" value={values.number} />
              </InputContainer>
              <InputContainer>
                <InputFrete
                  placeholder="Complemento"
                  value={values.complemento}
                />
              </InputContainer>
              <InputContainer>
                <InputFrete
                  placeholder="Ponto de referência"
                  value={values.ponto_referencia}
                />
              </InputContainer>
              <InputContainer>
                <Label style={{width: '70%'}}>
                  Utilizar como padrão para as próximas compras?
                </Label>
                <Switch
                  style={{width: '20%'}}
                  value={isDefault}
                  onValueChange={() => setIsDefault(!isDefault)}
                />
              </InputContainer>
              <Buttons>
                <Button
                  background="#FFF"
                  onPress={() => {
                    setEditing(null);
                    setModal(false);
                  }}>
                  <ButtonText color> Cancelar </ButtonText>
                </Button>
                <Button disabled={loading} onPress={handleSubmit}>
                  <ButtonText>Salvar</ButtonText>
                </Button>
              </Buttons>
            </ViewModal>
          )}
        </Formik>
      ) : (
        <ViewModal>
          <TitleModal>Adicionar endereço de entrega</TitleModal>
          <InputContainer>
            <InputFrete
              wdth={errorZipcode || loading ? 70 : 100}
              keyboardType="numeric"
              placeholder="CEP (somente números)"
              value={zipcode}
              returnKeyType="search"
              onChangeText={text =>
                text.length <= 8 ? setZipcode(text) : null
              }
            />
            {errorZipcode && (
              <Error style={{width: '20%'}}>CEP inválido!</Error>
            )}
            {loading && (
              <ActivityIndicator
                style={{width: '20%'}}
                color={colors.primary}
                size="small"
              />
            )}
          </InputContainer>
          <Buttons>
            <Button background="#FFF" onPress={() => setModal(false)}>
              <ButtonText color> Cancelar </ButtonText>
            </Button>
            <Button disabled={loading} onPress={getAdress}>
              <ButtonText>Próximo</ButtonText>
            </Button>
          </Buttons>
        </ViewModal>
      )}
    </ContainerModal>
  );
}
