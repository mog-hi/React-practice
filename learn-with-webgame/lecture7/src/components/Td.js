import React, { useCallback } from 'react'
import {CHANGE_TURN, CLICK_CELL} from './TicTacToc'

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    const onClickTd = useCallback(()=> {
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex})
        dispatch({type: CHANGE_TURN})
    }, []);
  return (
    <td onClick={onClickTd}>{cellData}</td>
  );
};
export default Td;

