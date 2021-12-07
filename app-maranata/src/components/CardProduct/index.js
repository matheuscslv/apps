import React, { useMemo } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { useSelector } from 'react-redux';

import {
  Container,
  ImageProduct,
  TitleProduct,
  DescriptionProduct,
  Footer,
  Price1,
  Favorite,
} from './styles';
import formatPrice from '~/utils/formatPrice';

function CardProduct({ item, navigation }) {
  const bag = useSelector((state) => state.bags.data);
  const products = useSelector((state) => state.products.data);

  const product =
    bag.find((p) => p.id === item.id) || products.find((p) => p.id === item.id);

  const formattedPrice = useMemo(() => formatPrice(product?.preco_venda || 0), [
    product?.preco_venda,
  ]);

  return (
    <Container
      onPress={() => navigation.navigate('DetailProduct', { id: product.id })}
    >
      <ImageProduct
        source={{
          uri:
            product?.imagem ||
            'https://apimaranata.msbtec.com.br/storage/produtos/noimage.jpg',
        }}
      />
      <TitleProduct>{product?.descricao}</TitleProduct>
      <DescriptionProduct numberOfLines={3}>
        {product?.marca || product?.secao?.secao || 'Sem descrição'}
      </DescriptionProduct>

      <Footer>
        <Price1>{formattedPrice}</Price1>
        <Favorite size={20} />
      </Footer>
    </Container>
  );
}

export default withNavigation(CardProduct);
