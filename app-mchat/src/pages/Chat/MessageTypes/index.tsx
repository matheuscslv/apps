import React, { memo, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

import { IChatMessage } from '@dtos/ConversationsDTO';
import OpenImageFile from '@libs/OpenImageFile';
import OpenPDFFile from '@libs/OpenPDFFile';
import { useTheme } from 'styled-components';

import {
  Container,
  IconStaus,
  ContainerMessage,
  Message,
  Hour,
  ContainerMessageImage,
  Photo,
  ContainerMessageDocument,
  InformationDocumentContainer,
  IconDocument,
} from './styles';

interface IMessageTypesProps {
  message: IChatMessage;
}

const MessageTypes: React.FC<IMessageTypesProps> = ({ message }) => {
  const { colors } = useTheme();

  const { message: msg, messageType, formattedHour, fromMe } = message;

  const transferred = useMemo(
    () =>
      (msg.path && msg.progress === 100) ||
      (messageType === 'text' && msg.progress === 100),
    [messageType, msg.path, msg.progress],
  );

  const handleOpenFile = useCallback(async () => {
    if (!transferred) {
      const titleError = fromMe
        ? 'Não foi possivel abrir o arquivo'
        : 'Verifique sua conexão';

      Alert.alert(titleError, 'Arquivo não foi transferido corretamente.');
      return;
    }

    if (msg.path && msg.typeFile === 'pdf') {
      const pathPDF = msg.path;
      OpenPDFFile(pathPDF);
    }
    if (msg.path && messageType === 'image') {
      await OpenImageFile(msg.path, msg.type);
    }
  }, [fromMe, messageType, msg.path, msg.type, msg.typeFile, transferred]);

  if (messageType === 'text') {
    return (
      <Container toMe={fromMe}>
        <ContainerMessage toMe={fromMe}>
          <Message>{msg.text}</Message>
          <Hour>{formattedHour}</Hour>
        </ContainerMessage>
        {transferred ? (
          <IconStaus color={colors.success} name="checkcircle" />
        ) : (
          <IconStaus color={colors.danger} name="closecircle" />
        )}
      </Container>
    );
  }

  return (
    <Container toMe={fromMe}>
      {msg.typeFile !== 'pdf' && msg.path ? (
        <ContainerMessageImage toMe={fromMe} onPress={handleOpenFile}>
          <Photo
            source={{
              uri: msg.path,
            }}
          />
          <Hour style={{ marginRight: 10 }}>{formattedHour}</Hour>
        </ContainerMessageImage>
      ) : (
        <ContainerMessageDocument toMe={fromMe} onPress={handleOpenFile}>
          <InformationDocumentContainer>
            <IconDocument
              name={msg.typeFile !== 'pdf' ? 'file-image-o' : 'file-pdf-o'}
            />
            <Message numberOfLines={1} style={{ paddingRight: 40 }}>
              {msg.name}
            </Message>
          </InformationDocumentContainer>
          <Hour>{formattedHour}</Hour>
        </ContainerMessageDocument>
      )}
      {transferred ? (
        <IconStaus color={colors.success} name="checkcircle" />
      ) : (
        <IconStaus color={colors.danger} name="closecircle" />
      )}

      {msg.progress && msg.progress >= 0 && msg.progress < 100 && (
        <ProgressCircle
          percent={msg.progress || 0}
          radius={9}
          borderWidth={3}
          color={colors.success}
          shadowColor="#999"
          bgColor="#fff"
          outerCircleStyle={{
            alignSelf: 'center',
            marginHorizontal: 10,
          }}
        />
      )}
    </Container>
  );
};

export default memo(MessageTypes);
