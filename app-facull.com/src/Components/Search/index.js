import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, InputSearch, ButtonClear } from './styles';
import { colors } from '~/styles';

export default function Search({ placeholder, filter }) {
  const [textSearch, setTextSearch] = useState('');
  function setValue(text) {
    if (text.length < 40) {
      setTextSearch(text);
      filter(text);
    }
  }
  return (
    <Container>
      <InputSearch
        placeholder={placeholder}
        value={textSearch}
        onChangeText={text => setValue(text)}
      />
      {textSearch.length > 0 && (
        <ButtonClear
          onPress={() => {
            filter('');
            setTextSearch('');
          }}
        >
          <Icon name="close" color={colors.secundary} size={22} />
        </ButtonClear>
      )}
    </Container>
  );
}
