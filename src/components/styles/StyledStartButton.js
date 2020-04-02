import styled from 'styled-components';
import { respondTo } from './respondTo';
export const StyledStartButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: 5px solid #333333;
    color: white;
    background: #1d501f;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    ${respondTo.xs`
        width: 70%;
    `}
     ${respondTo.sm`
        width: 100%;
    `}
`
