import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from 'styled-components';

import logo from '../../assets/icone1024x1024_white.png';
import formatMoney from '../../components/FormatMoney';
import CartContext from '../../contexts/cart';
import {
  Container,
  Content,
  Header,
  Image,
  Title,
  Text,
  Footer,
  CountText,
  ButtonAdd,
  ButtonAddText,
} from './styles';

interface IFile {
  url: string;
}

interface IProps {
  route: {
    params: {
      item: {
        id: string;
        nome: string;
        unidade_medida: string | number;
        preco: string;
        status_produto: boolean;
        estoque_produto: number;
        arquivos: IFile[];
      };
    };
  };
}

const Product: React.FC<IProps> = (props) => {
  const { cart, addCart, removeCart } = useContext(CartContext);
  const data = props?.route?.params?.item;

  const { colors } = useTheme();

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(
      cart?.filter((item) => item.id === data.id).length > 0
        ? cart?.filter((item) => item.id === data.id)[0].quantity
        : 0,
    );
  }, [data, cart]);

  function imagesFiles(files: IFile[]): IFile[] {
    const fileExtension_img = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

    const imagens = [];

    for (let i = 0; i < files.length; i++) {
      const ext = files[i]?.url?.split('.')?.pop()?.toLowerCase();

      if (fileExtension_img.includes(ext)) {
        imagens.push(files[i]);
      }
    }

    return imagens;
  }

  return (
    <Container>
      {imagesFiles(data.arquivos).length > 0 ? (
        <Image
          source={{
            uri: imagesFiles(data.arquivos)[0].url,
          }}
        />
      ) : (
        <Image source={logo} />
      )}

      <Content>
        <Header>
          <Title style={{ marginBottom: 5 }}>{data.nome}</Title>
          <Text style={{ marginBottom: 5 }}>
            {isNaN(data.unidade_medida)
              ? `1 ${data.unidade_medida}`
              : `${data.unidade_medida} Litro(s)`}{' '}
            - R$ {formatMoney(data.preco)}
          </Text>

          {data.status_produto ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Icon
                style={{ marginRight: 5 }}
                name="check-circle"
                color={colors.success}
                size={18}
              />
              <Text>Disponível</Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Icon
                style={{ marginRight: 5 }}
                name="close-circle"
                color={colors.danger}
                size={18}
              />
              <Text>Indisponível</Text>
            </View>
          )}
        </Header>

        <Footer>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <Text>Adicione no seu carrinho</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => data.status_produto && removeCart(data)}
              >
                <Icon
                  style={{ marginRight: 10 }}
                  name="minus-circle"
                  color={colors.primary}
                  size={30}
                />
              </TouchableOpacity>
              <CountText>
                {cart?.filter((item) => item.id === data.id).length > 0
                  ? cart?.filter((item) => item.id === data.id)[0].quantity
                  : 0}
              </CountText>
              <TouchableOpacity
                onPress={() =>
                  data.status_produto &&
                  data.estoque_produto > 0 &&
                  addCart(data)
                }
              >
                <Icon
                  style={{ marginLeft: 10 }}
                  name="plus-circle"
                  color={
                    (cart?.filter((item) => item.id === data.id).length > 0 &&
                      cart?.filter((item) => item.id === data.id)[0]
                        .quantity ===
                        cart?.filter((item) => item.id === data.id)[0]
                          .estoque_produto) ||
                    data.estoque_produto === 0
                      ? colors.regular
                      : colors.primary
                  }
                  size={30}
                />
              </TouchableOpacity>
            </View>

            <Text>R$ {formatMoney(Number(data.preco) * Number(quantity))}</Text>
          </View>

          <ButtonAdd
            onPress={() =>
              data.status_produto && data.estoque_produto > 0 && addCart(data)
            }
          >
            <ButtonAddText>Adicionar item</ButtonAddText>
          </ButtonAdd>
        </Footer>
      </Content>
    </Container>
  );
};

export default Product;
