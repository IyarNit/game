import axios from "axios"


const updateRoom = async (character) => {
    try {
        const url = `http://localhost:9876/updateRoom`
        console.log(character.email )
        const result = await axios.post(url, { email: character.email }, { headers: { "Content-Type": "application/json" } })
        if (result.data.message === "update succesful") {
            // console.log(result.data)

            // props.history.push("/TempLanding")
            return
        }
    }
    catch (error) {
        console.error("catch", error);
    }
}
export default updateRoom
