import styled from 'styled-components';

export const StyledNext = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(10vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    margin: 20px 0 20px 0;
    border: 2px solid #333;
    width: 50%;
    /*height: 100%;*/
    padding: 5px;
    max-width: 25vw;
    background: #111;

`;
