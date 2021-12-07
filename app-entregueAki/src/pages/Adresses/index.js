import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { colors } from '~/styles';

import { Container, Text, Card, ButtonNew } from './styles';
import api from '~/services/api';

export default function Adresses({ navigation }) {

  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    api.get('/enderecos').then(({ data }) => {
      setAddresses(data);
      setLoading(false);
    });
  }, []);

  return <>
    {loading ?
      (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <Container>
          {addresses.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                transform={'none'} font={"Quicksand-Regular"} color={"#333"}
                style={{
                  fontSize: 14,
                  padding: 40,
                  textAlign: 'center',
                  lineHeight: 28,
                }}
              >
                Por enquanto você não tem endereços cadastrados!
           </Text>
            </View>
          ) : (
              <FlatList
                onRefresh={() => {
                  setRefresh(true)
                  api.get('/enderecos').then(({ data }) => {
                    setAddresses(data);
                    setRefresh(false);
                  });
                }}
                refreshing={refresh}
                data={addresses}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => (
                  <Card onPress={() => navigation.navigate("DetailAddress", { address: item })}>
                    <Text transform={'none'} font={"Quicksand-Bold"} color={colors.dark}>{item.descricao}</Text>
                    <Text transform={'none'} font={"Quicksand-Regular"} color={colors.regular}>{item.logradouro}, {item.numero} - {item.bairro}</Text>
                    <Text transform={'none'} font={"Quicksand-Regular"} color={colors.regular}>{item.cidade} - {item.estado}, {item.cep}</Text>
                    {item.complemento && <Text transform={'none'} font={"Quicksand-Regular"} color={colors.regular}>{item.complemento}</Text>}
                  </Card>
                )}
                ListEmptyComponent={
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      transform={'none'} font={"Quicksand-Regular"} color={"#333"}
                      style={{
                        fontSize: 14,
                        padding: 40,
                        textAlign: 'center',
                        lineHeight: 28,
                      }}
                    >
                      Por enquanto você não tem endereços cadastrados!
              </Text>
                  </View>
                }
              />
            )}

          <ButtonNew onPress={() => navigation.navigate("NewAddress")}>
            <Text transform={'uppercase'} font={"Quicksand-Bold"} color={colors.success}>Novo Endereço</Text>
          </ButtonNew>

        </Container>
      )}
  </>
}
