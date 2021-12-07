import { TouchableOpacityProps } from 'react-native';
import AdIcon from 'react-native-vector-icons/AntDesign';
import FaIcon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

interface IMessageProps {
  toMe: boolean;
}

export const Container = styled.View<IMessageProps>`
  align-self: stretch;
  flex-direction: ${({ toMe }) => (!toMe ? 'row-reverse' : 'row')};
`;

export const IconStaus = styled(AdIcon)`
  font-size: 18px;
  align-self: center;
  margin: 0 10px;
`;

export const ContainerMessage = styled.View<IMessageProps>`
  background: ${({ theme, toMe }) => (!toMe ? '#FCF2F8' : theme.colors.white)};
  border-radius: 5px;
  min-height: 45px;
  max-width: 70%;
  margin: 5px 0;

  padding: 5px 10px;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;

  align-self: ${({ toMe }) => (!toMe ? 'flex-end' : 'flex-start')};
`;

export const Message = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Hour = styled.Text`
  text-align: right;
  margin-top: 2px;
  margin-left: auto;
  font-size: 10px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const ContainerMessageImage = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<IMessageProps>`
  background: ${({ theme, toMe }) => (!toMe ? '#FCF2F8' : theme.colors.white)};
  border-radius: 5px;
  margin: 5px 0;
  max-width: 70%;
  width: 95%;
  padding-bottom: 5px;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;

  align-self: ${({ toMe }) => (!toMe ? 'flex-end' : 'flex-start')};
`;

export const Photo = styled.Image`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 170px;
  width: 100%;
  margin-bottom: 2px;
`;

export const ContainerMessageDocument = styled.TouchableOpacity.attrs<
  TouchableOpacityProps
>({
  activeOpacity: 0.8,
})<IMessageProps>`
  background: ${({ theme, toMe }) => (!toMe ? '#FCF2F8' : theme.colors.white)};
  border-radius: 5px;
  margin: 5px 0;

  max-width: 70%;
  padding: 10px 10px 5px;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;

  align-self: ${({ toMe }) => (!toMe ? 'flex-end' : 'flex-start')};

  justify-content: center;
`;

export const IconDocument = styled(FaIcon)`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-right: 10px;
  width: 25px;
`;

export const InformationDocumentContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
