'use client';

import { useState } from 'react';
import styles from './page.module.css';

const directions = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

export default function Home() {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [turn, setTurn] = useState(1);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    if (board[rowIndex][cellIndex] !== 0) {
      return;
    }
    const newBoard = structuredClone(board);
    newBoard[rowIndex][cellIndex] = turn;
    let flippedCount = 0;
    for (const direction of directions) {
      const dx = direction[0];
      const dy = direction[1];
      let x = cellIndex + dx;
      let y = rowIndex + dy;
      const stonesToFlip = [];
      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const color = newBoard[y][x];
        if (color === 0) {
          break;
        }
        if (color === turn) {
          if (stonesToFlip.length > 0) {
            for (const stones of stonesToFlip) {
              newBoard[stones[0]][stones[1]] = turn;
            }
            flippedCount += stonesToFlip.length;
          }
          break;
        }
        stonesToFlip.push([y, x]);
        x += dx;
        y += dy;
      }
    }

    if (flippedCount === 0) {
      return;
    }
    setTurn(turn === 1 ? 2 : 1);
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((color, cellIndex) => (
            <div
              className={styles.cell}
              key={cellIndex}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            >
              {color === 1 ? (
                <div className={styles.stone} style={{ backgroundColor: 'black' }} />
              ) : color === 2 ? (
                <div className={styles.stone} style={{ backgroundColor: 'white' }} />
              ) : null}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
