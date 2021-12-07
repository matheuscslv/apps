import React, {useState} from 'react';
import {Modal} from 'react-native';

import {
  Container,
  ContainerModal,
  ViewModal,
  TitleModal,
  Option,
  OptionText,
} from './styles';

export default function DowpDown({data, setData, visible, setVisible}) {
  function onSelect(id) {
    setData({...data, selected: id});
    setVisible(false);
  }

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <ContainerModal>
        <ViewModal>
          <TitleModal>Escolha</TitleModal>
          {data.options.map(({id, name}) => (
            <Option key={id} onPress={() => onSelect({id, name})}>
              <OptionText> + {name}</OptionText>
            </Option>
          ))}
        </ViewModal>
      </ContainerModal>
    </Modal>
  );
}
