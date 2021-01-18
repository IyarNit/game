const express = require("express")
const router = express.Router();
const pool = require("../pool/MongoConnection")
require("dotenv").config();


router.post("/events", async (req, res, next) => {
    try {
        console.log(req.body)

        // const { room } = req.headers
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.EVENTS_COLLECTION)
        const eventFound = await collection.find(req.body).toArray();
        console.log(eventFound)
        if (!eventFound) return res.json({ message: "data Fetch Error" })
        return res.json({ message: "retrieval succesful", event: eventFound[0] })
    } catch (error) {
        console.log("events catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})

router.post("/subEvents", async (req, res, next) => {
    try {
        console.log(req.body)
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.SUB_EVENTS_COLLECTION)
        const eventFound = await collection.find(req.body).toArray();
        console.log(eventFound)
        if (!eventFound) return res.json({ message: "data Fetch Error" })
        return res.json({ message: "retrieval succesful", event: eventFound })
    } catch (error) {
        console.log("events catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})
// router.post("/updateRoom", async (req, res, next) => {
//     try {
//         const { email, location } = req.body
//         const connectionToMongoDB = await pool();
//         const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.CHARACTER_COLLECTION)
//         const character = await collection.find({ email: email }).toArray()
//         // console.log(location)
//         collection.updateOne(
//             { email: email },
//             {
//                 "$set":
//                 {
//                     "location": location
//                 }
//             }
//         )
//         // add chaecking if its empty before
//         // need to check if worked or not
//         return res.json({ message: "update succesful" })
//     }
//     catch (error) {
//         console.log(error.message, "in update char room")
//     }
// })

module.exports = router