import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: space-between;
`;

export const Companies = styled.View.attrs({
  delay: 200,
  animation: 'fadeIn',
})`
  margin-top: -30px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const Companie = styled.View`
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.Image.attrs({})`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
`;
export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  color: #222;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #999;
  text-transform: uppercase;
`;

export const Divider = styled.View`
  background-color: #ddd;
  /* margin-top: 30px; */
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;
