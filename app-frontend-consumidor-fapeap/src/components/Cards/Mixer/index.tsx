import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withNavigation } from '@react-navigation/compat';

import logo from '../../../assets/icone1024x1024.png';
import formatMoney from '../../FormatMoney';
import { Container, Image, Title, Content, Text } from './styles';

interface IFile {
  url: string;
}

interface IMixer {
  item: {
    id: string;
    nome_fantasia: string;
    taxa_delivery: string;
    verificado: boolean;
    bairro: string;
    avaliacoesFornecedor: number[];
    arquivos: IFile[];
  };
  navigation: {
    navigate(route: string, params?: object): void;
  };
}

const Mixer: React.FC<IMixer> = ({ item, navigation }) => {
  function media(avaliacoes: number[]): string {
    if (avaliacoes.length === 0) return '0.0';
    let total = 0;
    for (let i = 0; i < avaliacoes.length; i++) {
      total += avaliacoes[i];
    }
    return String(Number(total / avaliacoes.length).toFixed(1));
  }

  function imagesFiles(files: IFile): IFile {
    const fileExtension_img = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

    const imagens = [];

    for (let i = 0; i < files.length; i++) {
      const ext = files[i].url.split('.').pop().toLowerCase();

      if (fileExtension_img.includes(ext)) {
        imagens.push(files[i]);
      }
    }

    return imagens;
  }

  return (
    <Container
      onPress={() => {
        navigation.navigate('Mixer', { item });
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
        <Title>{item.nome_fantasia}</Title>
        <Text style={{ marginBottom: 5 }} color="#FBC72D">
          <Icon name="star" color="#FBC72D" size={11} />{' '}
          {media(item.avaliacoesFornecedor)} - {item.bairro}
        </Text>
        <Text color="#999">
          {item.taxa_delivery
            ? `Delivery - R$ ${formatMoney(item.taxa_delivery)}`
            : 'Apenas retirada'}
        </Text>
      </Content>
    </Container>
  );
};

export default withNavigation(Mixer);
