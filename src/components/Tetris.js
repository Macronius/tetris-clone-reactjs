import React, { useState } from 'react'

// GAME HELPERS
import { createStage, checkCollision } from '../gameHelpers'

// STYLED COMPONENTS
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris'

// CUSTOM HOOKS
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus'

// COMPONENTS
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'



const Tetris = () => {

    // STATES: droptime & gameover
    const [dropTime, setDropTime] = useState(null)
    const [gameOver, setGameOver] = useState(false)

    // USE CUSTOM HOOKS
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)


    console.log('re-render')



    // FUNCTIONS
    const movePlayer = dir => {
        if(!checkCollision(player, stage, {x:dir, y:0})) {
            updatePlayerPos({x: dir, y: 0})
        }
    }


    //when player stops pressing down, resume droptime
    const keyUp = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 40) {
                console.log('interval on')
                setDropTime(1000 / (level + 1))
            }
        }
    }


    const startGame = () => {
        console.log('test')
        // Reset everything
        setStage(createStage())
        setDropTime(1000)
        resetPlayer()
        setGameOver(false)
        setScore(0)
        setRows(0)
        setLevel(0)
    }

    const drop = () => {
        //increase level when player clears 10 rows
        if(rows > (level + 1) * 10) {
            //increase level
            setLevel( prev => prev + 1)
            //increase speed
            setDropTime(1000 / (level + 1) + 200)
        }

        if(!checkCollision(player, stage, {x:0, y:1})) {
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else {
            //if Game Over
            if(player.pos.y < 1) {
                console.log('Game Over')
                setGameOver(true)
                setDropTime(null)
            }
            updatePlayerPos({x:0, y:0, collided:true})
        }
    }

    

    const dropPlayer = () => {
        console.log('interval off')
        //when player presses down, stop droptime
        setDropTime(null)
        drop()
    }


    useInterval( () => {
        drop()
    }, dropTime)
    

    const move = ({ keyCode }) => {
        if(!gameOver) {
            if(keyCode === 37) {
                movePlayer(-1)
            } else if(keyCode === 39) {
                movePlayer(1)
            } else if(keyCode === 40) {
                dropPlayer()
            } else if(keyCode === 38) {
                playerRotate(stage, 1)
            }
        }
    }


    



    return(
        <StyledTetrisWrapper 
            role="button" 
            tabIndex="0" 
            onKeyDown={ e => move(e)} 
            onKeyUp={keyUp}
        >

            <StyledTetris>

                <Stage stage={stage} />

                <aside>
                
                    {
                        gameOver ? (
                            <Display 
                                gameOver={gameOver} 
                                text="Game Over" 
                            />
                        ) : (
                            <div>
                                <Display text={`Score: ${score}`} />
                                <Display text={`Rows: ${rows}`} />
                                <Display text={`Level: ${level}`} />
                            </div>
                        )
                    }
                                
                    <StartButton callback={startGame} />

                </aside>

            </StyledTetris>

        </StyledTetrisWrapper>
    )
}

export default Tetris