import React, {useReducer, createContext, useMemo} from 'react';
import Table from './Table';
import Form from './Form';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

// 지뢰 상태 코드 (칸에 어떻게 보일지에 따라서)
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {}
});

const initialState = {
    tableData: [],
    timer: 0,
    result: ''
}

// 지뢰를 심는 함수 
const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
      return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
      const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
      shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
      const rowData = [];
      data.push(rowData);
      for (let j = 0; j < cell; j++) {
        rowData.push(CODE.NORMAL);
      }
    }
  
    for (let k = 0; k < shuffle.length; k++) {
      const ver = Math.floor(shuffle[k] / cell);
      const hor = shuffle[k] % cell;
      data[ver][hor] = CODE.MINE;
    }
  
    console.log(data);
    return data;
};

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: {
                  row: action.row,
                  cell: action.cell,
                  mine: action.mine,
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.cell, action.mine),
                halted: false,
                timer: 0,
            };
        default:
            return state;
    }
}
const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = (() => ({tableData: state.tableData, dispatch}), [state.tableData]);

    return (
        <TableContext.Provider value={value}>
            <Form/>
            <div>{state.timer}</div>
            <Table/>
            <div>{state.result}</div>
        </TableContext.Provider>
    )
}

export default MineSearch;
