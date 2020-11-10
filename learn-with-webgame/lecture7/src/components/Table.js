import React from 'react';
import Tr from './Tr';

const Table = ({onClick, tableData, dispatch}) => {
  return (
      <table> 
        {Array(tableData.length).fill().map((tr, i)=>(
            // tableData: [['','',''],['','',''],['','','']] 이렇게 생긴 tableData의 배열 하나 하나를 rowData에 담는다.
            // i는 인덱스, 즉 몇번째 줄인지를 나타낸다.
            <Tr dispatch={dispatch} rowData={tableData[i]} rowIndex={i}/>
        ))}
      </table>
  );
};
export default Table;
