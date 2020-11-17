import React from 'react'
import WordRelay from './WordRelay'

const App = ({match, location}) => {

    console.log(match, location)
    const urlSearchQuery = new URLSearchParams(location.search);
    console.log(urlSearchQuery.get('hello'))
  if (match.params.name === 'WordRelay') {
      return <WordRelay/>
  } else{
      return <div>
          안녕하슈
      </div>
  }
}
export default App;