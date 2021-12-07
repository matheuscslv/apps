import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import CardProduct from '~/components/CardProduct';

import {Content, Title} from './styles';

export default function ViewHorizontal() {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getResults() {
      setResults([
        {
          id: 1,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 2,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 3,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 4,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 5,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 6,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    getResults();
  }, []);

  function renderItem({item}) {
    return (
      <CardProduct
        name={item.name}
        price={item.price}
        parcelas={item.parcelas}
        valor_parcela={item.valor_parcela}
      />
    );
  }

  return (
    <Content>
      <Title>Aproveite e adicione ao seu carrinho</Title>
      <FlatList
        horizontal
        data={results}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        style={{
          marginHorizontal: 5,
        }}
      />
    </Content>
  );
}
