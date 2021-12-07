import React from 'react';

export const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}

function navigateReset(name) {
  navigationRef.current.reset({
    index: 0,
    routes: [{ name }],
  });
}

function goBack() {
  navigationRef.current.goBack();
}

export default {
  navigate,
  navigateReset,
  goBack,
};
