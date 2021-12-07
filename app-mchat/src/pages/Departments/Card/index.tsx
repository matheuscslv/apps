import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Container, Title, Icon, Tooltip } from './styles';

const Card: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate('ConversationsDepartment')}>
      <Title>Departamento</Title>
      <Tooltip color="danger">1</Tooltip>
      <Icon />
    </Container>
  );
};

export default Card;
