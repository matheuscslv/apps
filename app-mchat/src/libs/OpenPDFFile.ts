import { Platform } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

export default function OpenPDFFile(path: string): void {
  const platform = Platform.OS;
  const { android, ios } = RNFetchBlob;
  if (platform === 'android') {
    const formattedPath = path.split('file://')[1];
    android.actionViewIntent(formattedPath, 'application/pdf');
  } else {
    console.log(path);
    ios.openDocument(path);
  }
}
