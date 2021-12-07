import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import CardMatche from '~/components/CardMatche';
import Empty from '~/components/Empty';
import Loading from '~/components/Loading';

import { Container } from './styles';

export default function MyMatches() {
  const me = useSelector(state => state.matche.me);
  const loading = useSelector(state => state.matche.loading);


  if (me.length === 0 && !loading)
    return <Empty title="Você não tem histórico de partidas!" />;

  return (
    loading ? (
      <Loading style={{ width: 70, height: 70 }} />
    ) : (<Container>
      {me.map(matche => (
        <CardMatche key={matche.id} matche={matche} />
      ))}
    </Container>)
  );
}
