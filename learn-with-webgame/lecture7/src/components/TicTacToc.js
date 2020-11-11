import React, {useReducer, useCallback} from 'react'
import Table from './Table'

// action이름은 아래처럼 상수로 빼는게 규칙 
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'; // Td에서 이 상수를 쓸거니까 export
export const CHANGE_TURN = 'CHANGE_TURN';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['','',''],['','',''],['','','']]
}

const reducer = (state, action) => {
    // action에 담긴값은 dispatch실행할 때 담겨오는 값
    // state값은 state
    switch (action.type) {
        default:
        case SET_WINNER:
            console.log("dispatch", action)
            // state.winner = action.winner; 이렇게 하면 안돼! 아래처럼 객체로 리턴해줘야함
            return {
                ...state,
                winner: action.winner
            }
        case CLICK_CELL:
            // ...한 이유는 얕은 복사를 하기 위해서 이다. : 불변성을 지키기 위해서 
            const tableData = [...state.tableData];
            // tableData에서 원하는 부분만 바꾼다. 
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn; // turn은 O인지 X인지 
            return {
                ...state,
                tableData,
            }
        case CHANGE_TURN: 
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            };    
    }
}
const TicTacToc = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onClickTable = useCallback(() => {
        dispatch({type: 'SET_WINNER', winner : 'O'});
    }, []);
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('0');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);
    return (
        <>
            <Table dispatch={dispatch} onClick={onClickTable} tableData={state.tableData}/>
        </>
    );
};
export default TicTacToc;
