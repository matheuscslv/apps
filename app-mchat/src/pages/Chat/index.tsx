import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FlatList, Keyboard, KeyboardEvent, Alert } from 'react-native';

import { IChatMessage } from '@dtos/ConversationsDTO';
import { useConversations } from '@hooks/conversations';
import { useNavigation } from '@react-navigation/native';
import {
  HeaderBackButton,
  StackHeaderLeftButtonProps,
  StackScreenProps,
} from '@react-navigation/stack';

import BottomInput from './BottomInput';
import MessageTypes from './MessageTypes';
import { Container } from './styles';

type RootStackParamList = {
  Chat: { chatId: string };
};

type ChatStackScreenProps = StackScreenProps<RootStackParamList, 'Chat'>;

const Chat: React.FC<ChatStackScreenProps> = ({ route }) => {
  const { chatId } = route.params;
  const navigation = useNavigation();
  const {
    conversations,
    receivedMessage,
    endConversation,
  } = useConversations();
  const chat = conversations.find((conversation) => conversation.id === chatId);
  const refFlatList = useRef<FlatList>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    function onKeyboardDidShow(e: KeyboardEvent): void {
      setKeyboardHeight(e.endCoordinates.height);
    }

    function onKeyboardDidHide(): void {
      setKeyboardHeight(0);
    }

    function navigateToHome(): void {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }

    function handleCloseConversationConfirmation(): void {
      Alert.alert(
        'Atenção',
        'Deseja mesmo finalizar este atendimento?',
        [
          {
            text: 'Não',
          },
          {
            text: 'Sim',
            onPress: async () => {
              await endConversation(chatId);
              navigation.goBack();
            },
          },
        ],
        { cancelable: false },
      );
    }

    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    navigation.setParams({
      closeConversation: handleCloseConversationConfirmation,
    });

    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => (
        <HeaderBackButton {...props} onPress={navigateToHome} />
      ),
    });
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, [chatId, endConversation, navigation]);

  useEffect(() => {
    async function getMessages(): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await receivedMessage({
        hour: new Date(),
        idUser: chatId,
        messageType: 'text',
        message: {
          text: 'Oláá',
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 6000));
      receivedMessage({
        hour: new Date(),
        idUser: chatId,
        messageType: 'document',
        message: {
          name: 'exemplo-de-pdf.pdf',
          type: 'application/pdf',
          typeFile: 'pdf',
          url: 'http://nematoides.com.br/Content/Fotos/exemplo-de-pdf.pdf',
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      receivedMessage({
        hour: new Date(),
        idUser: chatId,
        messageType: 'image',
        message: {
          name: 'imagem_do_usuário',
          typeFile: 'image',
          url:
            'https://www.newsrondonia.com.br/imagensNoticias/image/IMAGEM].jpg',
        },
      });
    }

    getMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToEnd = useCallback(() => {
    refFlatList.current?.scrollToEnd({ animated: true });
  }, [refFlatList]);

  return (
    <Container keyboardHeight={keyboardHeight}>
      <FlatList<IChatMessage>
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 15,
          paddingBottom: 15,
          justifyContent: 'flex-end',
          flexGrow: 1,
        }}
        renderItem={({ item }) => <MessageTypes message={item} />}
        data={chat?.chat}
        keyExtractor={(item) => String(item.id)}
        ref={refFlatList}
        onContentSizeChange={scrollToEnd}
        onLayout={scrollToEnd}
      />

      <BottomInput idUser={chatId} />
    </Container>
  );
};

export default Chat;
