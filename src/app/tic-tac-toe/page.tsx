'use client'

import { MouseEventHandler, useState } from "react";
import { isWin } from './util';

/**
 * 棋格组件
 */
function Square({ content, rowIndex, colIndex }: {
  content: string; // 棋格内容
  rowIndex: number; // 行坐标
  colIndex: number; // 列坐标
}) {
  return (
    <div
      className="aspect-square w-24 bg-white text-black flex items-center justify-center text-3xl font-bold"
      data-row={rowIndex}
      data-col={colIndex}
    >
      {content}
    </div>
  )
}

/**
 * 棋盘组件
 */
function Board({ xIsNext, squares, enabled, onPlay }: {
  xIsNext: boolean; // 下一步是否下 'X'
  squares: string[][]; // 棋子数据
  enabled: boolean; // 是否可以下棋
  onPlay: (option: { nextSquares: string[][]; rowIndex: number; colIndex: number }) => void
}) {
  const rowNum = squares.length;
  const colNum = squares[0].length;
  const rows = [];

  // 落子事件处理函数
  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!enabled) {
      return;
    }

    if (!(event.target instanceof HTMLDivElement)) {
      return;
    }
    const { col, row } = event.target.dataset;
    if (!col || !row) {
      return;
    }

    const rowIndex = parseInt(row);
    const colIndex = parseInt(col);

    if (squares[rowIndex][colIndex]) {
      return;
    }

    console.log(`click @(${rowIndex}, ${colIndex})`);

    const newSquares = squares.map((row) => row.slice());
    newSquares[rowIndex][colIndex] = xIsNext ? 'X' : 'O';
    onPlay({
      nextSquares: newSquares,
      rowIndex,
      colIndex,
    })
  };

  for (let i = 0; i < rowNum; i++) {
    const children = [];
    for (let j = 0; j < colNum; j++) {
      children.push(<Square content={squares[i][j]} rowIndex={i} colIndex={j} key={`${i}-${j}`} />);
    }
    rows.push((
      <div className="row flex gap-4 m-4" key={i} onClick={handleClick}>
        {children}
      </div>
    ));
  }

  return (
    <div className="board">
      {rows}
    </div>
  );
}

/**
 * 下棋历史组建
 */
function MoveHistory({ moves, squares }: { moves: { rowIndex: number, colIndex: number }[]; squares: string[][] }) {
  const moveEls = moves.map((move, index) => {
    const { rowIndex, colIndex } = move;
    return (
      <li key={`${rowIndex}-${colIndex}`}>
        {index + 1}. {squares[rowIndex][colIndex]} 落子于第 {rowIndex + 1} 行，第 {colIndex + 1} 列
      </li>
    )
  });

  return <ul>{moveEls}</ul>
}

export default function TicTacToe() {
  const rowNum = 3;
  const colNum = 3;
  const winnerLength = 2;

  // 棋盘历史
  const [history, setHistory] = useState([Array(rowNum).fill(Array(colNum).fill(null))]);
  // 当前第几步（从 0 开始）
  const [moves, setMoves] = useState([] as { rowIndex: number, colIndex: number }[]);
  // 是否结束
  const [isEnd, setIsEnd] = useState(false);
  // 获胜者
  const [winner, setWinner] = useState(null as string | null);

  const currentStep = moves.length;
  const xIsNext = !!(currentStep % 2);
  const currentSquares = history[currentStep];

  const handlePlay = ({
    nextSquares,
    rowIndex,
    colIndex,
  }: {
    nextSquares: string[][]; // 下一个棋盘数据
    rowIndex: number; // 下一步落子 行坐标
    colIndex: number; // 下一步落子 列坐标
  }) => {
    setHistory([...history, nextSquares]);
    setMoves([...moves, {
      rowIndex,
      colIndex,
    }])

    if (isWin({ squares: nextSquares, currentMove: [rowIndex, colIndex], winnerLength })) {
      setIsEnd(true);
      setWinner(nextSquares[rowIndex][colIndex]);
    }
  };

  return (
    <main className="flex">
      {winner && <div>{winner} 获胜</div>}
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} enabled={!isEnd} />
      <MoveHistory squares={currentSquares} moves={moves} />
    </main>
  );
}
