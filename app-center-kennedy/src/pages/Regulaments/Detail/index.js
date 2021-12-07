import React from 'react';
import {View} from 'react-native';

import {Container, Title, SubTitle, Topic, TextArea} from './styles';
import {HeaderTitle} from 'react-navigation-stack';

export default function Detail() {
  return (
    <Container>
      <Title>Frete</Title>
      <SubTitle>Entenda como funciona</SubTitle>
      <Topic>
        Com o app Center Knnedy, você pode bla bla bla bla bla bla bla
      </Topic>

      <TextArea>
        Com o app Center Knnedy, você pode bla bla bla bla bla bla bla sdas dsad
        sad asfd safasfasf af af af safaf asf af asf af af a fa fa f af af a fa
        fa faf gjkahgksj kea kfkgfskf fpieoewut hwetbwkfweiut wNKFD
        OIEUROWRGWDSMNL SDFSSFJBSLD!
      </TextArea>
    </Container>
  );
}

Detail.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('title'),
});
