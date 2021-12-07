export interface IMessageText {
  text: string;
}

export interface IMessageImage {
  name: string;
  content: string;
  path: string;
  url?: string;
}

export interface IMessageDocument {
  name: string;
  content?: string;
  type: string;
  typeFile: 'image' | 'pdf';
  path: string;
  url?: string;
}

export interface IMessage {
  text?: string;
  name?: string;
  content?: string | undefined;
  type?: string;
  typeFile?: 'image' | 'pdf';
  path?: string;
  url?: string;
  transferred?: boolean;
  progress?: number;
}

export interface IChatMessage {
  id: string;
  hour: Date;
  formattedHour?: string;
  fromMe: boolean;
  messageType: 'text' | 'document' | 'image';
  message: IMessage;
}

export interface IConversation {
  id: string;
  name: string;
  status: 'InATTENDANCE' | 'InHOLD' | 'FINISHED';
  new: number;
  chat: IChatMessage[];
}
