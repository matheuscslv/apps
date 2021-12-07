import React, { useRef, useEffect, memo } from 'react';

import { useField } from '@unform/core';

import { Label, Input as InputEntry, Error } from './styles';

function Input({ name, label, value, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: '_lastNativeText',
      getValue(ref) {
        return ref._lastNativeText || '';
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        ref._lastNativeText = value;
      },
      clearValue(ref) {
        ref.setNativeProps({ text: '' });
        ref._lastNativeText = '';
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && (
        <>
          <Label>
            {label}
            {'   '}
            {error && <Error>{error}</Error>}
          </Label>
        </>
      )}

      <InputEntry ref={inputRef} defaultValue={defaultValue} {...rest} />
      {!label && error && (
        <Error
          style={{
            textAlign: 'center',
            marginTop: 5,
          }}
        >
          {error}
        </Error>
      )}
    </>
  );
}
export default memo(Input);
