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

  for (const direction of directions) {
    const dx = direction[0]; // X方向の移動量
    const dy = direction[1]; // Y方向の移動量
  }

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const newBoard = structuredClone(board);
    newBoard[rowIndex][cellIndex] = turn;
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
