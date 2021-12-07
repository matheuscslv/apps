import React from 'react';
import {ScrollView} from 'react-native';

import {
  Container,
  Title,
  InfoView,
  Name,
  ContentButtons,
  Button,
  ButtonText,
} from './styles';

export default function Informations() {
  return (
    <>
      <Container>
        <ScrollView>
          <Title>Apresentação do produto</Title>
          <InfoView>
            <Name>
              adasdsadsadasdsadasdadjasdjadjhagjdgagdgadhgagsagdsahgdhagdhgahdgasjgdshagdagjdhga
            </Name>
          </InfoView>
          <Title>Informações técnicas</Title>
          <InfoView>
            <Name>Marca</Name>
            <Name>Esmaltec</Name>
          </InfoView>
          <InfoView>
            <Name>Referência</Name>
            <Name>Esmaltec</Name>
          </InfoView>
          <InfoView>
            <Name>Modelo</Name>
            <Name>Esmaltec</Name>
          </InfoView>
          <Title>Tipo de degelo</Title>
          <InfoView>
            <Name>Frost free</Name>
          </InfoView>

          <Title>Tipo de porta</Title>
          <InfoView>
            <Name>Dulex</Name>
          </InfoView>
          <Title>Cor</Title>
          <InfoView>
            <Name>Branco</Name>
          </InfoView>

          <Title>Apresentação do produto</Title>
          <InfoView>
            <Name>
              adasdsadsadasdsadasdadjasdjadjhagjdgagdgadhgagsagdsahgdhagdhgahdgasjgdshagdagjdhga
            </Name>
          </InfoView>
          <Title>Informações técnicas</Title>
          <InfoView>
            <Name>Marca</Name>
            <Name>Esmaltec</Name>
          </InfoView>
          <InfoView>
            <Name>Referência</Name>
            <Name>Esmaltec</Name>
          </InfoView>
          <InfoView>
            <Name>Modelo</Name>
            <Name>Esmaltec</Name>
          </InfoView>
          <Title>Tipo de degelo</Title>
          <InfoView>
            <Name>Frost free</Name>
          </InfoView>

          <Title>Tipo de porta</Title>
          <InfoView>
            <Name>Dulex</Name>
          </InfoView>
          <Title>Cor</Title>
          <InfoView>
            <Name>Branco</Name>
          </InfoView>
        </ScrollView>
      </Container>
      <ContentButtons>
        <Button background="#FFF">
          <ButtonText color> ADICIONAR AO CARRINHO </ButtonText>
        </Button>
        <Button>
          <ButtonText> COMPRAR AGORA </ButtonText>
        </Button>
      </ContentButtons>
    </>
  );
}
