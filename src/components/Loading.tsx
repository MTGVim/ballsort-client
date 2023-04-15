import useSpinner from 'hooks/useSpinner';
import React from 'react';
import styled from 'styled-components';

const SpinnerLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  const { Spinner, register } = useSpinner(true);
  return (
    <SpinnerLayout>
      <Spinner {...register}></Spinner>
    </SpinnerLayout>
  );
};

export default Loading;
