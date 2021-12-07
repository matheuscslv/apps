import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  ScrollView,
  Picker,
  View,
  ActivityIndicator,
  Image,
  Text,
  Platform,
  ImageBackground
} from "react-native";
import moment from "moment";
import Orientation from "react-native-orientation-locker";
import { Dropdown } from "react-native-material-dropdown";
import { useSelector } from "react-redux";
// import carteirinha from '~/assets/CartaoExample.png';
import carteirinha from "~/assets/templateCartao.png";

import {
  Container,
  Card,
  CardImage,
  Button,
  ButoonText,
  Title,
  Description,
  CardInfo,
  Bold,
  Topic,
  Card2,
  Flilter,
  InfoUser,
  DataUser,
  CardView
} from "./styles";
import Header from "~/components/Header";
import api from "~/services/api";
import store from "~/services/storage";
import { colors } from "~/styles";

export default function Partnerships({ navigation }) {
  const profissional = useSelector(state => state.user.data.id_profissional);
  const [category, setCategory] = useState([
    { id: 0, value: "Todas" },
    { id: 1, value: "Saúde" },
    { id: 2, value: "Lazer" }
  ]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await api.get("/categoria");
    // const profileData = await store.get('User@Profile')
    // setProfile(profileData)
    setCategory(
      data.data.map(categoria => ({ ...categoria, value: categoria.nome }))
    );
    const response = await api.get("/parceiros");
    setCompanies(response.data.data);
    setFilter(response.data.data);
    setLoading(false);
  }

  function filterCategory(value) {
    setLoading(true);
    let idCategory;
    for (let i = 0; i < category.length; i++) {
      if (value === category[i].nome) {
        idCategory = category[i].id;
        break;
      }
    }
    setFilter(companies.filter(empresa => empresa.categoria_id == idCategory));
    setLoading(false);
  }

  function renderItem() {
    return filter.length != 0 ? (
      filter.map(parceiro => (
        <CardInfo key={parceiro.id}>
          <Title>{parceiro.nome} </Title>
          <Description>{parceiro.detalhes} </Description>
          <Bold>Endereço: </Bold>
          <Description>{parceiro.endereco} </Description>
          <Bold>Contatos: </Bold>
          <Description>{parceiro.contato} </Description>
          {/* <Bold>Contatos:</Bold>
    {parceiro.contatos.map(item => (<Description key={item}> {item} </Description>))} */}
        </CardInfo>
      ))
    ) : (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Description> Não há registros!! </Description>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <Header title="Programa de parcerias" />
      <Container>
        {/* <Card>
          <CardImage resizeMode="contain" source={carteirinha} />
        </Card> */}
        <CardView>
          <Card>
            <CardImage
              source={carteirinha}
              resizeMode="contain"
              style={{ width: window.width }}
            >
              {/* <InfoUser>
                <DataUser bold size={12}>
                  {profissional.nome}
                </DataUser>
                <DataUser>{profissional.tipo ? profissional.tipo : 'Não cadastrado'}</DataUser>
                <DataUser bold size={12}>
                  {profissional.cro}
                </DataUser>
                <DataUser>Válido até {profissional.validade ? moment(profissional.validade).format('DD/MM/YYYY') : '-'}</DataUser>
              </InfoUser> */}
            </CardImage>
          </Card>
          <Button
            onPress={() => {
              navigation.navigate("Wallet");
            }}
          >
            <ButoonText> Visualizar sua carteirinha </ButoonText>
          </Button>
        </CardView>
        <Topic>Empresas Parceiras</Topic>
        <Card2>
          <Flilter>
            <Dropdown
              baseColor="#000"
              label="Categoria"
              data={category}
              onChangeText={value => filterCategory(value)}
            />
          </Flilter>

          {!loading ? (
            renderItem()
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="small" color="#8b0000" />
            </View>
          )}
        </Card2>
      </Container>
    </ScrollView>
  );
}

Partnerships.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon name="handshake-o" size={21} color={tintColor} />
  )
};
