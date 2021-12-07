import React from 'react';
import { ViewProps } from 'react-native';

import ActionButton from './ActionButton';
import { ContainerAttachments, Divider } from './styles';

interface ISelectAttachmentsProps extends ViewProps {
  callbackSelectImageLibrary(): void;
  callbackSelectImageCamera(): void;
  callbackSelectDocument(): void;
}

const SelectAttachments: React.FC<ISelectAttachmentsProps> = ({
  callbackSelectImageCamera,
  callbackSelectImageLibrary,
  callbackSelectDocument,
  ...rest
}) => {
  return (
    <>
      <ContainerAttachments {...rest}>
        <ActionButton icon="camera" onPress={callbackSelectImageCamera}>
          Câmera
        </ActionButton>
        <Divider />
        <ActionButton icon="image" onPress={callbackSelectImageLibrary}>
          Galeria
        </ActionButton>
        <Divider />
        <ActionButton icon="file-pdf-o" onPress={callbackSelectDocument}>
          Documento
        </ActionButton>
      </ContainerAttachments>
    </>
  );
};

export default SelectAttachments;
