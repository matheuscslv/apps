import React, { useRef, useState, useEffect } from 'react';
import { Switch, Alert, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import { Label } from '~/components/Input/styles';
import Loading from '~/components/Loading';
import PickerOptions from '~/components/PickerOptions';
import api from '~/services/api';
import { UserTypes } from '~/store/ducks/user';
import { colors } from '~/styles';

import selectImage from './lib/selectPhoto';
import {
  Container,
  Header,
  Avatar,
  ButtonReplaceAvatar,
  Name,
  Email,
  EditionContent,
  LabelEdition,
  FormContent,
  ContainerPosition,
  Info,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const userLogged = useSelector(state => state.user.data);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [editable, setEditable] = useState(false);
  const [positions, setPositions] = useState(null);
  const [position_id, setPositionId] = useState(null);
  const [spinValue] = useState(new Animated.Value(0));

  useEffect(() => {
    api
      .get('/positions')
      .then(response => {
        setPositions(
          response.data.map(position => ({
            checked: position.id === userLogged.position.id,
            ...position,
          }))
        );
        setPositionId(userLogged.position.id);
        formRef.current.setData({
          email: userLogged.email,
          team: userLogged.team,
          name: userLogged.name,
        });
      })
      .catch(e => {
        console.log(e);
      });

    setLoadingPage(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged]);

  useEffect(() => {
    if (loading) {
      Animated.timing(spinValue, {
        toValue: 40,
        duration: 100000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  async function validationFields(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(50, 'Máximo 50 caracteres')
          .required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um email válido')
          .max(100, 'Máximo 100 caracteres')
          .required('Email é obrigatório'),
        team: Yup.string().max(50, 'Máximo 50 caracteres'),
        password: Yup.string().max(50, 'Máximo 50 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (!position_id) {
        Alert.alert(
          'Campo obrigatório',
          'Você deve selecionar a posição em que o participante irá jogar!'
        );
        return false;
      }

      return true;
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

  async function handleSubmit(data) {
    setLoading(true);
    if (!(await validationFields(data))) {
      setLoading(false);
    } else {
      const { password, email, ...rest } = data;
      let content = {
        ...rest,
        position_id,
      };

      if (password) {
        content = {
          ...rest,
          password,
          position_id,
        };
      }

      dispatch({
        type: UserTypes.HANDLE_UPDATE_USER_REQUEST,
        data: content,
        setLoading,
        setEditable,
      });
    }
  }

  async function handleChangeAvatar() {
    const data = new FormData();
    const photo = await selectImage();

    if (!photo) return;

    const avatar = {
      uri: photo,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    data.append('avatar', avatar);

    dispatch({
      type: UserTypes.HANDLE_UPDATE_USER_REQUEST,
      data,
      setLoading,
      setEditable,
    });
  }

  if (loadingPage) {
    return <Loading style={{ width: 50, height: 50 }} />;
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: userLogged?.url }}>
          <ButtonReplaceAvatar
            onPress={handleChangeAvatar}
            style={{
              transform: [
                {
                  rotate: spinValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            }}
          >
            <Icon name="refresh" size={28} color={colors.primary} />
          </ButtonReplaceAvatar>
        </Avatar>
        <Name>{userLogged?.name}</Name>
        <Email>{userLogged?.email}</Email>
      </Header>
      <EditionContent>
        <LabelEdition>Habilitar edição</LabelEdition>
        <Switch value={editable} onValueChange={() => setEditable(!editable)} />
      </EditionContent>
      {userLogged?.name && (
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContent>
            <Input
              style={{ marginBottom: 10 }}
              label="Nome"
              placeholder="Seu nome"
              name="name"
              editable={editable}
            />
            <Input
              style={{ marginBottom: 10 }}
              label="Email"
              placeholder="Seu email"
              name="email"
              editable={false}
            />
            <Input
              style={{ marginBottom: 10 }}
              label="Time do coração"
              placeholder="Seu time número 1"
              name="team"
              editable={editable}
            />
            <ContainerPosition>
              <Label>Posição em campo</Label>
              {positions && (
                <PickerOptions
                  isSelectSingle
                  style={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    marginTop: 0,
                    paddingTop: 0,
                  }}
                  colorTheme="#000"
                  popupTitle="Selecione a posição do jogador!"
                  cancelButtonText="Cancelar"
                  selectButtonText="Selecionar"
                  title="Posição em campo"
                  data={positions}
                  onSelect={value => setPositionId(value[0])}
                  onRemoveItem={value => setPositionId(value[0])}
                  showSearchBox={false}
                  disabled={!editable}
                />
              )}
            </ContainerPosition>
            <Input
              style={{ marginBottom: 10 }}
              label="Senha (opcional)"
              name="password"
              placeholder="Não preencha para manter a mesma senha"
              editable={editable}
            />
          </FormContent>

          <Info>
            Você não pode alterar seu email, consulte um administrador!
          </Info>
        </Form>
      )}
      <Button
        title="Atualizar dados"
        onSubmit={() => formRef.current.submitForm()}
        loading={loading}
        style={{ marginTop: 30 }}
        disabled={!editable || loading}
      />
    </Container>
  );
}


Profile.navigationOptions = {
    headerBackTitleVisible: false,
    headerStyle: {
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      }
    }
}