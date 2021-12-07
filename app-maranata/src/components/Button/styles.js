import styled, { css } from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 44px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || '70%'};
  align-self: center;
  border-radius: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};

  ${({ danger }) =>
    danger &&
    css`
      background-color: ${({ theme }) => theme.colors.danger};
    `}

  ${({ outline }) =>
    outline &&
    css`
      background-color: ${({ theme }) => theme.colors.transparent};
      border-width: 1px;
      border-color: ${({ theme }) => theme.colors.primary};
    `}
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  ${({ outline }) =>
    outline &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}
`;
