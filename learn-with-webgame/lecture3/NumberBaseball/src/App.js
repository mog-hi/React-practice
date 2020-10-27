import React, {memo, createRef} from 'react';
import './App.css';
import Try from './Try';
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7 , 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
    array.push(chosen);
  }
  return array;
}
const NumberBaseball = () => {
  const [answer, setAnswer] = React.useState(getNumbers()); 
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const [tries, setTries] = React.useState([]);

  const onSubmit = (e) => {
      e.preventDefault();
      if (value === answer.join('')) {
        // 맞춘 경우 
        setResult('홈런');
        // tries변수는 배열이지만 push로 값을 추가해주면 값이 변경된 것을 react가 인지하지 못한다. 
        // 때문에 값을 아예 setTries를 통해서 바꿔줘야 한다. 이때 이전 값을 가져올때는 ...이전값을 이용한다. 
        // 이전 값을 이용할 때는 set메소드를 함수형으로 아래와 같이 써줘야 한다. 
        setTries((prevTries) => { return [...prevTries, {try: value, result: '홈런'}]});

        alert("게임 다시시작");
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        const answerArray = value.split('').map((v)=>parseInt(v));
        let strike = 0;
        let ball = 0;
        if (tries.length >= 9) {
          setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}`);
          alert("게임 다시시작");
          setValue('');
          setAnswer(getNumbers());
          setTries([]);
        } else {
          for (let i = 0; i < 4; i++) {
            if (answerArray[i] === answer[i]) {
              strike += 1;
            } else if (answer.includes(answerArray[i])) {
              ball += 1;
            }
          }
          setTries((prevTries) => {
            return [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼`}]
          });
          setValue('');
        }
      }
      inputRef.current.focus();
  }
  const onChange = (e) => {
      setValue(e.target.value);
  }
  // const inputRef = React.useRef(null);
  const inputRef = createRef();
  return (
      <>
          <h1>{result}</h1>
          <form onSubmit={onSubmit}>
            <input maxLength={4} value={value} onChange={onChange} ref={inputRef}/>
          </form>
          <div>시도: {tries.length}</div>
          <ul>
            {tries.map((v, i) => {
              // v = {try: value, result: result} 와 같은 객체
              return (
                // 컴포넌트에 보내줄 수 있는 값을 props라고 한다. 
                <Try key={`${i+1}차 시도`} value={v} index={i}/>
              );
            })}
          </ul>
      </>
  );
}

export default NumberBaseball;
