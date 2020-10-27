import './App.css';
import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    // hooks에서는 변경됐을 때 렌더링을 다시하고 싶지 않은 애들을 ref로 써준다!! 
    // state값은 변경됐을 때 다시 렌더링, ref는 다시 렌더링 되지 않는다. 
    // ref로 쓸데는 싹다 .current를 붙여줘야 한다.
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeout.current = setTimeout (() => {
                setState('now');
                setMessage('지금 클릭');
            }, Math.floor(Math.random()*1000)+2000);
            startTime.current = new Date();
        } else if (state === 'ready') { // 성급하게 클릭
            // 이때 기존에 있던 setTimeout을 초기화 해줘야 한다. 
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('성급했음 초록색이 되면 클릭하세요');
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current-startTime.current];
            });
        }
    }
    const onReset = () => {
        setResult([]);
    }
    const renderAverage = () => {
        return result.length === 0
        ? null
        :<>
            <div>평균 시간: {result.reduce((a,c) => a+c)/result.length}ms</div>
            <button onClick={onReset}>리셋</button>
        </>
    };
    
    return(
    <>
        <div id="screen" className={state} onClick={onClickScreen}>
        {message}
        </div>
        {renderAverage()}
    </>
    )
  
}
export default ResponseCheck;
