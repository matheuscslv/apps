import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import Card from '../Card';

import { colors } from '~/styles';

export default function Product({ refreshing, loadMore, getEmpresa, empresa, close, produtos }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(produtos);

  return (
    <>
      {produtos.length == 0 ?
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              padding: 40,
              textAlign: 'center',
              color: '#333',
              fontFamily: "Quicksand-Regular",
              lineHeight: 28,
            }}
          >Não há produtos cadastrados neste estabelecimento!</Text>
        </View>
        :
        <FlatList
          style={{ marginTop: 5, marginBottom: 5 }}
          onEndReached={loadMore}
          data={products}
          onRefresh={getEmpresa}
          refreshing={refreshing}
          renderItem={({ index, item }) => (<Card empresa={empresa} close={close} item={item} />)}
          keyExtractor={item => item.id}
          ListFooterComponentStyle={{ marginBottom: 20 }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  padding: 40,
                  textAlign: 'center',
                  color: '#333',
                  fontFamily: "Quicksand-Regular",
                  lineHeight: 28,
                }}
              >Não há produtos cadastrados neste estabelecimento!</Text>
            </View>
          }
        />
      }
    </>
  );
}
