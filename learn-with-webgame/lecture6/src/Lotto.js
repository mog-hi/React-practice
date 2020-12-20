import React , {Component, useRef, useEffect, useState, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i+1);
  
  // shuffle에 1~45 숫자를 랜덤으로 나열 
  const shuffle = [];
  while (candidate.length>0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }

  // 그 중 앞 6개는 winNumber가 되고, 맨 뒤 숫자는 bonusNumber가 된다.
  const winNumbers = shuffle.slice(0, 6).sort((p,c) => p-c);
  const bonusNumber = shuffle[shuffle.length - 1];                 
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    // useMemo(함수, [여기있는 값이 바뀌면 다시실행]) : 첫번째 인자로 담은 함수를 실행하고 값을 기억해둔다
    // 연산한 값을 재사용하는 방법이다. 
    // useMemo는 함수의 return값을 기억하고 있는거고
    // useCallback은 함수 자체를 기억하고 있는거다.
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    const onClickRedo = useCallback(() => {
        // 모든 state 초기화
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    useEffect(()=>{
        console.log('useEffect')
        for (let i = 0; i<winNumbers.length-1; i++) {
            timeouts.current[i] = setTimeout(()=>{
              setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
            }, (i+1)*1000); 
        }
        // 보너스공
        timeouts.current[6] = setTimeout(()=>{
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);

        return () => {
            timeouts.current.forEach((v) => {
              clearTimeout(v);
            });
          };
    }, [winNumbers]);

    return (
        <>
          <div>당첨 숫자</div>
          <div id="결과창">
            {winBalls.map((v)=> <Ball key={v} number={v}/>)}
          </div>
          <div>보너스!</div>
          {bonus && <Ball number={bonus}/>}
          {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}
export default Lotto;
