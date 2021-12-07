import { Alert, Platform } from 'react-native';
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import ImageResizer, {
  Response as ResponseIR,
} from 'react-native-image-resizer';

const options = {
  title: 'Selecionar foto',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const maxFileSize = 10000000;

const resizeImage = (
  image: ImagePickerResponse,
  rotation = 0,
): Promise<ImagePickerResponse> =>
  new Promise((resolve) => {
    ImageResizer.createResizedImage(image.uri, 1300, 800, 'JPEG', 100, rotation)
      .then(({ uri, width, height, size }: ResponseIR) => {
        resolve({
          ...image,
          uri,
          width,
          height,
          fileSize: size || image.fileSize,
        });
      })
      .catch((err) => {
        return Alert.alert(
          'Unable to resize the photo',
          `Check the console for full the error message ${err}`,
        );
      });
  });

async function selectImageLibrary(): Promise<ImagePickerResponse | null> {
  const imageSelected = (): Promise<ImagePickerResponse | null> =>
    new Promise((resolve) => {
      ImagePicker.launchImageLibrary(options, (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          resolve(response);
        }
        resolve(null);
      });
    });

  const image = await imageSelected();
  if (!image) return null;

  const imageResized = await resizeImage(image);

  if (imageResized.fileSize > maxFileSize) {
    Alert.alert(
      'Limite maximo excedido!',
      'Limite máximo permitido para envio é de 10MB',
    );
    return null;
  }

  return imageResized;
}

async function selectImageCamera(): Promise<ImagePickerResponse | null> {
  const imageSelected = (): Promise<ImagePickerResponse | null> =>
    new Promise((resolve) => {
      ImagePicker.launchCamera(options, (response) => {
        // console.log('Response = ', response);

        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          resolve(response);
        }
        resolve(null);
      });
    });

  const image = await imageSelected();
  if (!image) return null;

  const rotation = Platform.OS === 'ios' ? 0 : 90;

  const imageResized = await resizeImage(image, rotation);

  if (imageResized.fileSize > maxFileSize) {
    Alert.alert(
      'Limite maximo excedido!',
      'Limite máximo permitido para envio é de 10MB',
    );
    return null;
  }

  return imageResized;
}

export { selectImageLibrary, selectImageCamera };
