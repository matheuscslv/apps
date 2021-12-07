import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useReducer,
  Reducer,
} from 'react';
import UUIDGenerator from 'react-native-uuid-generator';

import { IChatMessage, IConversation, IMessage } from '@dtos/ConversationsDTO';
import DownloadImage from '@libs/DownloadImage';
import DownloadPDF from '@libs/DownloadPDF';
import ConversationsReducer, {
  ConversationsTypes,
  IConversationsActions,
  IConversationsState,
} from '@reduces/conversations';
import { format } from 'date-fns';

interface ISendMessage {
  idUser: string;
  messageType: 'text' | 'document' | 'image';
  message: IMessage;
}

interface IReceivedMessage {
  idUser: string;
  hour: Date;
  messageType: 'text' | 'document' | 'image';
  message: IMessage;
}

interface IConversationsData {
  conversations: IConversation[];
  loading: boolean;
  sendMessage(data: ISendMessage): Promise<void>;
  receivedMessage(data: IReceivedMessage): Promise<void>;
  endConversation(idUser: string): Promise<void>;
}

const example: IConversation = {
  name: 'Manoel',
  id: '1234',
  new: 0,
  status: 'InATTENDANCE',
  chat: [
    {
      hour: new Date(),
      formattedHour: '12:01',
      id: '1',
      fromMe: true,
      messageType: 'text',
      message: {
        text: 'Olá',
        progress: 100,
      },
    },
    {
      fromMe: false,
      id: '2',
      hour: new Date(),
      messageType: 'document',
      formattedHour: '12:02',
      message: {
        name: 'algum pdf.pdf',
        content: 'sasasdasdsad==',
        type: 'appication/pdf',
        typeFile: 'pdf',
        url: 'http://algum.lugar.na.internet',
        progress: 100,
      },
    },
  ],
};

const ConversationsContext = createContext<IConversationsData>(
  {} as IConversationsData,
);

export const ConversationsProvider: React.FC = ({ children }) => {
  const [conversations, dispatch] = useReducer<
    Reducer<IConversationsState, IConversationsActions>
  >(ConversationsReducer, [example]);
  const [loading, setLoading] = useState(true);

  const sendMessage = useCallback(async (data: ISendMessage): Promise<void> => {
    const { idUser, message, messageType } = data;
    const hour = new Date();
    const parseHour = format(hour, 'HH:mm');
    const id = await UUIDGenerator.getRandomUUID();

    const newMessage: IChatMessage = {
      id,
      hour,
      formattedHour: parseHour,
      fromMe: false,
      messageType,
      message,
    };

    dispatch({
      type: ConversationsTypes.UpdateMessages,
      payload: { chatId: idUser, message: newMessage },
    });
  }, []);

  // useEffect(() => {
  //   console.log(conversations[0].chat.length);
  // }, [conversations]);

  const receivedMessage = useCallback(async (data: IReceivedMessage): Promise<
    void
  > => {
    const { idUser, message, messageType, hour } = data;
    const parseHour = format(hour, 'HH:mm');
    const id = await UUIDGenerator.getRandomUUID();
    const name = message.name || `${id}-${parseHour}`;
    const newMessage: IChatMessage = {
      id,
      hour,
      formattedHour: parseHour,
      fromMe: true,
      messageType,
      message: {
        ...message,
        name,
        progress: messageType === 'text' ? 100 : 1,
      },
    };

    dispatch({
      type: ConversationsTypes.UpdateMessages,
      payload: { chatId: idUser, message: newMessage },
    });

    if (messageType === 'image' && message.url) {
      await DownloadImage({
        name,
        url: message.url,
        onFailure: () => {
          dispatch({
            type: ConversationsTypes.UpdateProgressFile,
            payload: {
              messageId: id,
              chatId: idUser,
              message: {
                progress: -1,
              },
            },
          });
        },
        onProgess: (progress) => {
          dispatch({
            type: ConversationsTypes.UpdateProgressFile,
            payload: {
              messageId: id,
              chatId: idUser,
              message: {
                progress,
              },
            },
          });
        },
        onSuccess: ({ contentType, path }) => {
          dispatch({
            type: ConversationsTypes.UpdateProgressFile,
            payload: {
              messageId: id,
              chatId: idUser,
              message: {
                progress: 100,
                type: contentType,
                path,
              },
            },
          });
        },
      });
    }

    if (messageType === 'document' && message.url) {
      await DownloadPDF({
        name: `${name}.pdf`,
        url: message.url,
        onFailure: () => {
          dispatch({
            type: ConversationsTypes.UpdateProgressFile,
            payload: {
              messageId: id,
              chatId: idUser,
              message: {
                progress: -1,
              },
            },
          });
        },
        onProgess: (progress) => {
          dispatch({
            type: ConversationsTypes.UpdateProgressFile,
            payload: {
              messageId: id,
              chatId: idUser,
              message: {
                progress,
              },
            },
          });
        },
        onSuccess: ({ contentType, path }) => {
          dispatch({
            type: ConversationsTypes.UpdateProgressFile,
            payload: {
              messageId: id,
              chatId: idUser,
              message: {
                progress: 100,
                type: contentType,
                path,
              },
            },
          });
        },
      });
    }
  }, []);

  const endConversation = useCallback(async (idUser: string): Promise<void> => {
    dispatch({
      type: ConversationsTypes.EndConversation,
      payload: {
        chatId: idUser,
      },
    });
  }, []);

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        loading,
        sendMessage,
        receivedMessage,
        endConversation,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export function useConversations(): IConversationsData {
  const context = useContext(ConversationsContext);

  return context;
}
