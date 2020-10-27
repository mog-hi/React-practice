import React from 'react';
// const {Component} = React;
// import './App.css';

const WordRelay = () => {
    const [word, setWord] = React.useState('주희'); // 항상 초기값 주희
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        if (word[word.length - 1] === value[0]) {
            setResult('딩동댕');
            setWord(value);
            setValue('');
        } else {
            setResult('땡');
            setValue('');
        }
        inputRef.current.focus();
        
    }
    const onChange = (e) => {
        setValue(e.target.value);
    }
    const inputRef = React.useRef(null);
    return (
        <>
            <div>{word}</div>
            <form onSubmit = {onSubmit}>
                <input value = {value} onChange={onChange} ref={inputRef} type='text'/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
}
export default WordRelay;
