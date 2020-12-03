import React from 'react';
import { connect } from "react-redux"
import { currentUser, noLongerCharacter } from "../store/actions/actionsConfig"
import { withRouter } from "react-router-dom"
const Logout = (props) => {
    ////////Hooks////////////


    ////////Functions////////////
    const signOff = () => {
        props.dispatch(currentUser({}))
        props.dispatch(noLongerCharacter({}))

        localStorage.removeItem("valiantToken")
    }

    /////////Jsx///////////
    return (
        <li style={{ cursor: "pointer", textDecoration: "none", color: "white" }} onClick={signOff}>Logout</li>

    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        character: state.character
    }
}

export default withRouter(connect(mapStateToProps)(Logout))