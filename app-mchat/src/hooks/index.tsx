import React from 'react';

import { AuthProvider } from './auth';
import { ConversationsProvider } from './conversations';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ConversationsProvider>{children}</ConversationsProvider>
    </AuthProvider>
  );
};

export default AppProvider;
