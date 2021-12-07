import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';
import {Container, Title, SubTitle, Content, Number} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '~/styles';

export default function ContactUs() {
  const phoneNumber = '0800 333 3333';
  return (
    <Container>
      <Title>Se ainda tiver dúvidas, contate-nos!</Title>
      <SubTitle>Atendimento apenas em horarios comerciais</SubTitle>
      <Content>
        <Number>{phoneNumber}</Number>
        <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
          <Icon name="phone" color={colors.primary} size={25} />
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

ContactUs.navigationOptions = {
  headerTitle: 'Fale conosco',
};
