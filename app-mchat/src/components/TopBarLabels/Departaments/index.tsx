import React from 'react';
import { ViewProps } from 'react-native';

import { Container, Title, Tooltip } from './styles';

interface IPropsLabelTopBar extends ViewProps {
  isFocused: boolean;
}

const Departaments: React.FC<IPropsLabelTopBar> = ({ isFocused, ...rest }) => {
  return (
    <Container {...rest}>
      <Title isFocused={isFocused}>Departamentos</Title>
      <Tooltip color="danger">4</Tooltip>
    </Container>
  );
};

export default Departaments;
