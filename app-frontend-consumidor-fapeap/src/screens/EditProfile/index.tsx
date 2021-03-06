import React, { useContext } from 'react';
import { View, Alert, Keyboard } from 'react-native';

import KeyboardView from '@components/KeyboardView';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form as FormProvider } from '@unform/mobile';
import { useTheme } from 'styled-components';
import * as Yup from 'yup';

import AuthContext from '../../contexts/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import FormStep1 from './FormStep1';
import * as S from './styles';

interface ISubmitForm {
  nome: string;
  email: string;
  senha: string;
  password_confirmation: string;
  cpf: string;
  telefone_whatsapp: string;
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
}

interface IFormDataStep1 {
  nome: string;
  telefone_whatsapp: string;
  email: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero_local: string;
  bairro: string;
  senha: string;
  password_confirmation: string;
}

const EditProfile: React.FC = ({ route }) => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

  const { user, updateProfile, signOut } = useContext(AuthContext);

  const [dataStep1, setDataStep1] = React.useState<IFormDataStep1>(
    {} as IFormDataStep1,
  );

  const formData = React.useMemo(() => dataStep1, [dataStep1]);

  React.useEffect(() => {
    if (step < 4) {
      formRef.current?.setData(formData);
      formRef.current?.setErrors({});
    }

    formRef.current?.setData({
      nome: user?.nome,
      telefone_whatsapp: user?.telefone_whatsapp,
      email: user?.email,
      cpf: user?.cpf,
      cep: user?.cep,
      logradouro: user?.logradouro,
      bairro: user?.bairro,
      numero_local: user?.numero_local,
    });
  }, [user, formData, step]);

  React.useEffect(() => {
    function onKeyboardDidShow(): void {
      setKeyboardIsOpen(true);
    }

    function onKeyboardDidHide(): void {
      setKeyboardIsOpen(false);
    }

    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, [keyboardIsOpen]);

  const handleSubmit = React.useCallback(
    async (data: ISubmitForm) => {
      formRef.current?.setErrors({});

      if (step === 1) {
        try {
          const schemaStep1 = Yup.object().shape({
            nome: Yup.string().required('Campo obrigat??rio'),
            telefone_whatsapp: Yup.string().required('Campo obrigat??rio'),
            email: Yup.string()
              .email('Informe um email v??lido')
              .required('Campo obrigat??rio'),
            cpf: Yup.string().required('Campo obrigat??rio'),
            senha: Yup.string(),
            password_confirmation: Yup.string(),
          });

          const schemaStep2 = Yup.object().shape({
            cep: Yup.string().required('Campo obrigat??rio'),
            logradouro: Yup.string().required('Campo obrigat??rio'),
            bairro: Yup.string().required('Campo obrigat??rio'),
            numero_local: Yup.string().required('Campo obrigat??rio'),
          });

          const schemaStep3 = Yup.object().shape({
            senha: Yup.string()
              .min(3, 'Voc?? deve informar no m??nimo 4 caracteres')
              .required('Senha ?? obrigat??ria'),
            password_confirmation: Yup.string()
              .oneOf([Yup.ref('senha')], 'Senhas n??o coincidem')
              .required('A confirma????o da senha ?? obrigat??ria'),
          });

          const objectFormData = Object.assign(formData, {
            nome: data.nome,
            telefone_whatsapp: data.telefone_whatsapp,
            email: data.email,
            cpf: data.cpf,
            cep: data.cep,
            logradouro: data.logradouro,
            bairro: data.bairro,
            numero_local: data.numero_local,
            senha: data.senha,
            password_confirmation: data.password_confirmation,
          });

          const {
            nome,
            telefone_whatsapp,
            email,
            cpf,
            cep,
            logradouro,
            bairro,
            numero_local,
          } = objectFormData;
          const { senha, password_confirmation } = objectFormData;

          if (data.cpf !== undefined) {
            await schemaStep1.validate(
              {
                nome,
                telefone_whatsapp,
                email,
                cpf,
              },
              { abortEarly: false },
            );
          }

          if (data.cep !== undefined) {
            await schemaStep2.validate(
              {
                cep,
                logradouro,
                bairro,
                numero_local,
              },
              { abortEarly: false },
            );
          }

          if (data.senha !== undefined) {
            await schemaStep3.validate(
              {
                senha,
                password_confirmation,
              },
              { abortEarly: false },
            );
          }

          /* setDataStep1({
            nome,
            telefone_whatsapp,
            cpf,
            email,
            senha,
            password_confirmation,
            cep,
            logradouro,
            bairro,
            numero_local,
          }); */

          setLoading(true);

          for (const propName in objectFormData) {
            if (
              objectFormData[propName] === null ||
              objectFormData[propName] === undefined ||
              objectFormData[propName] === ''
            ) {
              delete objectFormData[propName];
            }
          }

          console.log(objectFormData);

          const response = await updateProfile(objectFormData);
          const { responseState, responseStatus } = response;

          if (!responseState) {
            Alert.alert('N??o foi poss??vel atualizar', responseStatus);
          } else {
            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            navigation.goBack();
          }

          formRef.current?.setData({
            nome: objectFormData?.nome,
            telefone_whatsapp: objectFormData?.telefone_whatsapp,
            email: objectFormData?.email,
            cpf: objectFormData?.cpf,
            cep: objectFormData?.cep,
            logradouro: objectFormData?.logradouro,
            bairro: objectFormData?.bairro,
            numero_local: objectFormData?.numero_local,
          });

          setLoading(false);
        } catch (err) {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err);
            formRef.current?.setErrors(errors);
          }
        }
      }
    },
    [formData, navigation, step, signOut],
  );

  const submitForm = React.useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  const focusTargetInput = React.useCallback((field: string) => {
    const nameInput = formRef.current?.getFieldRef(field);
    nameInput.focus();
  }, []);

  const nextStep = React.useCallback(
    (targetStep: number) => {
      if (targetStep > step) {
        Alert.alert(
          'Um momento',
          'Voc?? deve preencher corretamente o formul??rio e clicar em avan??ar para ir para a pr??xima etapa.',
        );
        return;
      }
      setStep(targetStep);
    },
    [step],
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardView>
        <S.Container showsVerticalScrollIndicator={false}>
          <FormProvider onSubmit={handleSubmit} ref={formRef}>
            <S.Form>
              {step === 1 && (
                <FormStep1
                  formRef={formRef}
                  fieldsAvailable={route.params}
                  onSubmitForm={submitForm}
                  focusTargetInput={focusTargetInput}
                />
              )}
            </S.Form>
          </FormProvider>

          {!keyboardIsOpen && (
            <S.Footer>
              <S.ButtonSignIn
                onPress={() => formRef.current?.submitForm()}
                loading={loading}
              >
                Salvar
              </S.ButtonSignIn>
            </S.Footer>
          )}
        </S.Container>
      </KeyboardView>
    </View>
  );
};

export default EditProfile;
