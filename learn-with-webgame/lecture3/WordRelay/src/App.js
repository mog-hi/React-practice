import React from 'react';
// import './App.css';

const GuGuDan = () => {
  const [first, setFirst] = React.useState(Math.ceil(Math.random()*9));
  const [second, setSecond] = React.useState(Math.ceil(Math.random()*9));
  const [value, setValue] = React.useState('');
  const [result, setResult] = React.useState('');
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const inputRef = React.useRef(null); 
           
  const onSubmit = (e) => { 
    e.preventDefault(); 
    if (parseInt(value) == first * second) {
        setResult((prevResult) => {
            return `정답 ${prevResult}`
        });
        setFirst(Math.ceil(Math.random()*9));
        setSecond(Math.ceil(Math.random()*9));
        setValue('');
        inputRef.current.focus();
    } else {
        setResult(`땡`);
        setValue('');
        inputRef.current.focus();
    }
  };
  return (
    <React.Fragment>
        <div>{first} 곱하기 {second}은?</div>
        <form onSubmit = {onSubmit}>
            <input ref = {inputRef} type = "number" value = {value} onChange = {onChange}/>
            <button type = "submit">입력!</button> 
        </form>
        <div>{result}</div>
    </React.Fragment>
  );
}
export default GuGuDan;
