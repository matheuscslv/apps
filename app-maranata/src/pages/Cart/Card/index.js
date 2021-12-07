import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BagsActions from '~/store/ducks/bag';
import {
  Container,
  ImageFood,
  Info,
  TitleFood,
  CategoryFood,
  Content,
  Amount,
  Action,
  ActionIcon,
  NumberItem,
  Price,
} from './styles';
import formatPrice from '~/utils/formatPrice';
import Loading from '~/components/Loading';

export default function Card({ item }) {
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.bags.data);
  const bagLoading = useSelector((state) => state.bags.loading);
  const productLoading = useSelector((state) => state.products.loading);
  const product = bag.find((produto) => produto.id === item.id);

  if (bagLoading || productLoading) {
    return <Loading />;
  }

  const formattedProductQuantity = product?.quantity || 0;

  const minusButtonDisabled = useMemo(() => formattedProductQuantity === 0, [
    product,
  ]);
  const plusButtonDisabled = useMemo(
    () => formattedProductQuantity + 1 > product.estoque_quantidade,
    [product],
  );

  const formattedPrice = useMemo(() => formatPrice(product.preco_venda), [
    product.preco_venda,
  ]);

  const addProductBag = useCallback(() => {
    const amount = formattedProductQuantity + 1;
    dispatch(BagsActions.updateProductRequest({ amount, product }));
  }, [product]);

  const removeProductBag = useCallback(() => {
    const amount = formattedProductQuantity - 1;
    dispatch(BagsActions.updateProductRequest({ amount, product }));
  }, [product]);

  const ButtonAction = useCallback(
    ({ disabled, onPress, icon }) => (
      <Action disabled={disabled} onPress={onPress}>
        <ActionIcon name={icon} />
      </Action>
    ),
    [product],
  );

  return (
    <Container>
      <ImageFood
        source={{
          uri:
            product?.imagem ||
            'https://apimaranata.msbtec.com.br/storage/produtos/noimage.jpg',
        }}
      />

      <Info>
        <TitleFood>{product?.descricao}</TitleFood>
        <CategoryFood>{product?.secao?.secao}</CategoryFood>
        <Content>
          <Amount>
            {ButtonAction({
              icon: 'minus',
              disabled: minusButtonDisabled,
              onPress: removeProductBag,
            })}
            <NumberItem>{product?.quantity}</NumberItem>
            {ButtonAction({
              onPress: addProductBag,
              icon: 'plus',
              disabled: plusButtonDisabled,
            })}
          </Amount>
          <Price>{formattedPrice}</Price>
        </Content>
      </Info>
    </Container>
  );
}
