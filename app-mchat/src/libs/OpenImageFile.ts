import { Platform, Linking } from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

export default async function OpenPDFFile(
  path: string,
  type: string | undefined,
): Promise<void> {
  const platform = Platform.OS;
  const { android } = RNFetchBlob;
  const mime = type || 'image/png';
  if (platform === 'android') {
    const formattedPath = path.split('file://')[1];
    android.actionViewIntent(formattedPath, mime);
  } else {
    try {
      await Linking.openURL(`photos-redirect://mChat`);
    } catch (e) {
      console.log('canceled ', e);
    }
  }
}

// 0245
