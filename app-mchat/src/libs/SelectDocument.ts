import { Alert } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

export interface IDocumentPickerResponse extends DocumentPickerResponse {
  content?: string;
  extension: 'pdf' | 'image';
}

export default async (): Promise<undefined | IDocumentPickerResponse> => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    });

    if (Number(res.size) >= 10000000) {
      Alert.alert(
        'Limite maximo excedido!',
        'Limite máximo permitido para envio é de 10MB',
      );

      throw new Error('Limite máximo permitido para envio é de 10MB');
    }

    const extension = res.type.includes('pdf') ? 'pdf' : 'image';

    return { ...res, extension };
  } catch (err) {
    return undefined;
  }
};
