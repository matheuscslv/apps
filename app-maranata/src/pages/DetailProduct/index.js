import React, { useMemo, useCallback } from 'react';
import noimage from '~/assets/noimage.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BagsActions from '~/store/ducks/bag';

import {
  Container,
  Content,
  ImageProduct,
  Name,
  Category,
  Description,
  TitleFooter,
  Actions,
  Action,
  Icon,
  Amount,
  NoStock,
} from './styles';
import formatPrice from '~/utils/formatPrice';
import Button from '~/components/Button';
import Loading from '~/components/Loading';

export default function DetailProduct({ route }) {
  const idProduct = route.params.id;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bag = useSelector((state) => state.bags.data);
  const bagLoading = useSelector((state) => state.bags.loading);
  const productLoading = useSelector((state) => state.products.loading);
  const products = useSelector((state) => state.products.data);

  if (bagLoading || productLoading) {
    return <Loading />;
  }

  const product =
    bag.find((p) => p.id === idProduct) ||
    products.find((p) => p.id === idProduct);

  const buttonMinusDisabled = useMemo(() => product?.quantity === 0, [product]);
  const buttonPlusDisabled = useMemo(
    () => product?.quantity + 1 > product?.estoque_quantidade,
    [product],
  );

  const formattedPrice = useMemo(() => formatPrice(product?.preco_venda || 0), [
    product?.preco_venda,
  ]);

  const addProductBag = useCallback(
    (product) => {
      const amount = product?.quantity + 1;
      dispatch(BagsActions.updateProductRequest({ amount, product }));
    },
    [product],
  );

  const removeProductBag = useCallback(
    (product) => {
      const amount = product?.quantity - 1;
      dispatch(BagsActions.updateProductRequest({ amount, product }));
    },
    [product],
  );

  const handleGoToCart = useCallback(() => {
    navigation.goBack();
    navigation.navigate('Cart');
  }, []);

  return (
    <Container>
      <ImageProduct
        resizeMode="contain"
        source={{
          uri:
            product?.imagem ||
            'https://apimaranata.msbtec.com.br/storage/produtos/noimage.jpg',
        }}
      />
      <Content>
        <Name>{product?.descricao}</Name>
        <Category>{product?.marca || product?.secao?.secao}</Category>

        <Description>{product?.descricao}</Description>

        <TitleFooter>Adicione no seu carrinho</TitleFooter>
        <Actions>
          <Action
            disabled={buttonMinusDisabled}
            onPress={() => removeProductBag(product)}
          >
            <Icon
              disabled={buttonMinusDisabled}
              name="minus-circle"
              size={25}
            />
          </Action>
          <Amount>{product?.quantity}</Amount>
          <Action
            disabled={buttonPlusDisabled}
            onPress={() => addProductBag(product)}
          >
            <Icon name="plus-circle" disabled={buttonPlusDisabled} size={25} />
          </Action>
          <Amount
            style={{
              marginLeft: 'auto',
              fontSize: 16,
            }}
          >
            {formattedPrice}
          </Amount>
        </Actions>

        {buttonPlusDisabled && (
          <NoStock>Limite máximo disponível no estoque</NoStock>
        )}

        <Button
          width="100%"
          style={{
            marginTop: 20,
          }}
          onSubmit={handleGoToCart}
        >
          IR PARA O CARRINHO
        </Button>
        <Button
          width="100%"
          style={{
            marginTop: 10,
          }}
          outline
          onSubmit={() => navigation.goBack()}
        >
          CONTINUAR COMPRANDO
        </Button>
      </Content>
    </Container>
  );
}
