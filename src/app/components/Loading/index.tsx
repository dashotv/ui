import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import Wrapper from './Wrapper';

const LoadingIndicator = () => (
  <Wrapper>
    <ThreeDots
      height="120"
      width="120"
      radius="9"
      color="white"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  </Wrapper>
);

export default LoadingIndicator;
