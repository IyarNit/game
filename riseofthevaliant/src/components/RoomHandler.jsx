import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { BattleSystem, ButtonHandler, SubEventHandler } from "../assets/componentImporter"
import axios from "axios"
import { setCharacterLocation } from "../store/actions/actionsConfig"
import { updateRoom, getEvents, getSubEvents } from "../assets/axios"
import { withAuth } from "../components/TokenAuth"

const RoomHandler = (props) => {
    ////////Hooks////////////
    console.log("roomhandler", props)
    const [enemie, SetEnemie] = useState("")
    const [message, SetMessage] = useState("")
    const [roomEvent, SetRoomEvent] = useState("")
    // room state is to giv the battle componennt the current event 
    const [room, SetRoom] = useState("")
    const [showButtnon, SetShowButtnon] = useState(false)
    const [showSubEventButtnon, SetShowSubEventButtnon] = useState(false)
    const [subEvent, SetSubEvent] = useState("")

    useEffect(async () => {
        await getRoom()

    }, []);

    ////////Functions////////////
    const getRoom = async (newRoom) => {
        console.log(newRoom)
        SetShowButtnon(false)
        try {
            const url = "http://localhost:9876/rooms"
            if (!newRoom) {
                var result = await axios.get(url, { headers: { "Content-Type": "application/json", "room": props.roomName } })
            } else {
                var result = await axios.get(url, { headers: { "Content-Type": "application/json", "room": newRoom } })
                if (result.data.message === "room located") {
                    console.log(result.data)
                    props.dispatch(setCharacterLocation(result.data.room))
                    await updateRoom(props.character)
                    SetRoom(result.data.room)
                    roomName(newRoom, result.data.room)
                    // update character locations in state and server
                    // check events for progression
                    return
                }
            }
            if (result.data.message === "room located") {
                console.log(result.data)
                props.dispatch(setCharacterLocation(result.data.room))
                await updateRoom(props.character)
                SetRoom(result.data.room)
                roomName(props.roomName, result.data.room)
                // update character locations in state and server
                // check events for progression
            }
        }
        catch (error) {
            console.log(error.message)

        }
    }

    const roomName = async (name, fullRoom) => {
        const switcher = name
        console.log(switcher)
        const room = props.character.location.current
        switch (switcher) {
            case "Outskirts": {
                console.log(fullRoom)
                if (fullRoom.hasEvents) {
                    await eventHandler(fullRoom)
                }
                return
            }
            case "Town": {
                console.log("we are in the town!")
                if (fullRoom.hasEvents) {
                    await eventHandler(fullRoom)
                }
                return
            }
            case "Castle Gate": {
                console.log("we are in the Castle Gate!")
                console.log(fullRoom)
                if (fullRoom.hasEvents) {
                    await eventHandler(fullRoom)
                }
                return
            }
            // null should be temporary
            default: return null;
        };
    }

    const eventHandler = async (fullRoom, toggler) => {
        console.log("here")
        // if (fullRoom.hasSubEvents) {
        //     console.log("here")
        //     subEventsHandler(fullRoom)
        //     return
        // }
        const event = await getEvents(fullRoom.eventCode)
        if (toggler) {
            // what if we have two enemies?
            await SetEnemie("")
            console.log("in toggler")
            const event = await getEvents(fullRoom.onEnd)
            console.log(event)
            await SetRoomEvent(event)
            await SetMessage(event.text)
            if (!event.onEnd) {
                console.log("no more events in room")
                if (fullRoom.hasSubEvents) {
                    console.log("here")
                    await subEventsHandler(fullRoom)
                    return
                }
                roomMover()
            }
            return
        }
        await SetRoomEvent(event)
        await SetMessage(event.text)
        if (event.hasEnemie) {
            await SetRoomEvent(event)
            await SetMessage(event.text)
            await startBattleHandler(event.enemie)
            return
        }
        if (!event.onEnd) {
            console.log("no more events in room")
            if (fullRoom.hasSubEvents) {
                console.log("here")
                await subEventsHandler(fullRoom)
                return
            }
            roomMover()
        }
    }


    const startBattleHandler = async (monster) => {
        console.log(monster)
        setTimeout(function () {
            SetEnemie(monster)
        }, 3000);
    }

    const roomMover = () => {
        console.log("room mover runs")
        SetShowButtnon(true)
    }


    const moveRoomsButtonContents = props?.character?.location?.current?.entrances?.map((button) => { return <ButtonHandler btn={button} presser={(e) => { getRoom(e?.target?.innerText) }} /> })

    const subEventsHandler = async (room) => {
        console.log("in subevent handler", room)
        const event = await getSubEvents(room.name)
        console.log(event)
        SetSubEvent(event)
        SetShowSubEventButtnon(true)
    }
    // create 2 new components to handle subs or a lot more states and mybe change the db structure cause we might have mor then one event. or i can create a subcollection with arrays of the event codes and locations

    /////////Jsx///////////
    return (
        <div>
            <h3>{message}</h3>
            {!enemie ? null : <BattleSystem monster={enemie} event={eventHandler} room={roomEvent} />}
            {!showSubEventButtnon ? null : < SubEventHandler subEventArr={subEvent} />}
            {!showButtnon ? null : moveRoomsButtonContents}
            {/* mayne add story handler component */}
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        character: state.character,
        currentUser: state.currentUser
    }
}
export default withAuth(connect(mapStateToProps)(RoomHandler))