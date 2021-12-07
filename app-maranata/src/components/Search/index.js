import React, { useState } from 'react';
import { Container, InputSearch, ButtonClear, Icon } from './styles';

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
        onChangeText={(text) => setValue(text)}
      />
      {textSearch.length > 0 && (
        <ButtonClear
          onPress={() => {
            filter('');
            setTextSearch('');
          }}
        >
          <Icon name="close" size={22} />
        </ButtonClear>
      )}
    </Container>
  );
}
