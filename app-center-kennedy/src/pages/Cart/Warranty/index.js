import React from 'react';
import {View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {
  Container,
  Content,
  Price,
  Label,
  Session,
  Title,
  Info,
  Options,
  Item,
  Span,
} from './styles';
import {colors} from '~/styles';

export default function Warranty({navigation}) {
  return (
    <Container>
      <Content>
        <Session onPress={() => {}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              checkBoxColor={colors.primary}
              onClick={() => {}}
              isChecked={true}
            />
            <View style={{marginLeft: 15}}>
              <Label>Adicionar grantia extendida</Label>
            </View>
          </View>
          <Price>R$ 181,90 </Price>
        </Session>
      </Content>
      <Content>
        <Title>Motivos para adquirir a Garantia Estendida: </Title>
        <Info>Motivos para adquirir a Garantia Estendida1 </Info>
        <Info>Motivos para adquirir a Garantia Estendida2 </Info>
        <Info>Motivos para adquirir a Garantia Estendida2 </Info>
        <Info>Motivos para adquirir a Garantia Estendida2 </Info>
      </Content>
      <Options>
        <Item
          onPress={() =>
            navigation.navigate('RegulamentDetail', {
              title: 'Condições de seguro',
            })
          }>
          <Label>Condições de seguro</Label>
        </Item>
        <Item
          onPress={() =>
            navigation.navigate('RegulamentDetail', {
              title: 'Formas de pagamento',
            })
          }>
          <Label>Formas de pagamento</Label>
        </Item>
      </Options>

      <Span>
        O selecionar uma opção, aceito as condições e formas de pagamento.
      </Span>
    </Container>
  );
}

Warranty.navigationOptions = {
  headerTitle: 'Garantia Estendida',
};
