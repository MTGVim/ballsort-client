import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import seedrandom from 'seedrandom';

seedrandom('tiger.yoo', { global: true });

interface IProps {
  ball: number;
}

const palletes: string[] = [];

for (let i = 0; i < 100; i++) {
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  palletes.push(color);
}

const BallShape = styled.div<{ ballNum: number }>`
  background: ${({ ballNum }) => palletes[ballNum % palletes.length]};
  width: 100%;
  aspect-ratio: 1;
  border-radius: 100%;
`;

const Ball = ({ ball }: IProps) => {
  return <BallShape ballNum={ball}></BallShape>;
};

export default Ball;
