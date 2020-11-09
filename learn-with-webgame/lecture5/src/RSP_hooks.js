import React, {useState, useRef, useEffect, memo} from 'react';

// render -> ref -> componentDidMount -> setState, props바뀜 -> shouldComponentUpdate(true일때) -> render -> componentUpdate
// 부모가 현재 컴포넌트를 제거했을 때 -> componenetWillUnmount=> 소멸 
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
}
const scores = {
    가위: 1,
    바위: 0, 
    보: -1
}
const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v)=>{
        return v[1] === imgCoord;
    })[0];
}
const RSP = memo (() => {
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [imgCoord, setImgCoord] = useState('0');
    const interval = useRef(); // 흐잉 ㅜㅜ

    // 랜더링 될때 마다 useEffect가 계속 다시 실행됐다가 종료(return) 된다.
    // 함수 컴포넌트가 매번 다시 실행되어야 한다는 특성 때문에 계속 저런다 ㅎㅅㅎ .?.?
    useEffect(() => {
        // componentDidMount, componentDidUpdate 의 역할 (일대일 대응은 아님)
        interval.current = setInterval(changeHand, 1000);
        return () => { // componentWillUnmount 역할 
            clearInterval(interval.current);
        }
    }, [imgCoord]); 
    // 두번째 인수 배열에는 변경될 때 useEffect를 다시 실행할 값을 넣어라 
    //[]가 빈배열이면 뭐가 바뀌던지 실행 X, 첫 실행 한 번만 함 (componentDidMount역할), []에 뭐가 들어가면 componentDidUpdate
    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore-cpuScore;
        if (diff === 0) {
            setResult('비김');
        } else if ([-1, 2].includes(diff)) {
            setResult('이김');
            setScore((prevScore) => prevScore + 1);
        } else if ([1,-2].includes(diff)) {
            setResult('짐');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand, 1000);
        }, 2000);
    }
    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if(imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if(imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }
    return (
        <>
        <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
        <div>
            {/* <button id="rock" className="btn" onClick={()=>this.onClickBtn('바위')}>바위</button> */}
            <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
        </div> 
        <div>{result}</div>
        <div>현재 {score}점</div>
        </>
    );
});
export default RSP;
