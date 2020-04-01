import { useState, useCallback } from 'react';
import { createNext } from '../gameHelpers';
import {randomTetromino } from '../tetrominos';


export const useNext = () => {
    const [next, setNext] = useState(createNext());
    const [tetro, setTetro] = useState({
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
    });

    tetro.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                next[y + 1][x + 2] = [
                    value,
                    'merged'
                ];
            }
        });
    });

    const resetTetro = useCallback((nxt) => {
        setTetro({
            pos: { x: 0, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })

        var newNext = nxt.map(row => 
            row.map(() => [0, 'clear'])
            );
        setNext(newNext);
    }, []);
    return [next, tetro, resetTetro]
    }