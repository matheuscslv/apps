import styled from 'styled-components/native';

export const ContainerAttachments = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};
  margin: 0 10px;
  padding: 20px;

  align-items: center;
  justify-content: space-around;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const Divider = styled.View`
  width: 0.5px;
  height: 80%;
  background: ${({ theme }) => theme.colors.regular};
`;
