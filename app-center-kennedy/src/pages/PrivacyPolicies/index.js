import React from 'react';
import {View} from 'react-native';
import RegulamentDetail from '~/pages/Regulaments/Detail';
import {Container} from './styles';

export default function PrivacyPolicies() {
  return (
    <Container>
      <RegulamentDetail />
      <RegulamentDetail />
      <RegulamentDetail />
      <RegulamentDetail />
    </Container>
  );
}

PrivacyPolicies.navigationOptions = {
  headerTitle: 'Políticas de privacidade',
};
