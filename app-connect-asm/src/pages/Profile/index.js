import React, { useEffect, useState } from 'react';

import {
  Container,
  Center,
  ViewImage,
  Image,
  ViewImageTitle,
  ViewImageText,
  PasswordInput,
} from './styles';

import {
  View,
  Text,
  Alert,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { colors } from '~/styles';
import logo from '~/assets/logo.jpeg';

import ImagePicker from 'react-native-image-picker';
import store from '~/services/storage';

import Modal from 'react-native-modal';
import { user_service, connect_service } from '~/services/api';

import ImageResizer from 'react-native-image-resizer';

export default function Profile() {
  const options = {
    title: 'Selecione Foto de Perfil',
    takePhotoButtonTitle: 'Tirar Foto',
    chooseFromLibraryButtonTitle: 'Selecionar da Galeria',
    cancelButtonTitle: 'Cancelar',
    tintColor: '#FFF',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(false);
  const [erroModal, seterroModal] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalConfirmacao, setVisibleModalConfirmacao] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confimrPassword, setConfirmPassword] = useState('');

  const [resizedImageUri, setResizedImageUri] = useState('');

  const [avatarSource, setAvatarSource] = useState(null);
  const [user, setUser] = useState({
    name: '',
    cpf: '',
    trabalhador_cargo: '',
  });

  useEffect(() => {
    getProfilePhoto();
  }, []);

  async function getProfilePhoto() {
    try {
      setLoading(true);
      const user = await store.get('User');
      const { data } = await user_service.get(`/users/${user.cpf}`);

      //const source = await store.get('avatar');
      if (data.url != null) {
        setAvatarSource(data.url);
      }

      setUser(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }

  function renderModalContent() {
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
            fontFamily: 'Quicksand-Bold',
            fontSize: 28,
            color: '#000',
            marginBottom: 10,
          }}>
          Alterar senha
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

        <PasswordInput
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Senha atual"
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          value={oldPassword}
          onChangeText={setOldPassword}
        />

        <PasswordInput
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Nova senha"
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          value={password}
          onChangeText={setPassword}
        />

        <PasswordInput
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Confirmar nova senha"
          placeholderTextColor="#999"
          underlineColorAndroid="transparent"
          value={confimrPassword}
          onChangeText={setConfirmPassword}
        />

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#909090',
              borderRadius: 5,
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
                  fontFamily: 'Quicksand-Bold',
                  fontSize: 20,
                }}>
                Sair
              </Text>
            }
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: `${colors.primary}`,
              borderRadius: 5,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              width: '35%',
              marginHorizontal: 15,
            }}
            title="Salvar"
            onPress={() => alterarSenha()}
            disabled={loadingModal}>
            {loadingModal ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text
                  style={{
                    color: '#FFF',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Quicksand-Bold',
                    fontSize: 20,
                  }}>
                  Alterar
                </Text>
              )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function alterarSenha() {
    setLoadingModal(true);
    seterroModal('');

    try {
      if (password == confimrPassword) {
        await user_service.put(`/users`, {
          cpf: user.cpf,
          oldPassword,
          password,
          confirmPassword: confimrPassword
        });

        setVisibleModal(false);
        setTimeout(() => {
          setVisibleModalConfirmacao(true);
        }, 1000);
      } else {
        seterroModal('Senhas não coincidem');
      }
    } catch (error) {
      console.log(error);
      seterroModal(
        'Não foi possível altera sua senha, consulte o RH do santa maria.',
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
            fontFamily: 'Quicksand-Bold',
            fontSize: 28,
            color: '#000',
            marginBottom: 15,
            textAlign: 'center',
          }}>
          Senha alterada com sucesso!
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
                fontFamily: 'Quicksand-Bold',
                fontSize: 20,
              }}>
              Entendi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async function InsertUser(image) {
    const formData = new FormData();

    const resize = image =>
      new Promise((resolve, reject) => {
        ImageResizer.createResizedImage(image.uri, 300, 300, 'JPEG', 100)
          .then(({ uri }) => {
            setResizedImageUri(uri);
            resolve(uri);
          })
          .catch(err => {
            return Alert.alert(
              'Unable to resize the photo',
              'Check the console for full the error message',
            );
          });
      });

    const iru = await resize(image);

    let photo = {
      uri: iru,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    formData.append('file', photo);

    try {
      const response = await user_service.put(`/users/avatar`, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      setAvatarSource(response.data.url);
      await store.save('avatar', response.data.url);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color={'#000'}
          />
        </View>
      ) : (
          <Container>
            <Modal isVisible={visibleModal}>{renderModalContent()}</Modal>
            <Modal isVisible={visibleModalConfirmacao}>
              {renderModalConfirmacao()}
            </Modal>

            <Center>
              <ViewImage>
                <TouchableOpacity
                  onPress={() => {
                    ImagePicker.showImagePicker(options, response => {
                      if (response.didCancel) {
                        console.log('User cancelled image picker');
                      } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                      } else if (response.customButton) {
                        console.log(
                          'User tapped custom button: ',
                          response.customButton,
                        );
                      } else {
                        InsertUser(response);
                      }
                    });
                  }}>
                  <Image
                    source={avatarSource != null ? { uri: avatarSource } : logo}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <ViewImageTitle style={{ textAlign: 'justify' }}>
                    {user.name}
                  </ViewImageTitle>
                  {/* <ViewImageText>{user.trabalhador_cargo}</ViewImageText> */}
                  <ViewImageText>CPF: {mCPF(user.cpf)}</ViewImageText>
                </View>
              </ViewImage>
            </Center>

            <TouchableOpacity
              style={{
                justifyContent: 'center',
                backgroundColor: colors.primary,
                borderRadius: 5,
                padding: 10,
                marginHorizontal: 20,
              }}
              onPress={() => {
                seterroModal('');
                setVisibleModal(true);
              }}>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#fff' }}>ALTERAR SENHA</Text>
              </View>
            </TouchableOpacity>
          </Container>
        )}
    </>
  );
}
