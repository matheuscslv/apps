import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardMatche from '~/components/CardMatche';
import Empty from '~/components/Empty';
import Loading from '~/components/Loading';
import { subscribeToNotification } from '~/services/notification';
import { ConstantsTypes } from '~/store/ducks/constants';
import { MatcheTypes } from '~/store/ducks/matche';
import { UserTypes } from '~/store/ducks/user';

import { Container } from './styles';

export default function Current({ navigation: { setParams } }) {
  const dispatch = useDispatch();
  const current = useSelector(state => state.matche.current);
  const loading = useSelector(state => state.matche.loading);

  function refresh() {
    dispatch({
      type: MatcheTypes.GET_MATCHE_REQUEST,
    });
  }

  useEffect(() => {
    setParams({
      refresh: () => refresh(),
    });
    dispatch({
      type: MatcheTypes.GET_MATCHE_REQUEST,
    });
    dispatch({
      type: ConstantsTypes.GET_CONSTANTS,
    });
    dispatch({
      type: UserTypes.HANDLE_REFRESH_USER_REQUEST,
    });

    subscribeToNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (current.length === 0 && !loading) return <Empty />;

  return (
    loading ? (
      <Loading style={{ width: 70, height: 70 }} />
    ) : (<Container>
      {current.map(matche => (
        <CardMatche key={matche.id} matche={matche} />
      ))}
    </Container>)
  );
}
