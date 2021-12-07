import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Modal
} from 'react-native';

import {
  DownIcon,
  TextCard,
  HeaderCart,
  MinusIcon,
  PlusIcon
} from '../styles';
import { colors } from '~/styles';

import { addProductBag, removeProductBag, removeProductBagCart } from '~/Components/Bag'
import formatMoney from '~/Components/ConvertMoney';
import soma, { somaOrder, somaUnitaria } from '~/Components/SumTotalBag'
import { useSelector, useDispatch } from 'react-redux';
import { BagsTypes } from '~/store/ducks/bag';

import Textarea from 'react-native-textarea';

function EditOrder({ item, open, setOpen }) {
  const dispatch = useDispatch();
  const bag = useSelector(state => state.bags.data);
  const total = useSelector(state => state.bags.total);

  const [observacao, setObservacao] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [product] = bag.filter(
    produto => produto.id == item.id
  );

  useEffect(() => {
    const final = bag.map(produto => (produto.id == item.id ? { ...produto, observacao } : produto))
    dispatch({
      type: BagsTypes.GET_BAGS_SUCCESS,
      data: final,
      total: total,
    });
  }, [observacao])

  useEffect(() => {
    if (open) {
      setObservacao(product.observacao)
    }
  }, [open])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
    >
      {open &&
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ padding: 10, marginTop: Platform.OS === 'android' ? 10 : 30 }}>
              <HeaderCart>
                <DownIcon name="md-basket" color={colors.primary} size={20} />
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.primary}
                >
                  Detalhes do Item
              </TextCard>
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <DownIcon
                    name="ios-close-circle-outline"
                    color={colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </HeaderCart>

              <View style={{ marginBottom: 20 }}>
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.primary}
                >
                  {product.descricao}
                </TextCard>
                <TextCard color={"#080"}>R$ {formatMoney(somaUnitaria(product))}</TextCard>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: "space-between", marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <MinusIcon style={{ marginRight: 10 }} name="comment-text-outline" size={25} color={colors.primary} />
                  <TextCard
                    style={{ fontFamily: 'Quicksand-Bold' }}
                    color={colors.primary}
                  >Alguma observação?</TextCard>
                </View>
              </View>

              <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 5
              }}>
                <Textarea
                  containerStyle={{
                    height: 100,
                    paddingHorizontal: 5,
                    backgroundColor: '#fff',
                    borderRadius: 5
                  }}
                  style={{
                    textAlignVertical: 'top',  // hack android
                    height: 100,
                    fontSize: 14,
                    color: '#999',
                  }}
                  value={observacao}
                  onChangeText={value => setObservacao(value)}
                  //defaultValue={this.state.text}
                  maxLength={140}
                  placeholder={'Escreva algo...'}
                  placeholderTextColor={'#999'}
                  underlineColorAndroid={'transparent'}
                />
              </View>

              <View style={{ alignItems: "center", flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => {
                  if (product.quantity > 1) {
                    removeProductBag(product, [], dispatch, bag, total, []);
                  } else {
                    removeProductBagCart(product, [], dispatch, bag, total, []);
                    setOpen(false);
                  }
                }}>
                  <MinusIcon style={{ marginRight: 10 }} name="minus-circle-outline" size={25} color={colors.success} />
                </TouchableOpacity>

                <TextCard style={{ marginRight: 10 }} color={"#080"}>{product.quantity}</TextCard>

                <TouchableOpacity onPress={() => addProductBag(product, product, dispatch, bag, total, [])}>
                  <PlusIcon name="plus-circle-outline" size={25} color={colors.success} />
                </TouchableOpacity>
              </View>


            </View>
          </ScrollView>
        </View>
      }
    </Modal>
  );
}

export default (EditOrder);
