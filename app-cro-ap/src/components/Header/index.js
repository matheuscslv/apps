import React from 'react';

import { Top, TopText } from './styles';

const Header = ({ title }) => (
  <Top>
    <TopText>
      {title}
    </TopText>
  </Top>
);

export default Header;
