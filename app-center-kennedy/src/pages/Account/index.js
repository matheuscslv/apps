import React from 'react';
import {View, ScrollView, Image, Alert} from 'react-native';

import {Container, Icone, Content, Title, SubTitle, TextFooter} from './styles';
import {colors} from '~/styles';
import store from '~/services/storage';
import {useSelector} from 'react-redux';

export default function Account({navigation}) {
  const profile = useSelector(state => state.user.data);

  async function handleLogout() {
    Alert.alert(
      'Atenção',
      'Você dejesa mesmo sair da conta vinculada ao seu aplicativo?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'SIM',
          onPress: () => console.log('OK Pressed'),
        },
      ],
    );
  }

  return (
    <Container>
      <ScrollView>
        <Content
          onPress={() => {
            navigation.navigate('Login');
          }}>
          {profile ? (
            <Image
              source={{uri: profile.avatar}}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
          ) : (
            <Icone
              name="account-circle-outline"
              size={35}
              color={colors.primary}
            />
          )}
          <View style={{marginLeft: 20}}>
            <Title style={{fontWeight: 'bold'}}>{profile.name} </Title>
            <SubTitle>{profile.email}</SubTitle>
          </View>
        </Content>
        <Content
          style={{marginVertical: 7}}
          onPress={() => navigation.navigate('Register')}>
          <Icone name="dropbox" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Pedidos</Title>
        </Content>
        <Content onPress={() => navigation.navigate('Profile')}>
          <Icone name="account-card-details" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Dados Pessoais</Title>
        </Content>
        <Content
          onPress={() => {
            navigation.navigate('Adresses');
          }}>
          <Icone name="home-city" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Endereços</Title>
        </Content>

        {/* <Content
          onPress={() => {
            navigation.navigate('CredCard');
          }}>
          <Icone name="credit-card" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Cartões de crédito</Title>
        </Content> */}
        <Content onPress={() => navigation.navigate('PasswordAccess')}>
          <Icone name="key-variant" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Senha de acesso</Title>
        </Content>
        <Content
          onPress={() => {
            store.save('User@Estado', null);
          }}>
          <Icone name="loop" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Alterar município de compra</Title>
        </Content>

        <Content
          style={{marginTop: 7}}
          onPress={() => {
            navigation.navigate('MapStores');
          }}>
          <Icone name="store" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Nossas lojas</Title>
        </Content>
        <Content
          onPress={() => {
            navigation.navigate('Regulaments');
          }}>
          <Icone name="card-text-outline" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Regulamentos</Title>
        </Content>
        <Content
          onPress={() => {
            navigation.navigate('ContactUs');
          }}>
          <Icone name="headset" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Fale conosco</Title>
        </Content>

        <Content
          onPress={() => {
            navigation.navigate('Doubts');
          }}>
          <Icone name="help-circle-outline" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Perguntas Frequentes</Title>
        </Content>
        <Content
          onPress={() => {
            navigation.navigate('PrivacyPolicies');
          }}>
          <Icone name="shield-key" size={22} color="#777" />
          <Title style={{marginLeft: 20}}>Política de Privacidade</Title>
        </Content>

        <Content
          onPress={handleLogout}
          style={{justifyContent: 'center', marginTop: 5}}>
          <Title style={{textAlign: 'center', color: '#f00'}}>SAIR</Title>
        </Content>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
          }}>
          <TextFooter>Av. Padre Julio M. Lombaerd, nº 2353</TextFooter>
          <TextFooter>Bairro: Santa Rita, </TextFooter>
          <TextFooter>Cep: 68.901-283</TextFooter>
          <TextFooter>Cidade: Macapá - Amapá</TextFooter>
        </View>
      </ScrollView>
    </Container>
  );
}
