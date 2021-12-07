import React, {useState, useEffect} from 'react';
import {Modal} from 'react-native';

import {
  ContainerModal,
  ViewModal,
  InputContainer,
  Buttons,
  Button,
  ButtonText,
  TitleModal,
  InputFrete,
  Error,
  SubTitle,
} from './styles';
import {colors} from '~/styles';
import store from '~/services/storage';
import DowpDown from '../DowpDown';

export default function SetEstado({}) {
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState({
    selected: null,
    options: [
      {
        id: 1,
        name: 'Macapá',
      },
      {
        id: 2,
        name: 'Santana',
      },
    ],
  });
  const [modal, setModal] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    async function getEstado() {
      const selected = await store.get('User@Estado');
      selected ? setModal(false) : setModal(true);
    }
    setInterval(getEstado, 2000);
    getEstado();
  }, []);

  async function setEstado() {
    await store.save('User@Estado', {
      id: 1,
      name: 'Macapá',
    }); //estados.selected
    setModal(false);
  }

  return (
    <>
      <Modal transparent animationType="fade" visible={modal}>
        <ContainerModal>
          <ViewModal>
            <TitleModal>Selecione o Município</TitleModal>
            <InputContainer onPress={() => setDropDown(true)}>
              <SubTitle isSelected={estados.selected}>
                {estados.selected ? estados.selected.name : 'Selecione...'}
              </SubTitle>
            </InputContainer>
            <Buttons>
              <Button onPress={setEstado}>
                <ButtonText> Avançar </ButtonText>
              </Button>
            </Buttons>
          </ViewModal>
        </ContainerModal>
      </Modal>
      <DowpDown
        data={estados}
        visible={dropDown}
        setVisible={setDropDown}
        setData={setEstados}
      />
    </>
  );
}
