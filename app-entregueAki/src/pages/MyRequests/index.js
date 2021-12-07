import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, ScrollView, View, ActivityIndicator } from 'react-native';

import 'moment/locale/pt-br';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import api from '~/services/api';
import { ShoppingTypes } from '~/store/ducks/shopping';
import Loading from '~/Components/Loading';
import { colors } from '~/styles';
import { Container, Text, Card, IconeCheck } from './styles';

import FaIcon from 'react-native-vector-icons/FontAwesome5';
import formatMoney from '~/Components/ConvertMoney';

export default function MyRequests({ navigation }) {

  const dispatch = useDispatch();
  const shopping = useSelector(state => state.shopping.data);
  const loading = useSelector(state => state.shopping.loading);
  const refreshing = useSelector(state => state.shopping.refreshing);

  const token = useSelector((state) => state.user.token);

  /* useEffect(() => {
    if (!token) console.log("nao");
  }, [token]) */

  const loadData = useCallback(() => {
    dispatch({
      type: ShoppingTypes.GET_SHOPPING_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadData = useCallback(() => {
    dispatch({
      type: ShoppingTypes.GET_SHOPPING_RELOAD_REQUEST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderIconStatusI = useCallback((item) => {
    let color = '#696969'; // gray
    let icon_name = 'like2'; // received

    switch (item.status.toUpperCase()) {
      case 'AGUARDANDO PAGAMENTO':
        color = colors.danger;
        icon_name = 'checkcircleo';
        break;
      case 'AGUARDANDO APROVAÇÃO':
        color = colors.danger;
        icon_name = 'checkcircleo';
        break;
      case 'PAGAMENTO CONFIRMADO':
        color = colors.success;
        icon_name = 'checkcircleo';
        break;
      case 'EM PROCESSAMENTO':
        color = colors.regular;
        icon_name = 'checkcircleo';
        break;
      case 'AGUARDANDO RETIRADA':
        color = colors.success;
        icon_name = 'checkcircleo';
        break;
      case 'SAIU PARA ENTREGA':
        return <>
          <FaIcon name="shipping-fast" size={28} color={colors.success} />
          <Text font={"Quicksand-Bold"} color={colors.success}>Pedido: #{item.id} - {item.status}</Text>
        </>;
      case 'FINALIZADO':
        color = colors.success;
        icon_name = 'checkcircleo';
        break;
      case 'PAGAMENTO FALHOU':
        color = colors.danger;
        icon_name = 'closecircleo';
        break;
      case 'PAGAMENTO NÃO AUTORIZADO':
        color = colors.danger;
        icon_name = 'closecircleo';
        break;
      default:
        color = colors.danger;
        icon_name = 'closecircleo';
        break;
    }

    return <>
      <IconeCheck name={icon_name} size={28} color={color} />
      <Text font={"Quicksand-Bold"} color={color}>Pedido: #{item.id} - {item.status}</Text>
    </>
      ;
  }, []);

  function renderItem(item) {
    return (
      <Card onPress={() => navigation.navigate("DetailRequest", { item })}>
        {renderIconStatusI(item)}

        <Text font={"Quicksand-Regular"} color={colors.regular}>{item.empresa.nome_fantasia}</Text>
        <Text font={"Quicksand-Regular"} color={colors.regular}>{moment(item.created_at)
          .locale('pt-br')
          .format('LLLL')}</Text>
        <Text font={"Quicksand-Regular"} color={colors.regular}>R$ {formatMoney(item.total)}</Text>
      </Card>
    );
  }

  return <Container>
    {!loading || !token ? (
      <FlatList
        onEndReached={loadData}
        data={shopping}
        onRefresh={reloadData}
        refreshing={refreshing}
        renderItem={({ index, item }) => renderItem(item)}
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
              font={"Quicksand-Regular"} color={colors.regular}
              style={{
                fontSize: 14,
                padding: 40,
                textAlign: 'center',
                color: '#333',
                lineHeight: 28,
              }}
            >
              Por enquanto você não tem histórico de pedidos!
        </Text>
          </View>
        }
      />
    ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
  </Container>
}
