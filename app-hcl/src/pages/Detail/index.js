import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  TouchableOpacity,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import ModalGuest from '~/components/ModalGuest';
import api from '~/services/api';
import { colors } from '~/styles';

import CardPlayer from './CardPlayer';
import ShareListUsers from './share';
import {
  Container,
  Separator,
  Title,
  Quantily,
  Header,
  HeaderTitle,
  HeaderSubTitle,
  Buttons,
  ButtonConfirmation,
  ButtonName,
  ButtonGuest,
  Divider,
} from './styles';

export default function Detail({ navigation }) {
  const {
    id: idMatche,
    available,
    date_full,
    locale,
    week_number,
  } = useMemo(() => {
    return navigation.getParam('matche');
  }, [navigation]);

  const userLogged = useSelector(state => state.user.data);
  const pakito_crash = useSelector(state => state.constants.pakito_crash);

  const [status, setStatus] = useState({
    idUser: userLogged.id,
    position: userLogged.position,
    confirmation: null,
    package_name: userLogged.package.name,
    name: userLogged.name,
    url: String(userLogged?.url).includes('http')
      ? userLogged?.url
      : userLogged.avatar,
    daily: userLogged.days_package?.split(',')?.includes(week_number),
  });

  const [loading, setLoding] = useState(true);
  const [modal, setModal] = useState(false);
  const [loadingConfirmation, setLodingConfirmation] = useState(false);
  const [loadingPaquito, setLodingPaquito] = useState(false);
  const [inside, setInside] = useState([]);
  const [out, setOut] = useState([]);
  const [scrollOffset] = useState(new Animated.Value(0));

  const numberInside = useMemo(() => {
    return inside.length;
  }, [inside]);

  const numberOut = useMemo(() => {
    return out.length;
  }, [out]);

  const handleDetailMatche = useCallback(async () => {
    console.log(status);
    try {
      const response = await api.get(`/matches/${idMatche}`);
      const { users } = response.data.matche;

      const usersInside = [];
      const usersOut = [];

      users.forEach(user => {
        const { name: position } = user.position;
        let package_name = 'Paquito';
        const { confirmation, daily, guest, id, user_id } = user.pivot;

        if (user.package) package_name = user.package.name;
        if (daily) package_name = 'Diarista';

        const userStatus = {
          position,
          confirmation,
          daily,
          guest,
          package_name,
          name: user.name,
          id,
          url: user.url,
        };

        if (confirmation) {
          usersInside.push(userStatus);
        } else {
          usersOut.push(userStatus);
        }

        if (user_id === status.idUser) {
          setStatus({ ...userStatus, idUser: user_id });
        }
      });

      setInside(usersInside);
      setOut(usersOut);
      setLoding(false);
    } catch (e) {
      handleDetailMatche();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMatche]);

  async function removeGuest(user) {
    Alert.alert(
      'Atenção',
      `Deseja mesmo remover o paquito ${user.name}!`,
      [
        {
          text: 'NÃO',
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: async () => {
            setLodingPaquito(true);
            await api.put(`matche_confirmation/${user.id}`);
            setInside(inside.filter(({ id }) => id !== user.id));
            Alert.alert(
              'Tudo certo!',
              `Paquito ${user.name} foi removido da partida!`
            );
            setLodingPaquito(false);
          },
        },
      ],
      { cancelable: false }
    );
  }

  const numberMensalists = useMemo(() => {
    const list = inside.filter(({ guest, daily }) => !guest && !daily);
    return list.length;
  }, [inside]);

  async function handleConfimation() {
    setLodingConfirmation(true);

    try {
      let response;

      if (status.confirmation === null) {
        response = await api.post(`/matche_confirmation/${idMatche}`, {
          user_id: status.idUser,
        });
      } else {
        response = await api.put(`/matche_confirmation/${status.id}`);
      }

      const { confirmation, id } = response.data;

      const newConfirmation = {
        ...status,
        confirmation,
        id,
      };

      if (confirmation) {
        setInside([
          newConfirmation,
          ...inside.filter(({ id: idConfirmation }) => idConfirmation !== id),
        ]);
        setOut(out.filter(({ id: idConfirmation }) => idConfirmation !== id));
      } else {
        setOut([
          newConfirmation,
          ...out.filter(({ id: idConfirmation }) => idConfirmation !== id),
        ]);
        setInside(
          inside.filter(({ id: idConfirmation }) => idConfirmation !== id)
        );
      }

      setStatus(newConfirmation);
    } catch (e) {
      if (e.response) {
        Alert.alert('Ação não permitida!', e.response.data.message);
      }
    }

    setLodingConfirmation(false);
  }

  function addNewGuest(guest) {
    setInside([guest, ...inside]);
  }

  const renderInsideUsers = useCallback(() => {
    return inside.map(user => (
      <CardPlayer
        user={user}
        key={user.id}
        idUser={status.idUser}
        guest={user.guest}
        removeGuest={removeGuest}
        loading={loadingPaquito}
        available={available}
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inside, loadingPaquito]);

  const renderOutUsers = useCallback(() => {
    return out.map(user => (
      <CardPlayer
        user={user}
        key={user.id}
        idUser={status.idUser}
        guest={user.guest}
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [out]);

  useEffect(() => {
    handleDetailMatche();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setParams({
      share: () => ShareListUsers(inside, out, { locale, date: date_full }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date_full, inside, locale, out]);

  if (loading) {
    return <Loading style={{ width: 70, height: 70 }} />;
  }

  return (
    <>
      <Container
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: { y: scrollOffset },
            },
          },
        ])}
      >
        <CardPlayer user={status} idUser={status.idUser} />
        <Separator>
          <Title>Dentro</Title>
          <Quantily>{numberInside}</Quantily>
        </Separator>
        {renderInsideUsers()}
        <Separator>
          <Title color={colors.danger}>Fora</Title>
          <Quantily color={colors.danger}>{numberOut}</Quantily>
        </Separator>
        {renderOutUsers()}
      </Container>
      <Buttons
        style={{
          transform: [
            {
              translateY: scrollOffset.interpolate({
                inputRange: [0, 180],
                outputRange: [0, 50],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        {available ? (
          <>
            <ButtonConfirmation
              onPress={() => {
                if (status.daily && !status.confirmation) {
                  Alert.alert(
                    'Atenção',
                    `O seu pacote não inclui este dia da partida, caso queira continuar, uma diária será contratada!`,
                    [
                      {
                        text: 'CANCELAR',
                        style: 'cancel',
                        onPress: () => { },
                      },
                      {
                        text: 'CONFIRMAR',
                        onPress: handleConfimation,
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  handleConfimation();
                }
              }}
              disabled={loadingConfirmation && !available}
            >
              {loadingConfirmation ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                  <>
                    <FAIcon
                      color={!status.confirmation ? '#00c800' : '#f00'}
                      size={25}
                      name={status.confirmation ? 'minus-circle' : 'check-circle'}
                      style={{ padding: 0, margin: 0 }}
                    />
                    <ButtonName>
                      {status.confirmation ? 'To fora' : 'To dentro'}
                    </ButtonName>
                  </>
                )}
            </ButtonConfirmation>
            {numberMensalists <= pakito_crash && (
              <>
                <Divider />
                <ButtonGuest onPress={() => setModal(true)}>
                  <FAIcon color="#fff" size={22} name="user-plus" />
                </ButtonGuest>
              </>
            )}
          </>
        ) : (
            <ButtonConfirmation>
              <FAIcon
                color={status.confirmation ? '#00c800' : '#f00'}
                size={25}
                name={!status.confirmation ? 'minus-circle' : 'check-circle'}
                style={{ padding: 0, margin: 0 }}
              />
              <ButtonName>Finalizada</ButtonName>
            </ButtonConfirmation>
          )}
      </Buttons>
      <ModalGuest
        idMatche={idMatche}
        cb={addNewGuest}
        onClose={setModal}
        modal={modal}
        idUser={status.idUser}
      />
    </>
  );
}

Detail.navigationOptions = ({ navigation }) => {
  const { date_full, locale, available } = navigation.getParam('matche');

  return {
    headerTitleAlign: 'left',
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: colors.secundary,
      height: 80,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#fff',
    },
    headerBackTitleStyle: {
      color: colors.primary,
    },
    headerTintColor: colors.primary,
    headerRight: () =>
      available && (
        <TouchableOpacity
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <FAIcon
            style={{ marginRight: 15 }}
            onPress={() => {
              navigation.state.params.share();
            }}
            name="share-alt"
            color={colors.primary}
            size={22}
          />
        </TouchableOpacity>
      ),
    headerTitle: () => (
      <Header>
        <HeaderTitle>{locale}</HeaderTitle>
        <HeaderSubTitle>{date_full}</HeaderSubTitle>
      </Header>
    ),
  };
};
