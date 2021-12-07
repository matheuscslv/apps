import React, { memo } from 'react';
import { withNavigation } from 'react-navigation';

import PropTypes from 'prop-types';

import ball from '~/assets/ball.png';

import {
  Container,
  InfoMatche,
  IconBall,
  Title,
  DateMatche,
  WeekDay,
  Button,
  ButtonText,
} from './styles';

function CardMatche({ matche, navigation }) {
  return (
    <Container>
      <InfoMatche>
        <IconBall source={ball} />
        <Title>{matche.locale}</Title>
        <DateMatche>{matche.date_full}</DateMatche>
        <WeekDay>{matche.week}</WeekDay>
      </InfoMatche>
      <Button onPress={() => navigation.navigate('Detail', { matche })}>
        <ButtonText>Ver Detalhes</ButtonText>
      </Button>
    </Container>
  );
}

export default memo(withNavigation(CardMatche));

CardMatche.propTypes = {
  matche: PropTypes.shape({
    locale: PropTypes.string,
    date_full: PropTypes.string,
    week: PropTypes.string,
  }).isRequired,
};
