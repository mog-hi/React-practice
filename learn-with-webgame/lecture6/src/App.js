import React , {Component} from 'react';
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

class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(), // 당첨 숫자들 
    winBalls: [], // winNumbers의 앞 6개가 여기에 
    bonus: null, // 보너스 공 (winNumbers의 맨뒤가 여기에 )
    redo: false // redo가 true면 한번더 버튼이 보임 
  }
  timeouts = []
  // 컴포넌트 시작하자 마자 뜨는 것
  runTimeouts = () => {
    const {winNumbers} = this.state;
    // winNumbers에 담긴 6개의 숫자를 1초마다 하나씩 winBalls에 추가한다.
    for (let i = 0; i<this.state.winNumbers.length-1; i++) {
      // setTimeout, setInterval 쓸 때 모두 컴포넌트가 제거 될때 clear하는 코드를 넣어줘야 한다. 
      // (반복문 안에 setTimeout을 넣어줬으니까 그만큼 해줘야함 )
      this.timeouts[i] = setTimeout(()=>{
        this.setState((prevState) => {
          return {
            winBalls:[...prevState.winBalls, winNumbers[i]], 
          }
        });
      }, (i+1)*1000); 
    }
    // 보너스공
    this.timeouts[6] = setTimeout(()=>{
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000);
  }
  componentDidMount() {
    this.runTimeouts();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('didUpdate'); // runTimeouts에서 반복문을 실행하면서 계속 state가 바뀌기 때문에 
    // 숫자가 하나씩 나타날 때마다 계속 didUpdate가 실행된다. but, 조건문에 담긴 runtimes는 한 번 더 버튼을 눌렀을때만 실행한다.
    if (this.state.winBalls.length === 0) {
      // 초기화가 완료된 후 
      console.log('runtimeouts')
      this.runTimeouts();
    }
  }

  componentWillUnmount() {  
    this.timeouts.forEach((v)=>{
      clearTimeout(v);
    })
  }
  onClickRedo = () => {
    // 모든 state 초기화
    this.setState({
      winNumbers: getWinNumbers(), // 당첨 숫자들 
      winBalls: [], // winNumbers의 앞 6개가 여기에 
      bonus: null, // 보너스 공 (winNumbers의 맨뒤가 여기에 )
      redo: false // redo가 true면 한번더 버튼이 보임 
    });
    this.timeouts = [];
  }
  render() {
    const {winBalls, bonus, redo} = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v)=> <Ball key={v} number={v}/>)}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus}/>}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}
export default Lotto;
