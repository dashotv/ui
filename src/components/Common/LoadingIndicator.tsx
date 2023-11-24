import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import styled from 'styled-components';

export const LoadingIndicator = () => (
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

export const Wrapper = styled.div`
  margin: 2em auto;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 1000;
`;
