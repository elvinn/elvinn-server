/**
 * 判断当前玩家是否胜利
 */
function isWin(data: {
  squares: string[][]; // 棋盘
  currentMove: [number, number]; // 当前落子位置
  winnerLength: number; // 胜利长度
}): boolean {
  const { squares, currentMove, winnerLength } = data;
  const [x, y] = currentMove;
  const chessman = squares[x][y];
  const maxX = squares[0].length - 1;
  const maxY = squares.length - 1;

  if (!chessman) {
    // 落子位置为空
    return false;
  }

  // 获取指定方向上一样的棋子数量
  const getDirectionCount = (dx: number, dy: number) => {
    let count = 0;

    for (let i = 1; i < winnerLength; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;
      if (newX < 0 || newX > maxX || newY < 0 || newY > maxY || squares[newX][newY] !== chessman) {
        break;
      }
      count += 1;
    }

    return count;
  };

  // 判断每个方向上是否符合胜利条件
  const directions = [
    [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 }], // 横向
    [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }], // 纵向
    [{ dx: -1, dy: -1 }, { dx: 1, dy: 1 }], // 左上到右下
    [{ dx: -1, dy: 1 }, { dx: 1, dy: -1 },], // 左下到右上
  ]

  for (const [directionA, directionB] of directions) {
    const aCount = getDirectionCount(directionA.dx, directionA.dy);

    if (aCount + 1 >= winnerLength) {
      return true;
    }

    const bCount = getDirectionCount(directionB.dx, directionB.dy);
    if (bCount + 1 >= winnerLength || aCount + bCount + 1 >= winnerLength) {
      return true;
    }
  }

  return false;
}

export {
  isWin,
}