import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, FlatList } from 'react-native';

import { Container, Card, UpIcon, DownIcon } from './styles';
import { colors } from '~/styles';

import Product from '../Card';
import api from '~/services/api';

import { withNavigation } from 'react-navigation'

function Section({ navigation, refreshing, loadMore, getEmpresa, empresa, close, secoes }) {
  const [open, setOpen] = useState(false);
  const [box, setBoxes] = useState(false);
  const [loading, setLoading] = useState(true);

  //const [products, setProducts] = useState([]);
  //const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    let aux = secoes.map(item => ({ ...item, open: false }))
    setBoxes(aux);
    setLoading(false);
  }, [])

  /* function getProducts(id) {
    setRefresh(true);
    api.get(`/produtos/secao/${id}`).then(({ data }) => {
      setProducts(data.data)
      setRefresh(false);
    });
  } */

  return (
    <>
      {loading ?
        (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <>
            {
              box.length == 0
                ?
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
                  >Não há seções cadastradas neste estabelecimento!</Text>
                </View>
                :
                <Container>
                  <FlatList
                    onEndReached={loadMore}
                    data={box}
                    onRefresh={getEmpresa}
                    refreshing={refreshing}
                    renderItem={({ index, item }) => (
                      <Card>
                        <TouchableOpacity onPress={() => {
                          let aux = box.map(box => box.id == item.id ? { ...box, open: !box.open } : box)
                          setBoxes(aux)
                          /* if (!item.open) {
                            getProducts(item.id)
                          } else {
                            setProducts([])
                          } */
                          navigation.navigate("Products", { section: item.id, empresa: empresa, close: close });
                        }}>
                          <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Quicksand-Bold', color: colors.dark }}>{item.secao}</Text>
                            {item.open ? <DownIcon name="ios-arrow-forward" color={colors.dark} size={20} /> : <UpIcon color={colors.dark} name="ios-arrow-forward" size={20} />}
                          </View>
                        </TouchableOpacity>
                        {/* {item.open &&
                          refresh ?
                          <View style={{ marginTop: 10 }}>
                            <View
                              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            >
                              <ActivityIndicator size="small" color={colors.primary} />
                            </View>
                          </View>
                          :
                          products.map(item2 => (
                            <Product item={item2} />
                          ))
                        } */}
                      </Card>
                    )}
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
                        >Não há seções cadastradas neste estabelecimento!</Text>
                      </View>
                    }
                  />
                </Container>
            }
          </>
        )}
    </>
  );
}

export default withNavigation(Section)
