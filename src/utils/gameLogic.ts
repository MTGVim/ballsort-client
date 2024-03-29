import seedrandom from 'seedrandom';
import { Stage } from 'types';
// 볼 색상 생성용 의사랜덤 함수
const colorPrng = seedrandom('abcd');

export const BallColors: string[] = [];
const stages: Stage[] = [];

for (let i = 0; i < 100; i++) {
  let color = '#' + Math.floor(colorPrng() * 16777215).toString(16);
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

function moveBallsReverse(
  stage: Stage,
  fromStackIdx: number,
  toStackIdx: number,
  moveCnt: number
) {
  const fromStack = stage[fromStackIdx];
  const fromTop =
    fromStack.length === 0 ? null : fromStack[fromStack.length - 1];
  const toStack = stage[toStackIdx];

  if (fromStackIdx === toStackIdx) {
    return 0;
  }

  const balls = [];
  for (let i = fromStack.length - 1; i >= 0; i--) {
    // 꺼낼 볼 밑이 없거나, 꺼낼 볼과 같은 색이어야 함
    if (i !== 0 && fromStack[i - 1] !== fromTop) {
      break;
    }
    balls.push(fromStack[i]);
  }
  const movableCnt = Math.min(
    MaxBallStackLength - toStack.length,
    balls.length
  );
  const movedCnt = Math.min(moveCnt, movableCnt);

  for (let i = 0; i < movedCnt; i++) {
    toStack.push(fromStack.pop()!);
  }
  return movedCnt;
}

export function moveBalls(
  stage: Stage,
  fromStackIdx: number,
  toStackIdx: number
) {
  const fromStack = stage[fromStackIdx];
  const fromTop =
    fromStack.length === 0 ? null : fromStack[fromStack.length - 1];
  const toStack = stage[toStackIdx];
  const toTop = toStack.length === 0 ? null : toStack[toStack.length - 1];

  if (fromStackIdx === toStackIdx || (toTop !== null && fromTop !== toTop)) {
    return 0;
  }

  const balls = [];
  for (let i = fromStack.length - 1; i >= 0; i--) {
    if (fromStack[i] !== fromTop) {
      break;
    }
    balls.push(fromStack[i]);
  }
  const moveCnt = Math.min(MaxBallStackLength - toStack.length, balls.length);
  for (let i = 0; i < moveCnt; i++) {
    toStack.push(fromStack.pop()!);
  }
  return moveCnt;
}

/** 볼스택과 볼을 섞어서 반환 */
function shuffle(stage: Stage, prng: seedrandom.PRNG) {
  const shuffledStage: Stage = JSON.parse(JSON.stringify(stage));
  for (let i = 0; i < 100; ++i) {
    const fromIdx = Math.floor(prng() * shuffledStage.length);
    const toIdx = Math.floor(prng() * shuffledStage.length);
    moveBallsReverse(shuffledStage, fromIdx, toIdx, 1);
  }
  return shuffledStage;
}

/** 다음 스테이지 생성. */
export function getStage(stageNum: number) {
  if (stages[stageNum]) {
    return stages[stageNum];
  }

  const totalStackCnt = Math.min(stageNum + 6, 10);
  const emptyStackCnt = 2;
  const ballColorsCnt = totalStackCnt - emptyStackCnt;

  let stage = [
    [],
    [],
    ...Array.from({ length: ballColorsCnt }).map((_, ballColorIdx) =>
      Array.from({ length: MaxBallStackLength }).map((_) => ballColorIdx)
    ),
  ];

  const stagePrng = seedrandom(stageNum.toString());

  // 풀 수 있는 스테이지가 나올 때 까지 섞음
  // do {
  stage = shuffle(stage, stagePrng);
  // } while (!isSolvable(stage));

  stages[stageNum] = stage;
  return stage;
}

/** 스택에서 한번에 집을 수 있는 볼 idx 목록 반환 */
export function getPickableBallIdxs(ballStack: Stage[number]) {
  const ballTop = ballStack[ballStack.length - 1];
  const ballsIdxs = [];
  for (let i = ballStack.length - 1; i >= 0; --i) {
    if (ballStack[i] !== ballTop) {
      break;
    }
    ballsIdxs.push(i);
  }
  return ballsIdxs;
}
