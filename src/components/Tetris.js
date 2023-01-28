import React, { Fragment, useState } from "react";

import { createStage, checkCollision } from "../gameHelpers";

// Components
import Stage from "./Stage";
import Next from "./Next";
import Display from "./Display";
import StartButton from "./StartButton";
import PauseButton from "./PauseButton";

//Styled Components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

//Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useNext } from "../hooks/useNext";
import { useGameStatus } from "../hooks/useGameStatus";
import MoveButton from "./MoveButton";
//import { clone } from '@babel/types';

// Components
const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [pauseText, setPauseText] = useState("Pause Game");
  const [startText, setStartText] = useState("Start Game");
  const [next, tetro, resetTetro] = useNext();
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(tetro);
  const [stage, setStage, rowsCleared] = useStage(
    player,
    resetPlayer,
    tetro,
    resetTetro,
    next
  );
  const [score, setScore, rows, setRows, level, setLevel] =
    useGameStatus(rowsCleared);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setPaused(false);
    resetTetro(next);
    resetPlayer(tetro);
    setDropTime(1000);
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
    setStartText("Restart Game");
    setPauseText("Pause Game");
  };

  const pauseGame = () => {
    if (paused !== true) {
      setDropTime(null);
      setPaused(true);
      setPauseText("Unpause Game");
    } else if (paused === true) {
      setDropTime(1000 / (level + 1) + 200);
      setPaused(false);
      setPauseText("Pause Game");
    }
  };

  const drop = () => {
    //Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        setStartText("Start Game");
        setPauseText("Pause Game");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40 || keyCode === 32) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper
      role="button"
      tabIndex="0"
      onKeyDown={(e) => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Stage stage={stage} />{" "}
        <aside>
          {" "}
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Next next={next} />{" "}
              <div className="buttons">
                <Display text={`Score: ${score}`} />{" "}
                <Display text={`Rows: ${rows}`} />{" "}
                <Display text={`Level: ${level}`} />{" "}
              </div>{" "}
            </div>
          )}{" "}
          <StartButton callback={startGame} text={startText} />{" "}
          <PauseButton callback={pauseGame} text={pauseText} />{" "}
          <section className="arrowBtnContainer">
            <MoveButton callback={() => playerRotate(stage, 1)} text="&uarr;" />{" "}
            <div>
              <MoveButton callback={() => movePlayer(-1)} text="&larr;" />
              <MoveButton callback={() => movePlayer(1)} text="&rarr;" />
            </div>
            <MoveButton callback={() => dropPlayer()} text="&darr;" />
          </section>
        </aside>{" "}
      </StyledTetris>{" "}
    </StyledTetrisWrapper>
  );
};

export default Tetris;
