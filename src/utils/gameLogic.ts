import seedrandom from 'seedrandom';
import { Stage } from 'types';

seedrandom('tiger.yoo', { global: true });

export const BallColors: string[] = [];

for (let i = 0; i < 100; i++) {
  let color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  BallColors.push(color);
}

export const MaxBallStackLength = 4;

export const verifyStage = (
  stage: Stage
): {
  result: boolean;
  reason?: string;
} => {
  if (stage.some((ballStack) => ballStack.length > MaxBallStackLength)) {
    return {
      result: false,
      reason: 'ball stack overflowed',
    };
  }

  const emptyStackCnt = stage.filter(
    (ballStack) => ballStack.length === 0
  ).length;

  // 빈 스택이 2개 이상 있어야 함
  if (emptyStackCnt < 2) {
    return { result: false, reason: 'emptyStackCnt is not 2' };
  }

  // 볼에 할당 가능한 최대 번호
  const maxBallNumber = stage.length - emptyStackCnt - 1;

  const balls = stage.flatMap((ballStack) => ballStack);

  // 볼 번호 유효성 확인
  if (balls.some((ball) => ball > maxBallNumber || ball < 0)) {
    return { result: false, reason: 'invalid ballNumber found' };
  }

  // 볼이 MaxBallStackLength개 씩 있는지 확인
  if (
    !Array.from({ length: maxBallNumber }).some((_, ballNum) => {
      const foo =
        balls.filter((ball) => ball === ballNum).length !== maxBallNumber;
      return balls.filter((ball) => ball === ballNum).length !== maxBallNumber;
    })
  ) {
    return {
      result: false,
      reason: `ball contained more or less than ${MaxBallStackLength}`,
    };
  }
  return { result: true };
};

/** 클리어 조건
 * 스택마다 모두 같은 색의 볼 채워져 있어야 함
 */
export function isStageClear(stageState: Stage) {
  if (
    stageState.every(
      (ballStack) =>
        ballStack.length === 0 ||
        (ballStack.length === MaxBallStackLength &&
          ballStack.every((cand) => cand === ballStack[0]))
    )
  ) {
    return true;
  }
  return false;
}
