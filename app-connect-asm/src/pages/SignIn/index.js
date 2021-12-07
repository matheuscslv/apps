import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Container, CpfInput, EnterButton, TextButton} from './styles';
import Logo from '~/components/Logo';
import {user_service, connect_service} from '~/services/api';
import store from '~/services/storage';
import {StackActions, NavigationActions} from 'react-navigation';

import Modal from 'react-native-modal';
import {colors} from '~/styles';
//import {RadioButton} from 'react-native-paper';

import {showMessage} from 'react-native-flash-message';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default function SignIn({navigation}) {
  //04141166235 e 01169309267 00524304211 86545639234 6981
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalConfimation, setModalConfirmation] = useState(false);
  const [checked, setChecked] = useState('first');
  const [loadingModal, setLoadingModal] = useState(false);
  const [cellphone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState(2); //1 email 2 sms
  const [radios, setRadios] = useState([]);
  const [initialValue, setinitialValue] = useState(0);

  async function signIn() {
    let resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'OAuth'})],
    });

    setLoading(true);

    try {
      if (String(cpf) == '') {
        throw 'is Empty';
      }

      /* const { data } = await api.get(`/login/${String(cpf).replace(/\D/g, '')}`);
      if (data.length > 0) {
        // codigo_trabalhador
        // id_trabalhador
        // cpf_trabalhador
        await store.save('User', data[0]);
      } else {
        throw 'is Empty';
      } */

      const userlogged = await connect_service.put(`/sessions`, {
        cpf: String(cpf).replace(/\D/g, ''),
      });

      console.log(userlogged.data);

      await store.save('User', {
        cpf: userlogged.data.cpf,
        firstAccess: userlogged.data.firstAccess,
      });

      if (userlogged.data.firstAccess) {
        setCellPhone(
          userlogged.data.cellphone == null ? '' : userlogged.data.cellphone,
        );
        setEmail(userlogged.data.email == null ? '' : userlogged.data.email);

        let radio = [];
        if (userlogged.data.cellphone != null) {
          radio.push({label: userlogged.data.cellphone, value: 0});
          setType(2);
        } else {
          setType(1);
        }
        if (userlogged.data.email != null) {
          radio.push({label: userlogged.data.email, value: 1});
        }
        setRadios(radio);

        setModalConfirmation(true);
      } else {
        navigation.dispatch(resetAction);
      }

      //navigation.dispatch(resetAction);
    } catch (error) {
      if (String(error).includes('401')) {
        //Você não possui mais acesso! Qualquer dúvida favor contatar o RH.
        Alert.alert(
          'Não autorizado',
          'Seu acesso ao sistema está bloqueado. Para regularizá-lo, procure o RH.',
        );
      } else if (
        String(error).includes('500') ||
        String(error).includes('504')
      ) {
        showMessage({
          message:
            'Ocorreu um erro interno em nossos servidores! Qualquer dúvida favor contatar o RH.',
          type: 'danger',
          autoHide: false,
        });
      } else if (String(error) === 'is Empty') {
        Alert.alert('Preencha o campo com o seu CPF');
      } else {
        Alert.alert(
          'Erro interno',
          'Desculpe, no momento o sistema encontra-se indisponível. Por favor, tente novamente daqui a alguns minutos.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function sendPassword() {
    let resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'OAuth'})],
    });

    setLoadingModal(true);

    try {
      const user = await store.get('User');

      // console.log({
      //   cpf: user.cpf,
      //   method: type,
      //   first_access: user.firstAccess,
      // });

      const {data} = await connect_service.post(`/forgot_password`, {
        cpf: user.cpf,
        method: type,
        first_access: user.firstAccess,
      });

      // console.log(data);

      Alert.alert(
        'Primeiro Acesso',
        data.message,
        [{text: 'OK', onPress: () => navigation.dispatch(resetAction)}],
        {cancelable: false},
      );
    } catch (error) {
      setModalConfirmation(false)
      Alert.alert('Erro interno', error.response.data.error);
    }

    setLoadingModal(false);
  }

  function renderModalConfirmacao() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 30,
          justifyContent: 'center',
          borderRadius: 4,
          borderColor: 'rgba(0,0,0,0.1)',
        }}>
        <View style={{justifyContent: 'center'}}>
          <View
            style={{
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                marginBottom: 10,
                textTransform: 'uppercase',
                fontSize: 16,
              }}>
              Primeiro Acesso
            </Text> */}

            {email != '' || cellphone != '' ? (
              <Text
                style={{
                  fontFamily: 'Quicksand-Bold',
                  //textTransform: 'uppercase',
                  fontSize: 15,
                }}>
                Como deseja receber a sua senha?
              </Text>
            ) : (
              <Text />
            )}
          </View>

          {/* {cellphone != '' && (
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 100,
                  marginRight: 10,
                }}>
                <RadioButton
                  value="first"
                  color={colors.primary}
                  //uncheckedColor="#F00"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('first');
                    setType(2);
                  }}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Quicksand-Regular',
                  fontSize: 16,
                }}>
                {cellphone}
              </Text>
            </View>
          )}

          {email != '' && (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 100,
                  marginRight: 10,
                }}>
                <RadioButton
                  value="second"
                  color={colors.primary}
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked('second');
                    setType(1);
                  }}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  fontFamily: 'Quicksand-Regular',
                  fontSize: 16,
                }}>
                {email}
              </Text>
            </View>
          )} */}

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <RadioForm
              radio_props={radios}
              initial={initialValue}
              //buttonColor={colors.primary}
              labelStyle={{fontFamily: 'Quicksand-Regular', color: '#999'}}
              buttonSize={15}
              buttonColor={'#999'}
              selectedButtonColor={'#999'}
              onPress={value => {
                setChecked(value);
                setType(value == 0 ? 2 : 1);
              }}
            />
          </View>

          {email == '' && cellphone == '' ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Quicksand-Regular',
                  color: '#Ed3239',
                  fontSize: 14,
                  marginBottom: 5,
                }}>
                Usuário não possui telefone ou email cadastrado. Para atualizar
                o cadastro de telefone ou email, procure o RH.
              </Text>

              <View
                style={{
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  disabled={loadingModal}
                  style={{
                    backgroundColor: '#ED3239',
                    borderRadius: 5,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '35%',
                    marginHorizontal: 15,
                    backgroundColor: `${colors.primary}`,
                  }}
                  title="Enviar"
                  onPress={() => setModalConfirmation(false)}>
                  <Text
                    style={{
                      //textTransform: 'uppercase',
                      color: '#FFF',
                      fontFamily: 'Quicksand-Bold',
                      fontSize: 20,
                    }}>
                    Sair
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                disabled={loadingModal}
                style={{
                  backgroundColor: '#ED3239',
                  borderRadius: 5,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '60%',
                  marginHorizontal: 15,
                  backgroundColor: `${colors.primary}`,
                }}
                title="Enviar"
                onPress={() => sendPassword()}>
                {loadingModal ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text
                    style={{
                      //textTransform: 'uppercase',
                      color: '#FFF',
                      fontFamily: 'Quicksand-Bold',
                      fontSize: 20,
                    }}>
                    Enviar {type == 1 ? 'E-mail' : 'SMS'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Logo />

        <CpfInput
          type={'cpf'}
          keyboardType="numeric"
          placeholder="CPF"
          placeholderTextColor="#999"
          value={cpf}
          onChangeText={e => setCpf(e)}
          blurOnSubmit={false}
        />

        <EnterButton onPress={() => signIn()}>
          {loading ? (
            <ActivityIndicator size="large" color={'#fff'} />
          ) : (
            <TextButton>Entrar</TextButton>
          )}
        </EnterButton>
      </KeyboardAvoidingView>

      <Modal isVisible={modalConfimation}>{renderModalConfirmacao()}</Modal>
    </Container>
  );
}

SignIn.navigationOptions = {
  header: null,
};
