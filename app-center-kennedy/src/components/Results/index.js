import React, {useState, useEffect} from 'react';
import CardProduct from '~/components/CardProduct';
import {FlatList, ActivityIndicator} from 'react-native';
import {Container} from './styles';
import {colors} from '~/styles';
import HeaderOptions from '../HeaderOptions';

export default function Results() {
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
        border={true}
      />
    );
  }

  return (
    <Container>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <>
          <HeaderOptions />
          <FlatList
            data={results}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{
              marginHorizontal: 8,
              justifyContent: 'space-around',
            }}
          />
        </>
      )}
    </Container>
  );
}

Results.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('name'),
  headerRight: null,
});
