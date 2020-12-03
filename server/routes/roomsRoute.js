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


router.post("/updateRoom"), async (req, res, next) => {
console.log("arrive")
    try {
        console.log(req.body)
        return
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.CHARACTER_COLLECTION)
        const character = await collection.find({ email: userEmail }).toArray()

        collection.updateOne(
            { email: userEmail },
            {
                "$push":
                {
                    "gear": weapon
                }
            }
        )
        // console.log(collection)
        console.log(character)
        // const addWeaponToChar = await character[0].gear.insertOne(weapon);
        collection.find({ email: userEmail })
        return
        // data[0].gear.push(weapon)
        console.log("data", character)
        if (!character) return null
        return character[0]
    }
    catch (error) {
        console.log(error.message, "in get character")
    }

}

module.exports = router