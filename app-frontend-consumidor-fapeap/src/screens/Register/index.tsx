import React, { useContext } from 'react';
import { Alert, View, Platform, Keyboard, StatusBar } from 'react-native';

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
  senha: string;
  password_confirmation: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const formRef = React.useRef<FormHandles>(null);
  const { colors } = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [subtitle, setSubtitle] = React.useState('');
  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);

  const { signOut } = useContext(AuthContext);

  const [dataStep1, setDataStep1] = React.useState<IFormDataStep1>(
    {} as IFormDataStep1,
  );

  const formData = React.useMemo(() => dataStep1, [dataStep1]);

  React.useEffect(() => {
    switch (step) {
      case 1:
        setSubtitle('Precisamos de seus dados pessoais e de acesso');
        break;
      default:
        setSubtitle('Etapa não identificada');
        break;
    }

    if (step < 4) {
      formRef.current?.setData(formData);
      formRef.current?.setErrors({});
    }
  }, [formData, step]);

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
            nome: Yup.string().required('Campo obrigatório'),
            telefone_whatsapp: Yup.string().required('Campo obrigatório'),
            email: Yup.string()
              .email('Informe um email válido')
              .required('Campo obrigatório'),
            cpf: Yup.string().required('Campo obrigatório'),
            senha: Yup.string()
              .min(3, 'Você deve informar no mínimo 4 caracteres')
              .required('Senha é obrigatória'),
            password_confirmation: Yup.string()
              .oneOf([Yup.ref('senha')], 'Senhas não coincidem')
              .required('A confirmação da senha é obrigatória'),
          });

          const objectFormData = Object.assign(formData, {
            nome: data.nome,
            telefone_whatsapp: data.telefone_whatsapp,
            email: data.email,
            cpf: data.cpf,
            senha: data.senha,
            password_confirmation: data.password_confirmation,
          });

          const { nome, telefone_whatsapp, email, cpf } = objectFormData;
          const { senha, password_confirmation } = objectFormData;

          await schemaStep1.validate(
            {
              nome,
              telefone_whatsapp,
              email,
              senha,
              password_confirmation,
              cpf,
            },
            { abortEarly: false },
          );

          setDataStep1({
            nome,
            telefone_whatsapp,
            cpf,
            email,
            senha,
            password_confirmation,
          });

          setLoading(true);

          const response = await signOut(formData);
          const { responseState, responseStatus } = response;

          if (!responseState) {
            Alert.alert('Não foi possível cadastrar', responseStatus);
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }

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
          'Você deve preencher corretamente o formulário e clicar em avançar para ir para a próxima etapa.',
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
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />

          <S.Header>
            <S.Title>Crie sua conta</S.Title>
            <S.Subtitle>{subtitle}</S.Subtitle>
          </S.Header>

          <FormProvider onSubmit={handleSubmit} ref={formRef}>
            <S.Form>
              {step === 1 && (
                <FormStep1
                  formRef={formRef}
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
                Cadastrar
              </S.ButtonSignIn>
            </S.Footer>
          )}
        </S.Container>
      </KeyboardView>
    </View>
  );
};

export default Login;
