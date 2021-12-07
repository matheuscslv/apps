import React, { useState, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';

import Button from '~/components/Button';
import api from '~/services/api';
import { UserTypes } from '~/store/ducks/user';

import {
  Container,
  Content,
  Header,
  HeaderTitle,
  IconClose,
  Title,
  PackagesContent,
  PackagesContentLine,
  ItemPackage,
  PackageName,
  Divider,
  Subtitle,
  Bold,
} from './styles';

export default function ModalChangePackage({ closeModal, onClose }) {
  const dispatch = useDispatch();
  const weekdays = useSelector(state => state.constants.soccer_days);
  const user_id = useSelector(state => state.user.data.id);
  const [loading, setLoading] = useState(false);
  const [packages, setPackages] = useState([]);
  const [soccerDays, setSoccerDays] = useState([]);
  const [packageSelected, selectPackage] = useState({
    pkg: 4,
    num_days: 0,
  });
  const [daysSelected, selectDays] = useState([]);

  useEffect(() => {
    api.get('/packages').then(({ data }) => {
      let arrayTemp = [];
      const packageItems = [];
      const soocerDaysItems = [];
      data.forEach((item, index) => {
        if (index % 2 === 0) {
          arrayTemp.push(item);
        } else {
          arrayTemp.push(item);
          packageItems.push(arrayTemp);
          arrayTemp = [];
        }
      });

      if (arrayTemp.length > 0) {
        packageItems.push(arrayTemp);
        arrayTemp = [];
      }
      setPackages(packageItems);

      weekdays.forEach((item, index) => {
        if (index % 2 === 0) {
          arrayTemp.push(item);
        } else {
          arrayTemp.push(item);
          soocerDaysItems.push(arrayTemp);
          arrayTemp = [];
        }
      });

      if (arrayTemp.length > 0) {
        soocerDaysItems.push(arrayTemp);
        arrayTemp = [];
      }

      setSoccerDays(soocerDaysItems);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelectPackage(packageItem) {
    const { id, days } = packageItem;
    if (id === 3) {
      const listDays = weekdays.map(({ id: dayWeek }) => dayWeek);

      selectPackage({
        pkg: id,
        num_days: days,
      });
      selectDays(Immutable.asMutable(listDays));
    } else {
      selectPackage({ pkg: id, num_days: days });
      selectDays([]);
    }
  }

  function handleSelectDays(day) {
    const { num_days, pkg } = packageSelected;

    if (pkg === 3) return;

    const listDays = daysSelected;

    const indexElement = listDays.indexOf(day);

    if (indexElement >= 0) {
      listDays.splice(indexElement, 1);
    } else if (listDays.length < num_days) {
      listDays.push(day);
    } else {
      listDays.shift();
      listDays.push(day);
    }

    selectDays([...listDays]);
  }

  async function handleChangePackage() {
    const { pkg, num_days } = packageSelected;

    if (daysSelected.length !== num_days) {
      Alert.alert('Atenção', 'Selecione os dias corretamente!');
      return;
    }
    setLoading(true);
    Alert.alert(
      'Atenção',
      'Deseja mesmo solicitar a alteração de seu pacote?',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            setLoading(false);
          },
          style: 'cancel',
        },
        {
          text: 'CONFIRMAR',
          onPress: () => {
            dispatch({
              type: UserTypes.CHANGE_PACKAGE_REQUEST,
              data: {
                dates: daysSelected.join(','),
                package_id: pkg,
                user_id,
              },
              onClose: () => {
                setLoading(false);
                onClose();
              },
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  const renderListPackages = useMemo(() => {
    return packages?.map(pkg => (
      <PackagesContentLine key={`key-${pkg[0].id}`}>
        {pkg?.map(pkgItem => (
          <ItemPackage
            key={pkgItem.id}
            selected={pkgItem.id === packageSelected.pkg}
            onPress={() => handleSelectPackage(pkgItem)}
          >
            <PackageName selected={pkgItem.id === packageSelected.pkg}>
              {pkgItem.name}
            </PackageName>
          </ItemPackage>
        ))}
      </PackagesContentLine>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packages, packageSelected.pkg]);

  const renderListDays = useMemo(() => {
    const { num_days, pkg } = packageSelected;
    return (
      pkg !== 4 && (
        <>
          <Divider />
          <Title>Dias disponiveis</Title>
          {num_days ? (
            <Subtitle>
              <Bold>{num_days}x</Bold> na semana!
            </Subtitle>
          ) : (
            <Subtitle>Selecione um pacote</Subtitle>
          )}
          <PackagesContent>
            {soccerDays?.map(days => (
              <PackagesContentLine key={`key-${days[0].id}`}>
                {days?.map(({ id, day }) => (
                  <ItemPackage
                    key={id}
                    onPress={() => handleSelectDays(id)}
                    selected={daysSelected.includes(id)}
                  >
                    <PackageName selected={daysSelected.includes(id)}>
                      {day}
                    </PackageName>
                  </ItemPackage>
                ))}
              </PackagesContentLine>
            ))}
          </PackagesContent>
        </>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soccerDays, daysSelected]);

  return (
    <Container>
      <Content>
        <Header onPress={closeModal}>
          <HeaderTitle>ALTERAÇÃO DE PACOTE</HeaderTitle>
          <IconClose />
        </Header>
        <Title>Selecione</Title>
        <PackagesContent>{renderListPackages}</PackagesContent>
        {renderListDays}
        <Button
          title="alterar pacote"
          loading={loading}
          disabled={loading}
          onSubmit={handleChangePackage}
        />
      </Content>
    </Container>
  );
}

ModalChangePackage.propTypes = {
  onClose: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};
