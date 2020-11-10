import React from 'react';
import Td from './Td';

const Tr = ({rowData, rowIndex, dispatch}) => {
  return (
      <tr> 
          {/* 배열.map((원소 하나하나, 인덱스) => 콜백)*/}
          {Array(rowData.length).fill().map((td, i)=> <Td dispatch={dispatch} cellIndex={i} rowIndex={rowIndex} cellData={rowData[i]} dispatch={dispatch}>{''}</Td>)}
      </tr>
  );
};
export default Tr;
