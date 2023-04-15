import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { toast } from 'react-hot-toast';
import seedrandom from 'seedrandom';
import {
  BallColors,
  getPickableBallIdxs,
  getStage,
  isStageClear,
  moveMatchedBalls,
  verifyStage,
} from 'utils/gameLogic';
import { Stage } from 'types';

const BallStackList = styled.div`
  background: #999292;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 60px 20px;
  padding: 80px 40px 40px 40px;
  justify-content: center;
`;

const BallStack = styled.div<{ selected: boolean }>`
  background: white;
  border-top: 0;
  display: flex;
  flex-direction: column-reverse;
  width: 48px;
  text-align: center;
  gap: 10px;
  border-radius: 0 0 10px 10px;
  border: 4px solid ${({ selected }) => (selected ? 'pink' : 'black')};
  border-top: 0;
  padding: 4px;
  cursor: pointer;
  height: 170px;
`;

const BallInKeyframes = keyframes`
  from{transform: translateY(-15px);}
  to{transform: translateY(0);}
`;
const BallOutKeyframes = keyframes`
  from{transform: translateY(0);}
  to{transform: translateY(-15px);}
`;

const Ball = styled.div<{ ball: number; picked: boolean }>`
  background: ${({ ball }) => BallColors[ball % BallColors.length]};
  width: 100%;
  aspect-ratio: 1;
  border-radius: 100%;
  animation: ease-in 0.1s forwards
    ${({ picked }) => (picked ? BallOutKeyframes : BallInKeyframes)};
`;

const BallSort = () => {
  const [selectedStackIdx, setSelectedStackIdx] = useState<number | null>(null);
  const [stageNum, setStatgeNum] = useState<number>(0);
  const [stageState, setStageState] = useState<Stage>(getStage(stageNum));

  useEffect(() => {
    if (isStageClear(stageState)) {
      toast.success('Stage Cleared! 🎉');
      setTimeout(() => {
        setStageState(getStage(stageNum));
        setStatgeNum((prev) => prev + 1);
      }, 5e3);
    }
  }, [stageState]);

  const handleStackClick = (targetStackIdx: number) => {
    // 선택 취소
    if (selectedStackIdx === targetStackIdx) {
      return setSelectedStackIdx(null);
    }

    // 볼 삽입
    if (selectedStackIdx !== null) {
      const newState: Stage = JSON.parse(JSON.stringify(stageState));
      if (
        !moveMatchedBalls(newState[selectedStackIdx], newState[targetStackIdx])
      ) {
        toast.error('Cannot move to there');
      }
      setStageState([...newState]);
      setSelectedStackIdx(null);
      return;
    }

    // 다른 스택 선택
    setSelectedStackIdx(
      stageState[targetStackIdx].length > 0 ? targetStackIdx : null
    );
  };

  return (
    <BallStackList key={stageNum}>
      {stageState.map((ballStack, stackIdx) => {
        const isStackSelected = selectedStackIdx === stackIdx;
        return (
          <BallStack
            key={stackIdx.toString()}
            selected={isStackSelected}
            onClick={() => handleStackClick(stackIdx)}
          >
            {ballStack.map((ball, ballIdx) => {
              const ballTop = ballStack[ballStack.length - 1];
              return (
                <Ball
                  key={ball.toString() + ballIdx}
                  ball={ball}
                  picked={
                    isStackSelected &&
                    getPickableBallIdxs(ballStack).includes(ballIdx)
                  }
                />
              );
            })}
          </BallStack>
        );
      })}
    </BallStackList>
  );
};

export default BallSort;
