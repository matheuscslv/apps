import RNFetchBlob from 'rn-fetch-blob';

interface IResponsePDF {
  contentType: string;
  path: string;
}

interface IDownloadPDFProps {
  name: string;
  url: string;
  onProgess(progress: number): void;
  onFailure(): void;
  onSuccess(data: IResponsePDF): void;
}

export default async (data: IDownloadPDFProps): Promise<void> => {
  const { name, url, onFailure, onProgess, onSuccess } = data;

  try {
    const { dirs } = RNFetchBlob.fs;
    const file = await RNFetchBlob.config({
      path: `${dirs.DownloadDir}/${name}`,
    })
      .fetch('GET', url)
      .progress((received, total) => {
        const progress = Math.round((received / total) * 100);
        onProgess(progress);
      });

    const path = `file://${file.path()}`;
    const { headers } = file.info();
    const contentType = headers['Content-Type'];
    onSuccess({
      contentType,
      path,
    });
  } catch {
    onFailure();
  }
};
