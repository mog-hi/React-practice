import './App.css';
import React, { Component } from 'react';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요.',
    result: []
  };
  // 변경됐을 때 렌더링을 다시하고 싶지 않은 애들은 아래의 timeout과 startTime처럼 그냥 선언해 준다. 
  timeout;
  startTime;
  endTime;
  onClickScreen = () => {
    const {state, message, result} = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요'
      });
      this.timeout = setTimeout (() => {
        this.setState({
          state: 'now',
          message: '지금 클릭'
        })
      }, Math.floor(Math.random()*1000)+2000);

      this.startTime = new Date();

    } else if (state == 'ready') { // 성급하게 클릭
      // 이때 기존에 있던 setTimeout을 초기화 해줘야 한다. 
      clearTimeout(this.timeout);
      this.setState ({
        state: 'waiting',
        message: '성급했음 초록색이 되면 클릭하세요'
      });

    } else if (state === 'now') { // 반응속도 체크
      this.endTime = new Date()
      this.setState ((prevState) => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요',
          result: [...prevState.result, this.endTime-this.startTime]
        }
      });
      // 초록색이 된 순간 부터, 클릭한 순간까지가 반응속도
    }
  }
  onReset = () => {
    this.setState({
      result: []
    });
  }
  renderAverage = () => {
    const {result} = this.state;
    return result.length === 0
      ? null
      :<>
        <div>평균 시간: {result.reduce((a,c) => a+c)/result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
  };
  
  render() {
    const {state, message} = this.state;
    return(
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {/* className은 CSS에서 많이 쓰인다. */}
          {message}
        </div>
        {/* 아래 두개의 문법은 동일하다. */}
        {/* {this.state.message === 0 ? null : <div>평균 시간: {this.state.result.reduce((a,c) => a+c)/this.state.result.length}ms</div>} */}
        {this.renderAverage()}
        {/* 위처럼 함수를 쓸 때, print하는 것 처럼 return하는 값이 해당 부분에 그대로 들어간다. */}
      </>
    )
  }
}
export default ResponseCheck;
