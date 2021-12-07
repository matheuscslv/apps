import React, { useMemo } from 'react';
import { ViewProps } from 'react-native';

import { useConversations } from '@hooks/conversations';

import { Container, Icon, Tooltip } from './styles';

interface IPropsLabelTopBar extends ViewProps {
  icon: string;
  color: string;
}

const InHold: React.FC<IPropsLabelTopBar> = ({ icon, color, ...rest }) => {
  const { conversations } = useConversations();

  const numberUsersInHold = useMemo(
    () =>
      conversations.reduce((total: number, chat) => {
        if (chat.status === 'InHOLD') return total + 1;
        return total;
      }, 0),
    [conversations],
  );

  return (
    <Container {...rest}>
      <Icon name={icon} color={color} />
      {numberUsersInHold > 0 && (
        <Tooltip color="success">{numberUsersInHold}</Tooltip>
      )}
    </Container>
  );
};

export default InHold;
