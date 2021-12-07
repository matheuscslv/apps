import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { useField } from '@unform/core';
import { SampleInput, Label, Error, Info } from './styles';

function Input({ name, title, subTitle, editable, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);
  return (
    <>
      {title && (
        <Label>
          {title} {subTitle && <Info>{subTitle}</Info>}{' '}
          {error && <Error>{error}</Error>}{' '}
        </Label>
      )}
      <SampleInput
        editable={editable}
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          if (inputRef.current) {
            inputRef.current.value = value;
          }
        }}
        {...rest}
      />
    </>
  );
}

Input.defaultProps = {
  subTitle: '',
  editable: true,
};

Input.propTypes = {
  subTitle: PropTypes.string,
  editable: PropTypes.bool,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
