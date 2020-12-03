import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { BattleSystem } from "../assets/componentImporter"
import axios from "axios"
import { setCharacterLocation } from "../store/actions/actionsConfig"
import updateRoom from "../assets/axios"
const RoomHandler = (props) => {
    ////////Hooks////////////
    console.log("roomhandler", props)
    const [enemie, SetEnemie] = useState("")
    useEffect(async () => {
        await getRoom()
    }, []);

    ////////Functions////////////
    const getRoom = async () => {
        try {
            const url = "http://localhost:9876/rooms"
            const result = await axios.get(url, { headers: { "Content-Type": "application/json", "room": props.roomName } })
            if (result.data.message === "room located") {
                props.dispatch(setCharacterLocation(result.data.room))
                await updateRoom(props.currentUser)
                // update character locations is state and server
                // check events for progression
            }
        }
        catch (error) {
            console.log("server error")
            if (error.message === "Network Error") {
            }
        }
    }

    const roomName = () => {
        const switcher = props.roomName
        // let event = ""
        switch (switcher) {
            case "Outskirts": {
                console.log(switcher)
                SetEnemie("Road Robber")
                return
            }
            case "Main Hall": {
                console.log(switcher)
                SetEnemie("Guard")
                return
            }
            // null should be temporary
            default: return null;
        };
    }
    /////////Jsx///////////
    return (
        <div>
            {!enemie ? null : <BattleSystem monster={enemie} />}

        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        character: state.character,
        currentUser: state.currentUser
    }
}
export default connect(mapStateToProps)(RoomHandler)