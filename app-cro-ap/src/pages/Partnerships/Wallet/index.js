import React, { useEffect } from 'react';
import Orientation from 'react-native-orientation-locker';
// import carteirinha from '~/assets/CartaoExample.png';
import carteirinha from '~/assets/templateCartao.png';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
 CardImage, InfoUser, DataUser, Card, Container 
} from './styles';

// import Card from '~/components/Card';

export default function Wallet() {
  const profissional = useSelector(state => state.user.data.id_profissional);
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      // Orientation.unlockAllOrientations();
    };
  });
  return (
    <Container>
      <CardImage
        source={carteirinha}
        style={{
          transform: [{ rotate: '90deg' }],
        }}
        resizeMode="contain"
      >
        <InfoUser>
          <DataUser bold size={18}>
            {profissional.nome}
          </DataUser>
          <DataUser>{profissional.tipo ? profissional.tipo : 'Não cadastrado'}</DataUser>
          <DataUser bold size={18}>
            {profissional.cro}
          </DataUser>
          <DataUser>Válido até {profissional.validade ? moment(profissional.validade).format('DD/MM/YYYY') : '-'}</DataUser>
        </InfoUser>
      </CardImage>
    </Container>
  );
}
/* <Container>
      <Card
        resizeMode="contain"
        style={{
          transform: [{ rotate: '90deg' }],
        }}
        source={carteirinha}
      />
    </Container> */
