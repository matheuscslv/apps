import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import ContainerModalCep from './ModalCep';

import {
  Container,
  ContentTotal,
  ContentItem,
  Title,
  Price,
  ContentFrete,
  FreteTitle,
  FreteCep,
  IconEdit,
  Buttons,
  Button,
  ButtonText,
} from './styles';
import CardProduct from './CardProduct';
import ViewHorizontal from '~/components/ViewHorizontal';

export default function Cart({navigation}) {
  const [modalCep, setModalCep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorFrete, setErrorFrete] = useState(false);
  const [frete, setFrete] = useState(false);
  const [cep, setCep] = useState('');

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f6f6f6'}}>
      <Container>
        <CardProduct />
        <CardProduct />
        <ContentTotal>
          {/* <ContentItem>
            <ContentFrete>
              <View>
                <FreteTitle>Frete</FreteTitle>
                <FreteCep>{cep ? cep : ' -'}</FreteCep>
              </View>
               <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setModalCep(true)}>
                <IconEdit name="pencil" size={22} color="#999" />
              </TouchableOpacity>
            </ContentFrete>
            <Price>R$ {frete ? frete : '-'}</Price>
          </ContentItem> */}
          <ContentItem>
            <Title>Total:</Title>
            <Price>R$ 2.401.92</Price>
          </ContentItem>
        </ContentTotal>
      </Container>
      <Buttons>
        <Button onPress={() => {}}>
          <ButtonText> CONTINUAR </ButtonText>
        </Button>
        <Button
          style={{marginTop: 10}}
          background="#FFF"
          onPress={() => navigation.navigate('Inicio')}>
          <ButtonText color> COMPRAR MAIS PRODUTOS </ButtonText>
        </Button>
      </Buttons>
      <ViewHorizontal />

      <Modal transparent animationType="fade" visible={modalCep}>
        <ContainerModalCep
          cep={cep}
          setFrete={setFrete}
          setCep={setCep}
          setErrorFrete={setErrorFrete}
          errorFrete={errorFrete}
          setModalCep={setModalCep}
        />
      </Modal>
    </ScrollView>
  );
}
