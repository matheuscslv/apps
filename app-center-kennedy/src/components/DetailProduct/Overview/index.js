import React, {useState} from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  Container,
  Photos,
  ContentInfo,
  Title,
  Price1,
  Price2,
  Button,
  ButtonText,
  ContentFrete,
  TitleFrete,
  InputFrete,
  ResponseFrete,
  PriceFrete,
  InfoFrete,
  TitleSmall,
  ContainerPhotos,
  PriceSmall,
  InputContainer,
  Error,
} from './styles';
import {colors} from '~/styles';

export default function Overview() {
  const [loading, setLoading] = useState(false);
  const [frete, setFrete] = useState(false);
  const [errorFrete, setErrorFrete] = useState(false);
  const [cep, setCep] = useState('');
  const [imageFull, setImageFull] = useState(false);
  const images = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://novomundo.vteximg.com.br/arquivos/ids/1074307-500-500/geladeira-refrigerador-brastemp-duplex-frost-free-462l-branco-brm56ab-220v-50277-0.jpg?v=636426541447630000',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  function calcularFrete() {
    if (cep.length !== 9) {
      setErrorFrete(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setFrete(99.0);
      setLoading(false);
    }, 2000);
  }

  function maskFrete(text) {
    if (text.length <= 9) {
      if (text.length === 5 && cep.length + 1 === text.length) {
        setCep(`${text}-`);
      } else {
        setCep(text);
      }
      setErrorFrete(false);
    }
  }

  return (
    <Container>
      <Modal visible={imageFull} transparent={true}>
        <ImageViewer
          onSwipeDown={() => setImageFull(false)}
          enableSwipeDown
          imageUrls={images.map(url => ({
            url,
            props: {},
          }))}
          renderHeader={() => (
            <TouchableOpacity
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                height: 40,
                width: 40,
                top: 28,
                right: 20,
                zIndex: 100,
              }}
              onPress={() => setImageFull(false)}>
              <Text style={{color: '#fff', fontSize: 25, fontWeight: 'bold'}}>
                X
              </Text>
            </TouchableOpacity>
          )}
        />
      </Modal>
      <ScrollView>
        <ContainerPhotos>
          {/* <Photos
            resizeMode="contain"
            source={{
              uri:
                'https://novomundo.vteximg.com.br/arquivos/ids/1074307-500-500/geladeira-refrigerador-brastemp-duplex-frost-free-462l-branco-brm56ab-220v-50277-0.jpg?v=636426541447630000',
            }}
          /> */}
          <SliderBox
            images={images}
            sliderBoxHeight={300}
            autoplay
            circleLoop
            resizeMode="contain"
            onCurrentImagePressed={() => setImageFull(true)}
          />
        </ContainerPhotos>
        <ContentInfo>
          <Title>Geladeira blabla</Title>
          <Price2 style={{textDecorationLine: 'line-through', color: '#999'}}>
            R$ 200,00
          </Price2>
          <Price2>R$ 189,99 </Price2>
          <Price2>5x de R$ 32,30 sem juros </Price2>
          <Price1>
            R$ 161,52 <PriceSmall>à vista</PriceSmall>
          </Price1>

          <Button>
            <ButtonText> COMPRAR AGORA </ButtonText>
          </Button>
          <Button background="#FFF">
            <ButtonText color> ADICIONAR AO CARRINHO </ButtonText>
          </Button>
        </ContentInfo>

        {/* <ContentFrete>
          <TitleFrete>Calcular frete</TitleFrete>
          <InputContainer error={errorFrete}>
            <InputFrete
              placeholder="CEP (somente números)"
              value={cep}
              onChangeText={maskFrete}
              returnKeyType="search"
              onSubmitEditing={calcularFrete}
            />
            {errorFrete && <Error>CEP inválido!</Error>}
            {loading && !errorFrete && (
              <ActivityIndicator color={colors.primary} size="small" />
            )}
          </InputContainer>
        </ContentFrete>

        {frete && !errorFrete && (
          <ResponseFrete animation="fadeInDown">
            <View>
              <TitleFrete>Padrão</TitleFrete>
              <TitleSmall>em ate 21 de dezembro</TitleSmall>
            </View>
            <PriceFrete>R$ 99,00 </PriceFrete>
          </ResponseFrete>
        )} */}

        <InfoFrete>
          *O prazo de entrega será contado após o 1º dia útil da aprovação do
          pedido
        </InfoFrete>
      </ScrollView>
    </Container>
  );
}
