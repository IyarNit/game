import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { MainMenu, BattleSystem, About, Vitals, RoomHandler,Game } from "./assets/componentImporter"
import { useEffect, useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { currentUser, setCharacter } from "../src/store/actions/actionsConfig"
const App = (props) => {

  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onInit = async () => {
      const token = localStorage.getItem("valiantToken") || null
      if (!token) {
        console.log("unauthorized")
        setReady(true)
        // props.history.push("/")
        return
      }
      try {
        const url = "http://localhost:9876/userIdentifier"
        const result = await axios.get(url, { headers: { "Content-Type": "application/json", "authorization": token } })
        if (result.data.message === "jwt expired") {
          console.log("exp")
          localStorage.removeItem("valiantToken")
          // props.history.push("/")
          return setReady(true)
        }
        props.dispatch(currentUser(result.data.user))
        props.dispatch(setCharacter(result.data.character))


        setReady(true)
      }
      catch (error) {
        console.log("server error")
        if (error.message === "Network Error") {
          localStorage.removeItem("token")
          setReady(true)
        }
      }
    }

    onInit()
  }, [])

  if (!ready) return (
    <div className="App">
      <div className="loader">
      </div>
    </div>
  )
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainMenu} />
          <Route exact path="/Game" component={Game} />
          <Route exact path="/About" component={About} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps)(App)
