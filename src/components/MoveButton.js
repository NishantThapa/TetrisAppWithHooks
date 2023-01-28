import React from "react";

import { StyledMoveButton } from "./styles/StyledMoveButton";

const MoveButton = ({ callback, text }) => (
  <StyledMoveButton onClick={callback}> {text} </StyledMoveButton>
);

export default MoveButton;
