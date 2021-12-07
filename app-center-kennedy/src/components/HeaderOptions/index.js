import React, {useState} from 'react';
import {View} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
  ContentModal,
} from 'react-native-simple-radio-button';
import {Container, Option, OptionName, Separator} from './styles';
import {colors} from '~/styles';

export default function HeaderOptions() {
  const [checked, setChecked] = useState('');
  const [ordenacaoModal, setOrdenacaoModal] = useState(false);

  return (
    <>
      <Container>
        <Option>
          <OptionName> Ordenação </OptionName>
        </Option>
        <Separator />
        <Option>
          <OptionName> Filtros </OptionName>
        </Option>
      </Container>

      {/*  <RadioForm
          radio_props={[
            {label: 'Mais venddidos', value: 0},
            {label: 'Lançamentos', value: 1},
            {label: 'Maior Preço', value: 3},
            {label: 'Menor Preço', value: 4},
            {label: 'Relevância', value: 5},
            {label: 'Mais bem avaliados', value: 6},
          ]}
          animation={false}
          initial={0}
          buttonColor="#999"
          selectedButtonColor={colors.primary}
          onPress={value => {
            console.log(value);
          }}
        /> */}
    </>
  );
}
