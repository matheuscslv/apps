import React from 'react';

import Card from './Card';
import { Container } from './styles';

const Departments: React.FC = () => {
  return (
    <Container>
      <Card />
      <Card />
      <Card />
      <Card />
    </Container>
  );
};

export default Departments;
