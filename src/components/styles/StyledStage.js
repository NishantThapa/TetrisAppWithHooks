import styled from 'styled-components';
import { respondTo } from './respondTo';
export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 5px solid #333;
    width: 100%;
    margin: 20px 0px 0px 0px;
    max-width: 25vw;
    background: #4e4c4c;
    ${respondTo.xs`
        grid-template-rows: repeat( 20, calc(48vw / 12) );
        max-width: 45vw;
    `}
     ${respondTo.sm`
        grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );
    max-width: 25vw;
	`}
`;
