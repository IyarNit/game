const express = require("express")
const router = express.Router();
const pool = require("../pool/MongoConnection")
require("dotenv").config();


router.get("/rooms", async (req, res, next) => {
    try {
        const { room } = req.headers
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.ROOMS_COLLECTION)
        const foundRoom = await collection.find({ name: room }).toArray();
        if (!foundRoom) return res.json({ message: "data Fetch Error" })
        return res.json({ message: "room located", room: foundRoom[0] })
    } catch (error) {
        console.log("rooms catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})


router.post("/updateRoom", async (req, res, next) => {
    try {
        const { email, location } = req.body
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.CHARACTER_COLLECTION)
        const character = await collection.find({ email: email }).toArray()
        // console.log(location)
        collection.updateOne(
            { email: email },
            {
                "$set":
                {
                    "location": location
                }
            }
        )
        // add chaecking if its empty before
        // need to check if worked or not
        return res.json({ message: "update succesful" })
    }
    catch (error) {
        console.log(error.message, "in update char room")
    }
})

module.exports = router