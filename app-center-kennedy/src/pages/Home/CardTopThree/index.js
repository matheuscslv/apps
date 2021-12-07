import React from 'react';
import {View} from 'react-native';
import {withNavigation} from 'react-navigation';

import {
  Container,
  ViewImage,
  Content,
  TitleCard,
  IndexText,
  Card,
  ImageProduct,
  ContentPrice,
  TitleProduct,
  Price1,
  PriceSmall,
  Price2,
  Favorite,
} from './styles';

function CardTopThree({title, data, navigation}) {
  return (
    <Container>
      <View>
        <TitleCard>{title}</TitleCard>
        {data.map((p, index) => (
          <Card
            key={p.id}
            onPress={() => {
              navigation.navigate('DetailProduct');
            }}>
            <ViewImage>
              <IndexText>{index + 1}</IndexText>
              <ImageProduct
                source={{
                  uri:
                    'https://novomundo.vteximg.com.br/arquivos/ids/1074307-500-500/geladeira-refrigerador-brastemp-duplex-frost-free-462l-branco-brm56ab-220v-50277-0.jpg?v=636426541447630000',
                }}
              />
            </ViewImage>
            <Content>
              <TitleProduct numberOfLines={1}>
                {p.name} da dasd asd adas dasd asd sadsa dasd as dasd asd asda d
              </TitleProduct>
              <ContentPrice>
                <View>
                  <Price1>
                    R$ {p.price} <PriceSmall>à vista</PriceSmall>
                  </Price1>
                  <Price2>
                    {p.parcelas}x de R$ {p.valor_parcela}
                  </Price2>
                </View>
                <Favorite size={23} />
              </ContentPrice>
            </Content>
          </Card>
        ))}
      </View>
    </Container>
  );
}

export default withNavigation(CardTopThree);
