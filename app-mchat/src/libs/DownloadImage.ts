import { Platform } from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

interface IResponseImage {
  contentType: string;
  path: string;
}

interface IDownloadImageProps {
  name: string;
  url: string;
  onProgess(progress: number): void;
  onFailure(): void;
  onSuccess(data: IResponseImage): void;
}

export default async (data: IDownloadImageProps): Promise<void> => {
  const { name, url, onFailure, onProgess, onSuccess } = data;

  try {
    const { dirs } = RNFetchBlob.fs;

    const RNFetchBlobConfig =
      Platform.OS === 'ios'
        ? {
            fileCache: true,
            appendExt: 'png',
          }
        : {
            appendExt: 'png',
            path: `${dirs.PictureDir}/${name}`,
          };

    const file = await RNFetchBlob.config(RNFetchBlobConfig)
      .fetch('GET', url)
      .progress((received, total) => {
        const progress = Math.round((received / total) * 100);
        onProgess(progress);
      });

    let path = `file://${file.path()}`;
    const { headers } = file.info();
    const contentType = headers['Content-Type'];

    if (Platform.OS === 'ios') {
      const pathRoll = await CameraRoll.save(path, {
        type: 'photo',
        album: 'mChat',
      });
      await RNFetchBlob.fs.unlink(path);

      path = pathRoll;
    }

    onSuccess({
      contentType,
      path,
    });
  } catch {
    onFailure();
  }
};
