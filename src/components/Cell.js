import React from 'react'

//style
import { StyledCell } from './styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

const Cell = ({ type }) => (

    <StyledCell type={type} color={TETROMINOS[type].color}>
        {console.log('re-render cell')}
    </StyledCell>
)

export default React.memo(Cell)