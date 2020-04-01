import React from 'react';

import { StyledNext } from './styles/StyledNext';
import Cell from './Cell';

const Next = ({ next }) => (
    <StyledNext width={next[0].length} height={next.length}>
        {next.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledNext>
);



export default Next;
