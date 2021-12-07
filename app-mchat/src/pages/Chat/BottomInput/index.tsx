import React, { useState, useCallback, memo } from 'react';
import { TextInputProps } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';

import SelectAttachments from '@components/SelectAttachments';
import {
  IMessageDocument,
  IMessageImage,
  IMessageText,
} from '@dtos/ConversationsDTO';
import { useConversations } from '@hooks/conversations';
import SelectDocument from '@libs/SelectDocument';
import { selectImageCamera, selectImageLibrary } from '@libs/SelectPhoto';
import { useTheme } from 'styled-components';

import {
  ContentInput,
  Input,
  Button,
  Icon,
  ButtonPlus,
  IconPlus,
} from './styles';

interface IBottomInputProps extends TextInputProps {
  idUser: string;
}

const BottomInput: React.FC<IBottomInputProps> = ({ idUser, ...rest }) => {
  const { colors } = useTheme();
  const { sendMessage } = useConversations();
  const [message, setMessage] = useState('');
  const [modalAttachments, setModalAttachments] = useState(false);

  const closeModalAttachments = useCallback(() => {
    setModalAttachments(false);
  }, []);

  const handleSendMessage = useCallback(async () => {
    const newMessage: IMessageText = {
      text: message.trim(),
    };

    await sendMessage({
      idUser,
      messageType: 'text',
      message: newMessage,
    });
    setMessage('');
  }, [idUser, message, sendMessage]);

  const handleSendImage = useCallback(
    async (type = 'CAMERA' || 'LIBRARY') => {
      const methodImage =
        type === 'CAMERA' ? selectImageCamera : selectImageLibrary;

      const image = await methodImage();

      if (!image) {
        closeModalAttachments();
        return;
      }

      const newMessage: IMessageImage = {
        content: image.data,
        name: image.fileName || 'imagem',
        path: image.uri,
        url: image.uri,
      };

      await sendMessage({
        idUser,
        messageType: 'image',
        message: newMessage,
      });
    },
    [closeModalAttachments, idUser, sendMessage],
  );

  const handleSendDocument = useCallback(async () => {
    const document = await SelectDocument();

    if (!document) {
      closeModalAttachments();
      return;
    }
    const newMessage: IMessageDocument = {
      name: document.name,
      path: document.uri,
      url: document.uri,
      type: document.type,
      typeFile: document.extension,
    };

    await sendMessage({
      idUser,
      messageType: 'document',
      message: newMessage,
    });
  }, [closeModalAttachments, idUser, sendMessage]);

  return (
    <>
      <ContentInput>
        <ButtonPlus onPress={() => setModalAttachments(true)}>
          <IconPlus />
        </ButtonPlus>
        <Input
          multiline
          placeholder="Digite sua mensagem"
          placeholderTextColor={colors.darkTransparent}
          returnKeyType="next"
          onChangeText={setMessage}
          value={message}
          textAlignVertical="center"
          {...rest}
        />
        <Button onPress={handleSendMessage}>
          <Icon />
        </Button>
      </ContentInput>
      <Modal
        isVisible={modalAttachments}
        onBackButtonPress={closeModalAttachments}
        onBackdropPress={closeModalAttachments}
        backdropColor={colors.transparent}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
          marginBottom: 70 + getBottomSpace(),
        }}
      >
        <SelectAttachments
          callbackSelectImageCamera={() => handleSendImage('CAMERA')}
          callbackSelectImageLibrary={() => handleSendImage('LIBRARY')}
          callbackSelectDocument={handleSendDocument}
        />
      </Modal>
    </>
  );
};

export default memo(BottomInput);
