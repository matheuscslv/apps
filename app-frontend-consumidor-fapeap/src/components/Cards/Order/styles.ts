import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${(props) => props.theme.colors.background};
`;

export const Card = styled.View`
  padding: 10px;
  border-radius: 5px;
  border-color: #ccc;
  border-width: 1px;
  margin: 10px 20px;
`;

export const Image = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-family: 'Ubuntu-Bold';
`;

export const Subtitle = styled.Text`
  color: ${(props) => props.theme.colors.title};
  font-family: 'Ubuntu-Regular';
`;

export const ModalTextView = styled.View`
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const ModalText = styled.Text`
  font-family: Ubuntu-Bold;
  font-size: 22px;
  color: ${(props) => props.theme.colors.primary};
`;

export const ViewFList = styled.View`
  background: #ffffff;
  border: 1px solid #e3dfdf;
  padding: 10px;
  width: 350px;
  height: 135px;
  marginvertical: 8;
  marginhorizontal: 10;
  border-radius: 8px;
`;
export const BorderBottom = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;
export const ViewTouchD = styled.View`
  flex-direction: row;
  top: 20px;
  width: 50%;
  justify-content: center;
`;
export const ViewTouchR = styled.View`
  flex-direction: row;
  top: 20px;
  width: 50%;
  justify-content: center;
`;
export const CenterView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  top: 10px;
`;

export const TouchClose = styled.View`
  position: absolute;
  left: 110%
  top: 2%;
`;
export const ViewRating = styled.View`
  align-items: center;
  top: 15%;
`;
export const ButtonDetails = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;
export const ButtonRating = styled.TouchableOpacity`
  align-items: center;
  padding: 10px;
`;
export const SaveRating = styled.TouchableOpacity`
  width: 100%;
  background: ${(props) => props.theme.colors.primary};
  max-width: 350px;
  height: 30px;
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 150px;
`;
