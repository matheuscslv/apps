import React from 'react';
import { useSelector } from 'react-redux';

import CardMatche from '~/components/CardMatche';
import Empty from '~/components/Empty';
import Loading from '~/components/Loading';
import { Container } from './styles';

export default function Completed() {
  const completed = useSelector(state => state.matche.completed);
  const loading = useSelector(state => state.matche.loading);

  if (completed.length === 0 && !loading) return <Empty />;

  return (
    loading ? (
      <Loading style={{ width: 70, height: 70 }} />
    ) : 
    (<Container>
      {completed.map(matche => (
        <CardMatche key={matche.id} matche={matche} />
      ))}
      </Container>)
  );
}

