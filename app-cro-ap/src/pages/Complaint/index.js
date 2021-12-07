import React, { useState } from 'react';
import { ScrollView } from 'react-native';
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

export default function Complaint() {
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
    // console.tron.log(values);

    try {
      await api.post('/denuncia', { ...values, status: 'A' });
    } catch (e) {
      setError(true);
    }
    setLoading(false);

    if (!error) {
      showMessage({
        type: 'success',
        message: 'Tudo certo',
        floating: true,
        description: 'Sua denúncia foi recebida em nosso sistema!',
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
      <Header title="Denuncie" />
      <ScrollView>
        <Card>
          <Info>As informações prestadas por meio deste aplicativo serão tratadas de forma anônima e sigilosa. </Info>
          <Info>Caso queira acompanhar o processo, é necessario dirigir-se ao CRO/AP mais próximo de formalizar sua Denúncia. </Info>
          <FormEmail
            setForm={setForm}
            form={form}
            sendForm={sendForm}
            loading={loading}
            type="Denúncia"
          />
        </Card>
      </ScrollView>
    </Container>
  );
}


Complaint.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="commenting-o"
      size={21}
      color={tintColor}
    />
  ),
};
