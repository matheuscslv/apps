import styled from 'styled-components/native';

export const Icon = styled.ImageBackground`
  height: 30px;
  width: 30px;
`;

export const Tooltip = styled.View`
  position: absolute;
  right: 20px;
  bottom: 10px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(255, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const TooltipText = styled.Text`
  font-weight: bold;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.white};
`;
