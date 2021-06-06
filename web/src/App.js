import React, {useState} from 'react'
import Home from './components/Home'
import Athlete from './components/Athlete'
import GlobalState from './contexts/GlobalState';
import{ BrowserRouter as Router, Switch, Link, Route } from "react-router-dom"

const App = () => {
  const [athlete, setAthlete] = useState(String(localStorage.getItem("athlete") || ""));

  return(
    <div class="px-7">
      <GlobalState.Provider value={[athlete, setAthlete]}>
        <Router>
          <Switch>
            <Route path="/athlete">
              <Athlete/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
          </Switch>
        </Router>
      </GlobalState.Provider>
      
    </div>
  )
}

export default App;
