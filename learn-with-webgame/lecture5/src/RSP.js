import React, {Component} from 'react';

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
class RSP extends Component {
    state = {
        result:'',
        score: 0,
        imgCoord: '0',
    };
    interval;
    // render가 처음 실행됐을 때 componetDidMount가 실행된다. 처음 렌더가 성공적으로 실행됐다면 실행됨
    componentDidMount() { // 여기에 비동기 요청을 많이함 
        // 일정시간 마다 반복 작업해주는 setInterval
        // setInterval과 같은 작업은 컴포넌트가 제거된다고 해도 계속된다. 
        // 아래 작업은 바위->가위->보 순으로 이미지가 보이게 하기위한 시간별 imgCoord조정 작업이다.
        this.interval = setInterval(this.changeHand, 1000);
    }
    // 리렌더링 후에 실행된다 
    componentDidUpdate() {

    }
    // 컴포넌트가 제거되기 직전, componentDidMount의 작업들을 제거하는 역할이다. componentDidMount와 한쌍!
    componentWillUnmount() { // 비동기 요청 정리를 많이 함
        clearInterval(this.interval);
    }
    changeHand = () => {
        const {imgCoord} = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if(imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if(imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }
    // 고차함수
    // onClick은 원래 ()=>로 구현하는 함수이다. e.target을 위해서 e를 담아서 보낼 수도 있다
    // onClick메소드로 설정한 함수에 또 다른 인수를 받아와야 할 때, 아래 처럼 () => () =>로 구현할 수 있다.
    // e를 담아올 수 있는 onClick을 위한 ()=>가 뒤에 와야한다.
    onClickBtn = (choice) => ()=> {
        const {imgCoord} = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore-cpuScore;
        if (diff === 0) {
            this.setState({
                result: "비김"
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState)=>{
                return{
                    result:'이김',
                    score:prevState.score + 1
                }
            })
        } else if ([1,-2].includes(diff)) {
            this.setState((prevState)=>{
                return{
                    result:'짐',
                    score:prevState.score - 1
                }
            })
        }
        setTimeout(()=>{
            this.interval = setInterval(this.changeHand, 1000)
        }, 2000);
    }
    
    render() {
        const {result, score, imgCoord} = this.state;
        return (
            <>
            <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}/>
            <div>
                {/* <button id="rock" className="btn" onClick={()=>this.onClickBtn('바위')}>바위</button> */}
                <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
            </div> 
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        )
    }
}
export default RSP;
