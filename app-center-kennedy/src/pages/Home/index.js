import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, Modal} from 'react-native';
import CardProduct from '~/components/CardProduct';
import ButtonCompany from './ButtonCompany';
import CardTopThree from './CardTopThree';
import SearchHeader from 'react-native-search-header';
import {SliderBox} from 'react-native-image-slider-box';

import {
  Container,
  ContentSearch,
  TitleSearch,
  IconSearch,
  ViewEmpresa,
  Banner,
  ContainerAll,
  TitleCard,
  CardNotification,
  Title,
  Input,
  Button,
  ButtonText,
  InputContainer,
} from './styles';

import banner1 from '~/assets/banner1.jpg';
import banner2 from '~/assets/banner2.jpg';
import banner3 from '~/assets/banner3.jpg';
import {ScrollView} from 'react-native-gesture-handler';

export default function Home({navigation}) {
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState({string: '', isValid: false});
  const [marcas, setMarcas] = useState([
    {id: 1, name: 'Eletrolux'},
    {id: 2, name: 'DELL'},
    {id: 3, name: 'LG'},
    {id: 4, name: 'HP'},
    {id: 5, name: 'Brasilite'},
    {id: 6, name: 'Brastemp'},
  ]);

  useEffect(() => {
    async function getResults() {
      setResults([
        {
          id: 1,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 2,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 3,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 4,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 5,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
        {
          id: 6,
          name: 'Geladeira blablalala',
          price: 2.299,
          valor_parcela: 199.9,
          parcelas: 10,
        },
      ]);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    getResults();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderItem({item}) {
    return (
      <CardProduct
        name={item.name}
        price={item.price}
        parcelas={item.parcelas}
        valor_parcela={item.valor_parcela}
      />
    );
  }

  function handleEmail(text) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(String(text).toLowerCase());
    setEmail({isValid, string: text});
  }

  return (
    <Container>
      <ScrollView>
        <ViewEmpresa>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={marcas}
            horizontal
            keyExtractor={item => String(item.id)}
            renderItem={({item}) => <ButtonCompany item={item} />}
          />
        </ViewEmpresa>

        <SliderBox
          images={[banner1, banner2, banner3]}
          sliderBoxHeight={150}
          autoplay
          circleLoop
          resizeMode="contain"
        />
        <Banner source={banner2} />
        <Banner source={banner3} />

        <CardNotification>
          <Title>Deseja receber nossas ofertas? </Title>
          <InputContainer>
            <Input
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCompleteType="email"
              autoCapitalize="none"
              value={email.string}
              onChangeText={e => handleEmail(e)}
            />
            <Button disabled={!email.isValid}>
              <ButtonText>Confirmar</ButtonText>
            </Button>
          </InputContainer>
        </CardNotification>

        <CardTopThree
          title="mais visto do momento"
          data={[
            {
              id: 1,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
            {
              id: 2,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
            {
              id: 3,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
          ]}
        />
        <CardTopThree
          title="mais desejados do momento"
          data={[
            {
              id: 1,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
            {
              id: 2,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
            {
              id: 3,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
          ]}
        />
        <CardTopThree
          title="mais comprados do momento"
          data={[
            {
              id: 1,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
            {
              id: 2,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
            {
              id: 3,
              name: 'Geladeira blablalala',
              price: 2.299,
              valor_parcela: 199.9,
              parcelas: 10,
            },
          ]}
        />
        <ContainerAll>
          <TitleCard>aproveite também...</TitleCard>
          <FlatList
            data={results}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-around',
            }}
          />
        </ContainerAll>
      </ScrollView>
    </Container>
  );
}

Home.navigationOptions = ({navigation}) => {
  return {
    headerTitle: (
      <ContentSearch onPress={() => navigation.navigate('Search')}>
        <TitleSearch>Busque na Center Kennedy</TitleSearch>
        <IconSearch size={25} />
      </ContentSearch>
    ),
    headerRight: null,
  };
};
