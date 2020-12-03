const express = require("express")
const router = express.Router();
const pool = require("../pool/MongoConnection")
require("dotenv").config();


router.get("/enemies", async (req, res, next) => {
    try {
        // console.log("in enemies")
        const { enemie } = req.headers
        // console.log(enemie)
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.ENEMIES_COLLECTION)
        const foundEnemie = await collection.find({ name:enemie }).toArray();
        if(!foundEnemie) return res.json({ message: "data Fetch Error" }) 
        // console.log(foundEnemie)
        return res.json({ message: "enemie located", enemie: foundEnemie[0] })
    } catch (error) {
        console.log("enemies catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})

module.exports = router