import React, { useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Container,
  Info,
  Card,
} from './styles';
import FormEmail from '~/components/FormEmail';
import Header from '~/components/Header';
import api from '~/services/api';

// import { Container } from './styles';

export default function Help() {
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    texto: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function sendForm(values, resetForm) {
    setLoading(true);
    //console.tron.log(values);

    const data = {
      id: 1,
      nome: values.nome,
      telefone: values.telefone,
      email: values.email,
      mensagem: values.texto,
      status: 'A'
    }
    try {
      await api.post('/mensagem', data);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
    if (!error) {
      showMessage({
        type: 'success',
        message: 'Tudo certo',
        floating: true,
        description: 'Sua mensagem foi recebida em nosso sistema!',
        icon: 'success',
      });
      resetForm({ ...values,
        texto: '',
      })
    } else {
      showMessage({
        type: 'danger',
        message: 'Algo deu errado',
        floating: true,
        description: 'Ocorreu um erro interno em nosso sistema!',
        icon: 'danger',
      });
    }
  }


  return (
    <Container>
      <Header title="Fale com CRO" />
      <ScrollView>
        <Card>
          <Info>As informações prestadas por meio deste aplicativo serão tratadas de forma anônima e sigilosa. </Info>
          <FormEmail
            setForm={setForm}
            form={form}
            sendForm={sendForm}
            loading={loading}
          />
        </Card>
      </ScrollView>
    </Container>
  );
}


Help.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="comments-o"
      size={21}
      color={tintColor}
    />
  ),
};
