import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { RoomHandler } from "../assets/componentImporter"
import { withAuth } from "../components/TokenAuth"

const Game = (props) => {
    ////////Hooks////////////

    const [newGame, SetNewGame] = useState(false)
    const [newGameRoom, SetNewGameRoom] = useState("Outskirts")

    ////////Functions////////////
    useEffect(() => {
        // need to be implemented: method to check if a save game exists. also a method for saving game
        SetNewGame(true)
    }, []);

    /////////Jsx///////////
    return (
        <div>
            <h1>I'm ingame</h1>
            { newGame ? <RoomHandler roomName={newGameRoom} /> : null}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
    }
}
export default  withAuth(connect(mapStateToProps)(Game))