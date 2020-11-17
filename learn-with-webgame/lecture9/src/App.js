import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GameMatcher from './GameMatcher'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component = {GameMatcher}/>
        <Route path='/1' component = {GameMatcher}/>
        <Route path='/2' component = {GameMatcher}/>
        <Route path='/1/2' component = {GameMatcher}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App;