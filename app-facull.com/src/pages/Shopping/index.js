import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

import 'moment/locale/pt-br';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import api from '~/services/api';
import { ShoppingTypes } from '~/store/ducks/shopping';

import {
  Container,
  Item,
  HeaderCard,
  IconeCheck,
  Title,
  SubTitle,
  Button,
  ButtonText,
} from './styles';

export default function Shopping({ navigation }) {
  const dispatch = useDispatch();
  const shopping = useSelector(state => state.shopping.data);
  const loading = useSelector(state => state.shopping.loading);
  const refreshing = useSelector(state => state.shopping.refreshing);

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

  function renderItem(item) {
    // #5ed7b4
    return (
      <Item>
        <HeaderCard>
          <IconeCheck
            size={28}
            status={item.status}
            color={
              item.status === 'Finalizado' ||
              item.status === 'Pagamento Confirmado'
                ? '#5ed7b4'
                : '#8b0000'
            }
          />
          <Title>
            {item.status} - N° {item.id}{' '}
          </Title>

          <SubTitle>
            {moment(item.created_at)
              .locale('pt-br')
              .format('LLL')}
          </SubTitle>
          <SubTitle>{item.itens_count} itens</SubTitle>
        </HeaderCard>

        <Button
          onPress={() => navigation.navigate('PurchaseDetail', { id: item.id })}
        >
          <ButtonText>Ver Detalhes</ButtonText>
        </Button>
      </Item>
    );
  }

  return (
    <Container>
      {!loading ? (
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
                style={{
                  fontSize: 14,
                  padding: 40,
                  textAlign: 'center',
                  color: '#333',
                  lineHeight: 28,
                }}
              >
                Por enquanto você nao tem histórico de pedidos!
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
  );
}

Shopping.navigationOptions = {
  headerTitle: 'Meus Pedidos',
};
