import React, { memo } from 'react';
import { Image, TouchableOpacityProps } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import logo from '@assets/logo.png';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity.attrs<TouchableOpacityProps>({
  activeOpacity: 0.8,
  hitSlop: { top: 5, bottom: 5, left: 5, right: 5 },
})`
  padding-right: 15px;
`;

export const HeaderTitle: React.FC = () => <Image source={logo} />;

interface IHeaderRightButtonProps extends TouchableOpacityProps {
  icon: string;
}

const HeaderRightButtonComponent: React.FC<IHeaderRightButtonProps> = ({
  icon,
  ...rest
}) => (
  <Button {...rest}>
    <FaIcon color="#fff" size={23} name={icon} />
  </Button>
);

export const HeaderRightButton = memo(HeaderRightButtonComponent);
