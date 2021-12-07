import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';

import { useConversations } from '@hooks/conversations';

import { Container, Title, Tooltip } from './styles';

interface IPropsLabelTopBar extends ViewProps {
  isFocused: boolean;
}

const Attendances: React.FC<IPropsLabelTopBar> = ({ isFocused, ...rest }) => {
  const { conversations } = useConversations();

  const numberUsersInAttendance = useMemo(
    () =>
      conversations.reduce((total: number, chat) => {
        if (chat.status !== 'FINISHED') return total + 1;
        return total;
      }, 0),
    [conversations],
  );

  return (
    <Container {...rest}>
      <Title isFocused={isFocused}>Atendimentos</Title>
      {numberUsersInAttendance > 0 && (
        <Tooltip color="success">{numberUsersInAttendance}</Tooltip>
      )}
    </Container>
  );
};

export default Attendances;
