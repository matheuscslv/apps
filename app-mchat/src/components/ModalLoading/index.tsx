import React from 'react';
import { ViewProps } from 'react-native';
import Modal from 'react-native-modal';

import { Content, Loading, Title } from './styles';

interface IModalLoadingProps extends ViewProps {
  loading: boolean;
  title?: string;
}

const ModalLoading: React.FC<IModalLoadingProps> = ({
  loading,
  title,
  ...rest
}) => {
  return (
    <Modal isVisible={loading}>
      <Content {...rest}>
        <Loading animating={loading} size={18} />
        <Title numberOfLines={1}>{title}</Title>
      </Content>
    </Modal>
  );
};

export default ModalLoading;
