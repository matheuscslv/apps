import React, {useState} from 'react';
import {View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {Price as PriceGreen} from '../styles';
import {
  CardProductCart,
  Content,
  Image,
  Title,
  Detail,
  Icone,
  DetailText,
  Bold,
  Footer,
  AmountContainer,
  AmountText,
  Amount,
  ButtonAmount,
  Counter,
  Price,
  Session,
  Label,
  Span,
} from './styles';
import {colors} from '~/styles';
import {withNavigation} from 'react-navigation';

function CardProduct({navigation}) {
  return (
    <CardProductCart onPress={() => navigation.navigate('DetailProduct')}>
      <Content>
        <Image
          resizeMode="contain"
          source={{
            uri:
              'https://novomundo.vteximg.com.br/arquivos/ids/1074307-500-500/geladeira-refrigerador-brastemp-duplex-frost-free-462l-branco-brm56ab-220v-50277-0.jpg?v=636426541447630000',
          }}
        />
        <View
          style={{
            justifyContent: 'space-between',
            marginLeft: 10,
          }}>
          <Title>
            Geladeira blablabla as dasda sdasd as da s d a s d asdasd asdsdsdsd
          </Title>
          <View>
            {/* <Detail>
              <Icone name="store" color={colors.primary} size={15} />
              <DetailText>
                Vendido e entregue por
                <Bold>center kennedy sssss ss s s s s s</Bold>
              </DetailText>
            </Detail> */}
            <Detail>
              <Icone name="dropbox" color={colors.primary} size={15} />
              <DetailText>Retirar na loja</DetailText>
            </Detail>
            <Detail>
              <Icone name="truck-fast" color={colors.primary} size={15} />
              <DetailText>Entrega em até 6 dias úteis</DetailText>
            </Detail>
          </View>
        </View>
      </Content>
      <Footer>
        <AmountContainer>
          <AmountText>Quantidade:</AmountText>
          <Amount>
            <ButtonAmount>
              <Icone name="minus" color="#999" size={30} />
            </ButtonAmount>
            <Counter>1</Counter>
            <ButtonAmount>
              <Icone name="plus" color="#999" size={30} />
            </ButtonAmount>
          </Amount>
        </AmountContainer>
        <Price>R$ 2.999.99 </Price>
      </Footer>

      {[1, 2].map(i => (
        <Session key={i} onPress={() => navigation.navigate('Warranty')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              checkBoxColor={colors.primary}
              onClick={() => {}}
              isChecked={true}
            />
            <View style={{marginLeft: 15}}>
              <Label>Adicionar grantia extendida</Label>
              <Span>A partir de R$ 131,85</Span>
            </View>
          </View>
          <PriceGreen>R$ 181,90 </PriceGreen>
        </Session>
      ))}
    </CardProductCart>
  );
}

export default withNavigation(CardProduct);
