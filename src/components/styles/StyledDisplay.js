import styled from 'styled-components';
import { respondTo } from './respondTo';
export const StyledDisplay = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 20px 0 20px 0;
    padding: 20px;
    border: 4px solid #333;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    color: ${props => (props.gameOver ? 'red' : '#999')};
    background: #000;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    justify-content: center;
    ${respondTo.xs`
        width: 70%;
    `}
     ${respondTo.sm`
        width: 100%;
    `}
`;
