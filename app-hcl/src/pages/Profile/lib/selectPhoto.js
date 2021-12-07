import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

const resizeImage = image =>
  new Promise((resolve, reject) => {
    ImageResizer.createResizedImage(image.uri, 300, 300, 'JPEG', 100)
      .then(({ uri }) => {
        resolve(uri);
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to resize the photo',
          'Check the console for full the error message'
        );
      });
  });

async function selectImage() {
  const options = {
    title: 'Selecione Foto de Perfil',
    takePhotoButtonTitle: 'Tirar Foto',
    chooseFromLibraryButtonTitle: 'Selecionar da Galeria',
    cancelButtonTitle: 'Cancelar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const response = () =>
    new Promise(resolve => {
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          // resolve(null);
        } else if (response.error) {
          // resolve(null);
        } else if (response.customButton) {
          //
        } else {
          resolve(response);
        }
        resolve(null);
      });
    });

  const image = await response();
  if (!image) return null;
  const imageResized = await resizeImage(image);

  return imageResized;
}

export default selectImage;
