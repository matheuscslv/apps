import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ShoppingTypes } from '~/store/ducks/shopping';
import IsEmpty from '~/components/IsEmpty';
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
import Loading from '~/components/Loading';

export default function Shopping({ navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const shopping = useSelector((state) => state.shopping.data);
  const loading = useSelector((state) => state.shopping.loading);
  const refreshing = useSelector((state) => state.shopping.refreshing);

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

  const renderIconStatusI = useCallback((status) => {
    let color = '#696969'; // gray
    let icon_name = 'like2'; // received

    switch (status.toUpperCase()) {
      case 'AGUARDANDO PAGAMENTO':
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
        return <FaIcon name="shipping-fast" size={28} color={colors.success} />;
      case 'FINALIZADO':
        color = colors.success;
        icon_name = 'checkcircleo';
        break;
      case 'PAGAMENTO NÃO AUTORIZADO':
        color = colors.danger;
        icon_name = 'closecircleo';
        break;
      default:
        return colors.regular;
    }

    return <IconeCheck size={28} color={color} name={icon_name} />;
  }, []);

  function renderItem(item) {
    return (
      <Item>
        <HeaderCard>
          {renderIconStatusI(item.status)}
          <Title>
            {item.status} - N° {item.id}
          </Title>

          <SubTitle>{item.formattedDate}</SubTitle>
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
          keyExtractor={(item) => String(item.id)}
          ListFooterComponentStyle={{ marginBottom: 20 }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            !loading && (
              <IsEmpty>
                Por enquanto você nao tem histórico de pedidos!!
              </IsEmpty>
            )
          }
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
}
