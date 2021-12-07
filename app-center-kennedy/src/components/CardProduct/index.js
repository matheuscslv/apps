import React from 'react';
import {View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {
  Container,
  ImageProduct,
  TitleProduct,
  Footer,
  ContentPrice,
  Price1,
  Price2,
  PriceSmall,
  Favorite,
} from './styles';

function CardProduct({
  name,
  price,
  parcelas,
  valor_parcela,
  navigation,
  ...rest
}) {
  return (
    <Container onPress={() => navigation.navigate('DetailProduct')} {...rest}>
      <ImageProduct
        source={{
          uri:
            'https://novomundo.vteximg.com.br/arquivos/ids/1074307-500-500/geladeira-refrigerador-brastemp-duplex-frost-free-462l-branco-brm56ab-220v-50277-0.jpg?v=636426541447630000',
        }}
      />
      <TitleProduct>{name}</TitleProduct>
      <Footer>
        <ContentPrice>
          <Price1>
            R$ {price} <PriceSmall>à vista</PriceSmall>
          </Price1>
          <Price2>
            {parcelas}x de R$ {valor_parcela}
          </Price2>
        </ContentPrice>
        <Favorite size={22} />
      </Footer>
    </Container>
  );
}

export default withNavigation(CardProduct);
