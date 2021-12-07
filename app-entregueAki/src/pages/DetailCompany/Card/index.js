import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';

import { Container, Title, Value, MinusIcon, PlusIcon, Price } from './styles';
import { colors } from '~/styles';

import { useSelector, useDispatch } from 'react-redux';
import { BagsTypes } from '~/store/ducks/bag';
//import { ProductsTypes } from '~/store/ducks/product';

import sem_imagem from '~/assets/sem_imagem.jpg';

import formatMoney from '~/Components/ConvertMoney';
import { addProductBag, removeProductBag } from '~/Components/Bag';

export default function Card({ empresa, close, item }) {
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.bags.data);
  const total = useSelector((state) => state.bags.total);

  const [product, setProduct] = useState(item);
  const products = useSelector((state) => state.products.data);
  /* const [product] = bag.filter(
    produto => produto.id == item.id
  ); */

  const [block, setBlock] = useState(false);

  useEffect(() => {
    console.log(item.estoque)
    console.log(item.venda_sem_estoque)

    // if venda_sem_estoque -> normal
    // if !venda_sem_estoque -> estoque - quantity >= 0 ? normal : bloqueio

    const product = bag.filter(
      produto => produto.id == item.id
    );
    if (product.length > 0) {
      setProduct(product[0]);

      if (item.venda_sem_estoque != 1) {
        if (item.estoque <= 0) {
          setBlock(true);
        } else if ((item.estoque - product[0].quantity) > 0) {
          setBlock(false);
        } else {
          setBlock(true);
        }
      }
    } else {
      setProduct(item);

      if (item.venda_sem_estoque != 1) {
        if (item.estoque <= 0) {
          setBlock(true);
        }
      }
    }
  }, [bag]);

  return (
    <Container>

      <View style={{ flex: 1, alignItems: "center", flexDirection: 'row' }}>

        {item.imagem == null ? (
          <Image
            source={sem_imagem}
            style={{
              width: 80,
              height: 80,
              borderRadius: 5,
              marginRight: 5,
            }}
            resizeMode="cover"
          />
        ) : (
            <Image
              source={{ uri: item.imagem }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 5,
                marginRight: 5,
              }}
              resizeMode="stretch"
            />
          )}

        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <Title>{product.descricao}</Title>
            {item.marca && <Value>{item.marca}</Value>}
          </View>

          <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Price>R$ {formatMoney(product.preco_venda)}</Price>

            <View style={{ alignItems: 'center', flexDirection: 'row', }}>
              <TouchableOpacity onPress={() => removeProductBag(product, empresa, dispatch, bag, total, products)}>
                <MinusIcon style={{ marginRight: 10 }} name="minus-circle-outline" size={30} color={colors.primary} />
              </TouchableOpacity>

              <Text style={{ marginRight: 10, color: colors.primary }} >{product.quantity || 0}</Text>

              <TouchableOpacity disabled={block} onPress={() => {
                if (close) {
                  Alert.alert(
                    'Confirme para continuar',
                    "Horário encerrado, não estamos mais aceitando pedidos hoje. Deseja adicionar assim mesmo ?",
                    [
                      {
                        text: 'Não',
                        onPress: () => { },
                        style: 'cancel',
                      },
                      {
                        text: 'Sim', onPress: () => {
                          addProductBag(product, empresa, dispatch, bag, total, products)
                        }
                      }],
                    { cancelable: false },
                  );
                } else {
                  addProductBag(product, empresa, dispatch, bag, total, products)
                }
              }}>
                <PlusIcon name="plus-circle-outline" size={30} color={block ? `${colors.regular}` : `${colors.primary}`} />
                {/* <PlusIcon name="plus-circle-outline" size={30} color={colors.primary} /> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>

    </Container>
  );
}
