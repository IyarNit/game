import axios from "axios"


const updateRoom = async (character) => {
    // this updates the location of the character in the different rooms?
    try {
        const url = `http://localhost:9876/updateRoom`
        // console.log(character)
        const result = await axios.post(url, { email: character.email, location: character.location }, { headers: { "Content-Type": "application/json" } })
        if (result.data.message === "update succesful") {
            // need to decide what to do upon failure or success
            return
        }
    }
    catch (error) {
        console.error("catch", error);
    }
}






const getEvents = async (eventCode) => {
    // this sends the eventcode to retrieve event
    try {
        console.log(eventCode)
        const url = `http://localhost:9876/events`
        const result = await axios.post(url, { eventCode: eventCode }, { headers: { "Content-Type": "application/json" } })
        if (result.data.message === "retrieval succesful") {
            // need to decide what to do upon failure or success
            return result.data.event
        }
    }
    catch (error) {
        console.error("catch", error);
    }
}

const getSubEvents = async (name) => {
    // this sends the eventcode to retrieve event
    try {
        console.log(name)
        const url = `http://localhost:9876/subEvents`
        const result = await axios.post(url, { room: name }, { headers: { "Content-Type": "application/json" } })
        if (result.data.message === "retrieval succesful") {
            // need to decide what to do upon failure or success
            return result.data.event
        }
    }
    catch (error) {
        console.error("catch", error);
    }
}
export { updateRoom, getEvents,getSubEvents }