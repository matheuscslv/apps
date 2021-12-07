import React, { memo, useMemo } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

import api from '~/services/api';
import { colors } from '~/styles';

import {
  Container,
  InfoPlayer,
  Avatar,
  Data,
  Name,
  Position,
  Package,
  Status,
  Actions,
  ButtonRemoveGuest,
} from './styles';

function CardPlayer({ user, idUser, removeGuest, loading, available = false }) {
  const isMyGuest = useMemo(() => {
    return idUser === user?.guest;
  }, [idUser, user]);

  return (
    <Container>
      <InfoPlayer>
        <Avatar source={{ uri: user?.url, cache: 'force-cache' }} />
        <Data>
          <Name>{user?.name}</Name>
          <Position>{user?.position?.name || user?.position}</Position>
          <Package>{user?.package_name}</Package>
        </Data>
      </InfoPlayer>
      <Actions>
        {isMyGuest && available && (
          <ButtonRemoveGuest onPress={() => removeGuest(user)}>
            {!loading ? (
              <FAIcon color={colors.danger} size={25} name="user-minus" />
            ) : (
                <ActivityIndicator color={colors.danger} size="small" />
              )}
          </ButtonRemoveGuest>
        )}
        <Status color={user?.confirmation} />
      </Actions>
    </Container>
  );
}

export default memo(CardPlayer);
