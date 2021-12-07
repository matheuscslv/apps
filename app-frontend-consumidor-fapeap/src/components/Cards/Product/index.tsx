import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withNavigation } from '@react-navigation/compat';
import { useTheme } from 'styled-components';

import logo from '../../../assets/icone1024x1024.png';
import formatMoney from '../../FormatMoney';
import { Container, Image, Title, Content, Text } from './styles';

interface IFile {
  url: string;
}

interface IProduct {
  item: {
    id: string;
    nome: string;
    preco: string;
    status_produto: boolean;
    estoque_produto: number;
    unidade_medida: number;
    arquivos: IFile[];
  };
  navigation: {
    navigate(route: string, params?: object): void;
  };
}

const Product: React.FC<IProduct> = ({ item, navigation }) => {
  const { colors } = useTheme();

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
    <Container
      onPress={() => {
        navigation.navigate('Product', { item });
      }}
    >
      {imagesFiles(item.arquivos).length > 0 ? (
        <Image
          source={{
            uri: imagesFiles(item.arquivos)[0].url,
          }}
        />
      ) : (
        <Image source={logo} />
      )}
      <Content>
        <Title style={{ marginBottom: 5 }}>{item.nome}</Title>
        <Text>
          {isNaN(item.unidade_medida)
            ? `1 ${item.unidade_medida}`
            : `${item.unidade_medida} Litro(s)`}{' '}
          - R$ {formatMoney(item.preco)}
        </Text>
        {item.status_produto ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              style={{ marginRight: 5 }}
              name="check-circle"
              color={colors.success}
              size={15}
            />
            <Text>Disponível</Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              style={{ marginRight: 5 }}
              name="close-circle"
              color={colors.danger}
              size={15}
            />
            <Text>Indisponível</Text>
          </View>
        )}
      </Content>
    </Container>
  );
};

export default withNavigation(Product);
