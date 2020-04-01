import React from 'react';

import { StyledPauseButton } from './styles/StyledPauseButton' 

const PauseButton = ({ callback, text }) => (
    
    <StyledPauseButton onClick={callback}>{text}</StyledPauseButton>
    
)

export default PauseButton;
