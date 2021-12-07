import React, {useState} from 'react';
import {ActivityIndicator, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  ContainerModal,
  ViewModal,
  InputContainer,
  InputContainer2,
  Buttons,
  Button,
  ButtonText,
  TitleModal,
  Error,
  Label,
  Input,
  InputMask,
} from './styles';

export default function ModalForm({setNewCard, setModal}) {
  const [loading, setLoading] = useState(false);
  const [isDefault, setDefault] = useState(false);

  const Validation = Yup.object().shape({
    numero: Yup.string().required('Campo obrigatório!'),
    vencimento: Yup.string().required('Campo válidade obrigatório!'),
    nome: Yup.string().required('Campo nome obrigatório!'),
  });

  function handleSubmit(values, resetForm) {
    setLoading(true);
    console.log({...values, default: isDefault});
    resetForm({...values, default: isDefault});
  }

  return (
    <ContainerModal>
      <ViewModal>
        <TitleModal>Cadastrar cartão</TitleModal>
        <Formik
          validationSchema={Validation}
          initialValues={{
            numero: '',
            vencimento: '',
            nome: '',
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
                <InputMask
                  type="credit-card"
                  style={{width: '65%'}}
                  keyboardType="decimal-pad"
                  error={errors.numero}
                  onChangeText={handleChange('numero')}
                  value={values.numero}
                  placeholder="Número do cartão"
                  returnKeyType="next"
                  /*  onSubmitEditing={() => nomeRef.current.focus()} */
                />
                <Icon
                  name="cc-mastercard"
                  color="#999"
                  size={22}
                  style={{width: '25%', textAlign: 'right'}}
                />
              </InputContainer>
              {errors.numero && <Error>{errors.numero}</Error>}

              <InputContainer2>
                <Input
                  style={{width: '65%'}}
                  error={errors.nome}
                  onChangeText={handleChange('nome')}
                  value={values.nome}
                  placeholder="NOME GRAVADO NO CARTÃO"
                  returnKeyType="next"
                  /*  onSubmitEditing={() => nomeRef.current.focus()} */
                />
                <InputMask
                  type={'datetime'}
                  options={{
                    format: 'MM/YY',
                  }}
                  keyboardType="decimal-pad"
                  style={{
                    width: '25%',
                    alignSelf: 'flex-end',
                    textAlign: 'right',
                    textTransform: 'uppercase',
                  }}
                  error={errors.vencimento}
                  onChangeText={handleChange('vencimento')}
                  value={values.vencimento}
                  placeholder="Válidade"
                  returnKeyType="next"
                />
              </InputContainer2>
              {errors.nome && <Error>{errors.nome}</Error>}
              {errors.vencimento && <Error>{errors.vencimento}</Error>}

              <InputContainer2>
                <Label style={{width: '80%'}}>
                  Definir este cartão como padrão
                </Label>
                <Switch
                  onValueChange={() => setDefault(!isDefault)}
                  value={isDefault}
                />
              </InputContainer2>
              <Buttons>
                <Button background="#FFF" onPress={() => setModal(false)}>
                  <ButtonText color> Cancelar </ButtonText>
                </Button>
                <Button disabled={loading || !isValid} onPress={handleSubmit}>
                  <ButtonText> Cadastrar </ButtonText>
                </Button>
              </Buttons>
            </>
          )}
        </Formik>
      </ViewModal>
    </ContainerModal>
  );
}
