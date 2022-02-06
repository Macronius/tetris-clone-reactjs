import { useState, useEffect } from 'react'

import { createStage } from '../gameHelpers'


export const useStage = (player, resetPlayer) => {
    // STATE
    const [stage, setStage] = useState(createStage())
    const [rowsCleared, setRowsCleared] = useState(0)
    

    // @ ~ 1:25:00
    useEffect( ()=> {

        // SET ROWS CLEARED
        setRowsCleared(0)

        // SWEEP ROWS FUNCTION
        const sweepRows = newStage => 
            newStage.reduce( (acc, row) => {
                if(row.findIndex( cell => cell[0] === 0) === -1) {
                    //note: if no 0 are found, then return -1 (clear the row because it is full)
                    setRowsCleared( prev => prev + 1)
                    acc.unshift(new Array(newStage[0].length).fill([0, 'clear']))

                    return acc
                }
                //if we don't find a matching row
                acc.push(row)

                return acc
            }, [])

        const updateStage = prevStage => {
            // FIRST: flush the stage (clear from previous render)
            const newStage = prevStage.map( row => 
                row.map( cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            )

            // THEN: draw the tetromino //NOTE: tetromino comes from 'player' //in Tetris.js, send player to useStage(player)
            player.tetromino.forEach( (row,y) => {
                row.forEach( (value, x) => {
                    if(value !== 0) { 
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear' }`,
                        ]
                    }
                })
            })

            
            // CHECK FOR COLLISIONS
            if(player.collided) {
                resetPlayer()
                return sweepRows(newStage)
            }

            return newStage
        }

        setStage( prev => updateStage(prev))

    }, [
        player.pos.x, 
        player.pos.y, 
        player.tetromino, 
        player.collided, 
        resetPlayer
    ])
    // }, [player, resetPlayer])

    return [stage, setStage, rowsCleared]
}


//BEWARE: this useEffect() will go into an infinite loop without the useCallback()