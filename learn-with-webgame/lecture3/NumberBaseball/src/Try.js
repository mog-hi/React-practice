import React, {PureComponent, memo} from 'react';
import './App.css';
// # 컴포넌트 
// class Try extends PureComponent {
//     state = {
//         result: this.props.result
//     }
//     render() {
//         const {value} = this.props;
//         return (
//             <li>
//                 <div>{value.try}</div>
//                 <div>{value.result}</div>
//             </li>
//         )
//     }
// }
const Try = memo(({value}) => {
    // const [result, setResult] = React.useState(value.result);
    // const onClick = () => {
    //     setResult(1);
    // }
    return (
        <li>
            <div>{value.try}</div>
            <div>{value.result}</div>
        </li>
    )
});

export default Try;
