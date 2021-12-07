import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import Modal from 'react-native-modal';
import { StackActions, NavigationActions } from 'react-navigation';
import Logo from '~/components/Logo';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import {
  Container,
  Center,
  PasswordInput,
  Buttons,
  EnterButton,
  RecoveryButton,
  TextButton,
  Image,
} from './styles';

import Mask from './Mask';
import { colors } from '~/styles';

import { user_service, connect_service } from '~/services/api';
import store from '~/services/storage';

import { subscribeToNotification } from '~/services/notification';

//import {RadioButton} from 'react-native-paper';

export default function OAuth({ navigation }) {
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);
  const [erroModal, seterroModal] = useState('');

  const [emailModal, setEmailModal] = useState('');

  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalConfirmacao, setVisibleModalConfirmacao] = useState(false);

  const [modalConfimation, setModalConfirmation] = useState(false);
  const [checked, setChecked] = useState('first');
  const [cellphone, setCellPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState(2); //1 email 2 sms
  const [radios, setRadios] = useState([]);
  const [initialValue, setinitialValue] = useState(0);

  async function getInformations() {
    const user = await store.get('User');
    const userlogged = await connect_service.put(`/sessions`, {
      cpf: user.cpf,
    });

    setCellPhone(
      userlogged.data.cellphone == null ? '' : userlogged.data.cellphone,
    );
    setEmail(userlogged.data.email == null ? '' : userlogged.data.email);

    let radio = [];
    if (userlogged.data.cellphone != null) {
      radio.push({ label: userlogged.data.cellphone, value: 0 });
      setType(2);
    } else {
      setType(1);
    }
    if (userlogged.data.email != null) {
      radio.push({ label: userlogged.data.email, value: 1 });
    }
    setRadios(radio);
  }

  useEffect(() => {
    getInformations();
  }, []);

  async function signIn() {
    let resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Main' })],
    });

    setLoading(true);
    setErrorPassword('');

    try {
      if (String(password) !== '') {
        const user = await store.get('User');
        const { data } = await user_service.post(`/sessions`, {
          password,
          cpf: user.cpf,
        });
        await store.save('token', data.token);

        //console.log(user.id_trabalhador)
        //console.log(password)
        //console.log(data.token.token)

        try {
          subscribeToNotification(user.cpf);
        } catch (error) { }

        navigation.dispatch(resetAction);
      } else {
        setErrorPassword('Senha não inserida');
      }
    } catch (error) {
      setForgotPassword(true);
      Alert.alert(
        'Erro de autenticação',
        'Verifique suas credenciais. Qualquer dúvida favor contatar o RH.',
      );
    } finally {
      setLoading(false);
    }
  }

  function returnScreen() {
    let resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    });
    navigation.dispatch(resetAction);
  }

  /* function renderModalContent() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 30,
          justifyContent: 'center',
          borderRadius: 4,
          borderColor: 'rgba(0,0,0,0.1)',
        }}>
        <Text
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 28,
            color: '#000',
            marginBottom: 15,
          }}>
          Recuperar senha
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 16,
            color: '#000',
            marginBottom: 20,
          }}>
          Digite o e-mail de sua conta para recuperar a senha:
        </Text>

        <Text
          style={{
            textAlign: 'center',
            color: '#Ed3239',
            fontSize: 14,
            marginBottom: 5,
          }}>
          {erroModal}
        </Text>

        <TextInput
          keyboardType="email-address"
          style={{
            backgroundColor: '#eee',
            placeholderTextColor: '#999',
            borderRadius: 25,
            height: 40,
            width: '100%',
            color: '#999',
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 24,
            marginBottom: 35,
            paddingBottom: 0,
            paddingTop: 0,
            textAlignVertical: 'center',
          }}
          placeholder="E-mail"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={emailModal}
          onChangeText={setEmailModal}
          onSubmitEditing={() => recuperarSenha()}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#909090',
              borderRadius: 25,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: '35%',
              marginHorizontal: 15,
            }}
            title="Sair"
            onPress={() => setVisibleModal(false)}>
            {
              <Text
                style={{
                  color: '#FFF',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                Sair
              </Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: `${colors.primary}`,
              borderRadius: 25,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: '35%',
              marginHorizontal: 15,
            }}
            title="Enviar"
            onPress={() => recuperarSenha()}
            disabled={loadingModal}>
            {loadingModal ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text
                  style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Enviar
                </Text>
              )}
          </TouchableOpacity>
        </View>
      </View>
    );
  } */

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
        <View style={{ justifyContent: 'center' }}>
          <View
            style={{
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Text
              style={{
                marginBottom: 10,
                textTransform: 'uppercase',
                fontSize: 16,
                fontFamily: 'Quicksand-Bold',
              }}>
              Recuperação de Senha
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
                marginBottom: 20,
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

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <RadioForm
              radio_props={radios}
              initial={initialValue}
              //buttonColor={colors.primary}
              labelStyle={{ fontFamily: 'Quicksand-Regular', color: '#999' }}
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
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <TouchableOpacity
                disabled={loadingModal}
                style={{
                  backgroundColor: '#ED3239',
                  borderRadius: 5,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '35%',
                  marginHorizontal: 15,
                  backgroundColor: `#999`,
                }}
                title="Enviar"
                onPress={() => setModalConfirmation(false)}>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    color: '#FFF',
                    fontFamily: 'Quicksand-Bold',
                    fontSize: 20,
                  }}>
                  Sair
                </Text>
              </TouchableOpacity> */}

                <TouchableOpacity
                  disabled={loadingModal}
                  style={{
                    backgroundColor: '#ED3239',
                    borderRadius: 5,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60%',
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

  async function sendPassword() {
    setLoadingModal(true);

    try {
      const user = await store.get('User');
      const { data } = await connect_service.post(`/forgot_password`, {
        cpf: user.cpf,
        method: type,
        first_access: user.firstAccess,
      });

      setTimeout(() => {
        Alert.alert('Recuperação de Senha', data.message);
      }, 1000);
    } catch (error) {
      setTimeout(() => {
        Alert.alert(
          'Recuperação de Senha',
          'Não foi possível recuperar sua senha. Se persistir, consulte o RH do santa maria.',
        );
      }, 1000);
    } finally {
      setLoadingModal(false);

      //setTimeout(() => {
      setModalConfirmation(false);
      //}, 1000);
    }
  }

  /* async function recuperarSenha() {
    setLoadingModal(true);
    seterroModal('');

    const resp = Mask(emailModal, 'senha');
    if (resp !== '') {
      setLoadingModal(false);
      seterroModal(resp);
      return;
    }

    try {
      const user = await store.get('User');
      await api.post(`/forgot_password`, {
        cpf: user.cpf_trabalhador,
        email: emailModal,
      });

      setVisibleModal(false);
      setTimeout(() => {
        setVisibleModalConfirmacao(true);
      }, 1000);
    } catch (error) {
      seterroModal(
        'Usuário não encontrado na base de dados! Se persistir, consulte o RH do santa maria.',
      );
    } finally {
      setLoadingModal(false);
    }
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
        <Text
          style={{
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: 28,
            color: '#000',
            marginBottom: 15,
            textAlign: 'center',
          }}>
          Email enviado!
        </Text>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 16,
            color: '#000',
            marginBottom: 20,
          }}>
          Um email de confirmação foi enviado para o endereço fornecido. Use-o
          para alterar sua senha.
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ED3239',
              borderRadius: 5,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              // marginBottom: 8,
              width: '35%',
              marginHorizontal: 15,
              backgroundColor: `${colors.primary}`,
            }}
            title="Entendi"
            onPress={() => setVisibleModalConfirmacao(false)}>
            <Text
              style={{
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Entendi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } */

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

        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Quicksand-Regular',
            color: '#Ed3239',
            fontSize: 14,
            marginBottom: 5,
          }}>
          {errorPassword}
        </Text>

        <PasswordInput
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Senha"
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={setPassword}
        />

        <Buttons>
          <EnterButton onPress={() => signIn()}>
            {loading ? (
              <ActivityIndicator size="large" color={'#fff'} />
            ) : (
                <TextButton>Entrar</TextButton>
              )}
          </EnterButton>
        </Buttons>

        <View style={{ marginTop: 20 }}>
          <Center>
            {forgotPassword && (
              <TouchableOpacity onPress={() => returnScreen()}>
                <RecoveryButton>Autenticar com outro CPF</RecoveryButton>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => setModalConfirmation(true)}>
              <RecoveryButton>Recuperar senha</RecoveryButton>
            </TouchableOpacity>
          </Center>
        </View>

        {/* <Modal isVisible={visibleModal}>{renderModalContent()}</Modal> */}

        <Modal isVisible={modalConfimation}>{renderModalConfirmacao()}</Modal>
      </KeyboardAvoidingView>
    </Container>
  );
}

OAuth.navigationOptions = {
  header: null,
};
