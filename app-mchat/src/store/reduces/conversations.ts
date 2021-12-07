import { IConversation, IMessage, IChatMessage } from '@dtos/ConversationsDTO';
import produce from 'immer';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ConversationsTypes {
  UpdateMessages = 'UPDATE_MESSAGES',
  UpdateProgressFile = 'UPDATE_PROGRESS_FILE',
  EndConversation = 'END_CONVERSATION',
}

type IActionsPayload = {
  [ConversationsTypes.UpdateMessages]: {
    chatId: string;
    message: IChatMessage;
  };
  [ConversationsTypes.UpdateProgressFile]: {
    chatId: string;
    messageId: string;
    message: IMessage;
  };
  [ConversationsTypes.EndConversation]: {
    chatId: string;
  };
};

export type IConversationsActions = ActionMap<IActionsPayload>[keyof ActionMap<
  IActionsPayload
>];

export type IConversationsState = Array<IConversation>;

export default (
  state: IConversationsState,
  action: IConversationsActions,
): IConversationsState => {
  switch (action.type) {
    case ConversationsTypes.UpdateMessages:
      return produce(state, (draft) => {
        const { chatId, message } = action.payload;

        const chatIndex = draft.findIndex((chat) => chat.id === chatId);
        if (chatIndex < 0) return;

        draft[chatIndex].chat.push(message);
      });
    case ConversationsTypes.UpdateProgressFile:
      return produce(state, (draft) => {
        const { chatId, messageId, message } = action.payload;
        const chatIndex = draft.findIndex((chat) => chat.id === chatId);
        if (chatIndex < 0) return;

        const messageFind = draft[chatIndex].chat.findIndex(
          (msg) => msg.id === messageId,
        );

        if (messageFind < 0) return;

        const msg = Object.assign(
          draft[chatIndex].chat[messageFind].message,
          message,
        );

        draft[chatIndex].chat[messageFind].message = msg;
      });
    case ConversationsTypes.EndConversation:
      return produce(state, (draft) => {
        const { chatId } = action.payload;
        const chatIndex = draft.findIndex((chat) => chat.id === chatId);
        if (chatIndex < 0) return;

        draft[chatIndex].status = 'FINISHED';
      });
    default:
      throw new Error();
  }
};
