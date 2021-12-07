import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal, Alert } from 'react-native';

import { Form } from '@unform/mobile';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Input from '~/components/Input';
import api from '~/services/api';

import Button from '../Button';
import PickerOptions from '../PickerOptions';
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  IconClose,
  FormContent,
} from './styles';

export default function ModalGuest({ onClose, modal, idMatche, idUser, cb }) {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [positions, setPositions] = useState(null);
  const [position_id, setPositionId] = useState(null);

  useEffect(() => {
    if (!modal || positions) return;
    api
      .get('/positions')
      .then(response => {
        setPositions(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  async function validationFields(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(50, 'Máximo 50 caracteres')
          .required('Nome é obrigatório'),
        email: Yup.string()
          .email('Digite um email válido')
          .max(100, 'Máximo 100 caracteres')
          .required('Email é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      if (!position_id) {
        Alert.alert(
          'Campo obrigatório',
          'Você deve selecionar a posição em que o participante irá jogar!'
        );
        return false;
      }

      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach(e => {
          errorMessages[e.path] = e.message;
        });
        formRef.current.setErrors(errorMessages);
      }

      return false;
    }
  }

  async function handleSubmit(data, { reset }) {
    setLoading(true);
    if (!(await validationFields(data))) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.post(`/matche_confirmation/${idMatche}`, {
        paquito: {
          ...data,
          position_id,
          email: data.email.toLowerCase(),
        },
        user_id: idUser,
      });

      const {
        confirmation,
        id,
        user: { url, name, position },
      } = response.data;

      const newConfirmation = {
        confirmation,
        id,
        position: position.name,
        package_name: 'PAQUITO',
        name,
        url,
        guest: idUser,
      };

      cb(newConfirmation);
      reset();

      formRef.current.setErrors({});
      onClose(false);
    } catch (err) {
      if (err.response) {
        Alert.alert('Ação não autorizada', err.response.data.message);
      } else {
        Alert.alert('Erro', 'Verifique sua conexão com a internet!');
      }
    }
    setLoading(false);
  }

  function closeModal() {
    if (!loading) {
      onClose(false);
    }
  }

  const focusEmailInput = useCallback(() => {
    const emailInput = formRef.current.getFieldRef('email');
    emailInput.focus();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modal}
      onRequestClose={closeModal}
    >
      <Container>
        <Content>
          <Header onPress={closeModal}>
            <HeaderTitle>ADICIONAR PAQUITo</HeaderTitle>
            <IconClose />
          </Header>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormContent>
              <Input
                label="Nome"
                name="name"
                placeholder="Nome do convidado"
                autoCapitalize="words"
                onSubmitEditing={focusEmailInput}
                returnKeyType="next"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="Email do convidado"
                keyboardType="email-address"
                autoCorret={false}
                autoCapitalize="none"
                returnKeyType="next"
              />

              {positions && (
                <PickerOptions
                  isSelectSingle
                  style={{
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    marginTop: 15,
                  }}
                  colorTheme="#000"
                  popupTitle="Selecione a posição do jogador!"
                  cancelButtonText="Cancelar"
                  selectButtonText="Selecionar"
                  title="Posição do jogador"
                  data={positions}
                  onSelect={value => setPositionId(value[0])}
                  onRemoveItem={value => setPositionId(value[0])}
                  buttonTextStyle={{ textTransform: 'capitalize' }}
                  showSearchBox={false}
                />
              )}

              <Button
                title="Adicionar"
                loading={loading}
                disabled={loading}
                onSubmit={() => formRef.current.submitForm()}
              />
            </FormContent>
          </Form>
        </Content>
      </Container>
    </Modal>
  );
}

ModalGuest.propTypes = {
  onClose: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  idMatche: PropTypes.number.isRequired,
  idUser: PropTypes.number.isRequired,
  cb: PropTypes.func,
};

ModalGuest.defaultProps = {
  cb: () => {},
};
