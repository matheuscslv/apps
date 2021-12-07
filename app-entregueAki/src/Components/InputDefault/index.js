import React, { forwardRef } from 'react';

import { SampleInput, InputMask, Label, Error, Info } from './styles';

const Input = forwardRef(
  (
    {
      title,
      subTitle = null,
      type = null,
      errorData = null,
      editable = true,
      ...props
    },
    ref = null
  ) => (
      <>
        {title && (
          <Label>
            {title} {subTitle && <Info>{subTitle}</Info>}{' '}
            {errorData && <Error>{errorData}</Error>}{' '}
          </Label>
        )}
        {type ? (
          <InputMask {...props} type={type} ref={ref} placeholderTextColor={'#666'} editable={editable} />
        ) : (
            <SampleInput {...props} ref={ref} placeholderTextColor={'#666'} editable={editable} />
          )}
      </>
    )
);

export default Input;
