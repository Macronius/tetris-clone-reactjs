export const STAGE_WIDTH = 12
export const STAGE_HEIGHT = 20


// CREATE THE STAGE
export const createStage = () => 
    Array.from(Array(STAGE_HEIGHT), () => Array(STAGE_WIDTH).fill([0, 'clear'])
    )


//@ 1:38:20
// COLLISION CHECKER
export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {

    for (let y = 0; y < player.tetromino.length; y += 1) {
        for (let x  = 0; x < player.tetromino[y].length; x += 1) { //NOTE: doesn't matter which row, all same length
            // console.log(player.tetromino[y].length)
            // 1. check that we're on an actual tetromino cell
            if(player.tetromino[y][x] !== 0) {
                if(
                    // 2. check that our move is inside the game area's height (y)
                    !stage[y + player.pos.y + moveY] ||
                    // 3. check that our move will not take us outside the game area's width(x)
                    !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                    // 4. check that the cell we're moving to isn't set to clear
                    stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ) {
                    return true
                }
            }
        }
    }

    // 5. if everything above is false
    return false

}