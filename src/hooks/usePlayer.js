import { useState, useCallback } from 'react'

import { TETROMINOS, randomTetromino } from '../tetrominos'
import { STAGE_WIDTH, checkCollision } from '../gameHelpers'


//HELPER STUFF

/* 
    DOES THREE THINGS:
    - establish that a player (current piece) has a position, a tetromino type, and a state of collision(or not); initialized with top-center position, random tetromino type, and not collided
    - update player's (piece) position
    - reset player's position, tetromino type, and not collided
*/


export const usePlayer = () => {

    // PLAYER STATE
    const [player, setPlayer] =  useState({
        pos: {x: 0, y: 0},
        tetromino: TETROMINOS[0].shape,
        collided: false
    })


    // @ 1:51:00
    // ROTATE
    function rotate(matrix, dir) {
        // make rows cols (transpose)
        const mtrx = matrix.map((_, index) => matrix.map( column => column[index]))
        //reverse each row to get a rotated matrix
        if(dir > 0) return mtrx.map( row => row.reverse())
        return mtrx.reverse()
    }


    // PLAYER ROTATE
    function playerRotate(stage, dir) {
        //make a deep clone (not a shallow copy)
        const clonedPlayer = JSON.parse(JSON.stringify(player))
        clonedPlayer.tetrimino = rotate(clonedPlayer.tetromino, dir)

        const pos = clonedPlayer.pos.x
        let offset = 1
        while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})) {
            clonedPlayer.pos.x += offset
            offset = -(offset + (offset > 0 ? 1 : -1))

            if(offset > clonedPlayer.tetromino[0].length) {
                //if looped through complete length of tetromino, undo the rotation from above
                rotate(clonedPlayer.tetromino, -dir)
                clonedPlayer.pos.x = pos
                return
            }
        }

        setPlayer(clonedPlayer)
    }


    // UPDATE PLAYER POSITION FUNCTION
    const updatePlayerPos = ({ x, y, collided }) => {

        setPlayer( prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }))
    }


    // RESET PLAYER FUNCTION
    const resetPlayer = useCallback( () => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino().shape,
            collided: false,
        })
    }, [])
    //NOTE: this function is wrapped in a useCallback() hook
    //NOTE: 


    return [ player, playerRotate, updatePlayerPos, resetPlayer]
}