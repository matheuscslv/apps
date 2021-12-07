import styled from 'styled-components/native';

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: 14px;
  margin-bottom: 5px;
`;

export const SampleInput = styled.TextInput.attrs(({ editable }) => ({
  placeholderTextColor: editable ? '#555' : '#777',
}))`
  border-bottom-width: 0.5px;
  border-bottom-color: ${({ editable, theme }) =>
    editable ? theme.colors.black : theme.colors.subtitle};
  background: #f0f0f0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 40px;
  padding: 0 15px;
  color: ${({ editable, theme }) =>
    editable ? theme.colors.black : theme.colors.subtitle};
  margin-bottom: 10px;
`;

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  font-weight: normal;
`;

export const Info = styled.Text`
  font-size: 10px;
`;
