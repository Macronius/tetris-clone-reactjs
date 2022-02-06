import styled from 'styled-components'

// QUESTION: we just have access to props just like that?
export const StyledCell = styled.div`
    width: auto;
    border-radius: 5px;
    background: rgba(${ props => props.color }, .9);
    border: ${ props => (props.type === 0 ? '0px solid' : '6px solid')};
    border-top-color: rgba(${ props => props.color}, 1);
    border-right-color: rgba(${ props => props.color}, 1);
    border-bottom-color: rgba(${ props => props.color}, 0.2);
    border-left-color: rgba(${ props => props.color}, 0.5);
`