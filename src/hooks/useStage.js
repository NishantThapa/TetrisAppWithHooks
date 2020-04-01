import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer, tetro, resetTetro, next) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);
    const [test, setTest] = useState(0);
    
    useEffect(() => {
        setRowsCleared(0);
        const sweepRows = newStage => 
            newStage.reduce((acc, row) => {
                if (row.findIndex(cell => cell[0] === 0) === -1 
                && row.every(cell => cell[0] !== 'W' ) ) {
                    setTest(1);
                    console.log('test: ');
                    console.log(test);
                    console.log('^-- flash white');
                    acc.push(row.map(() => ['W', 'merged']));
                    return acc;    
                    
                } else if (row.every(cell => cell[0] === 'W')) {
                    setRowsCleared(prev => prev + 1);
                    console.log('unshift');
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return acc;  
                }                    
                acc.push(row);
                return acc;
            }, [])

        const updateStage = prevStage => {
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                );
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ];
                    }
                });
            });
            if (player.collided) {
                console.log("here?")
                resetTetro(next);
                resetPlayer(tetro);
                return sweepRows(newStage);
            }
            if (test === 1){
                setTest(2);
            }
            if (test === 2){
                setTest(0);
                return sweepRows(newStage);
            }
            return newStage;
        };
        setStage(prev => updateStage(prev))

    }, [next, player, resetPlayer, resetTetro, rowsCleared, test, tetro]);
    return [stage, setStage, rowsCleared];
}
