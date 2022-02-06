import { useState, useEffect, useCallback } from 'react'


export const useGameStatus = rowsCleared => {

    //STATES
    const [score, setScore] = useState(0)
    const [rows, setRows] = useState(0)
    const [level, setLevel] = useState(0)

    const linePoints = [40, 100, 300, 1200]


    // FUNCTIONS:

    // calculate score
    const calcScore = useCallback(() => {
        if(rowsCleared > 0) {
            setScore( prev => prev + linePoints[rowsCleared - 1] * (level + 1))
            setRows( prev => prev + rowsCleared)
        }
    }, [level, linePoints, rowsCleared])


    // useEffect to fire this off automatically
    useEffect( () => {
        calcScore()
    }, [calcScore, rowsCleared, score])


    return [score, setScore, rows, setRows, level, setLevel]
}