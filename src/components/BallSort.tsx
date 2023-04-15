import React, { useEffect } from 'react';
import styled from 'styled-components';
import Ball from 'components/atoms/Ball';
import { toast } from 'react-hot-toast';

type Stage = number[][];
const sampleStage: Stage = [
  [],
  [],
  [1, 2, 3, 0],
  [2, 3, 1, 0],
  [1, 1, 2, 3],
  [2, 0, 0, 3],
];

const MaxBallStackLength = 4;

const verifyStage = (stage: Stage) => {
  if (stage.some((ballStack) => ballStack.length > MaxBallStackLength)) {
    toast.error('ball stack overflowed');
    return false;
  }

  const emptyStackCnt = stage.filter(
    (ballStack) => ballStack.length === 0
  ).length;

  // 빈 스택이 2개 이상 있어야 함
  if (emptyStackCnt < 2) {
    toast.error('emptyStackCnt is not 2');
    return false;
  }

  // 볼에 할당 가능한 최대 번호
  const maxBallNumber = stage.length - emptyStackCnt - 1;

  const balls = stage.flatMap((ballStack) => ballStack);

  // 볼 번호 유효성 확인
  if (balls.some((ball) => ball > maxBallNumber || ball < 0)) {
    toast.error('invalid ballNumber found');
    return false;
  }

  // 볼이 MaxBallStackLength개 씩 있는지 확인
  if (
    !Array.from({ length: maxBallNumber }).some((_, ballNum) => {
      const foo =
        balls.filter((ball) => ball === ballNum).length !== maxBallNumber;
      return balls.filter((ball) => ball === ballNum).length !== maxBallNumber;
    })
  ) {
    toast.error(`ball contained more or less than ${MaxBallStackLength}`);
    return false;
  }

  toast.success('Stage verified');
  return true;
};

const BallStackLayout = styled.div`
  background: #999292;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BallStackList = styled.div`
  background: #999292;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 60px 20px;
  padding: 40px;
  justify-content: center;
`;

const BallStack = styled.div`
  background: white;
  border-top: 0;
  display: flex;
  flex-direction: column-reverse;
  width: 40px;
  text-align: center;
  gap: 10px;
  border-radius: 0 0 10px 10px;
  border: 3px solid black;
  border-top: 0;
  padding: 3px;
  cursor: pointer;
`;

const BallSort = () => {
  useEffect(() => {
    verifyStage(sampleStage);
  }, []);
  return (
    <BallStackList>
      {sampleStage.map((ballStack) => (
        <BallStack>
          {ballStack.map((ball, idx) => (
            <Ball key={ball.toString() + idx} ball={ball}></Ball>
          ))}
        </BallStack>
      ))}
    </BallStackList>
  );
};

export default BallSort;
