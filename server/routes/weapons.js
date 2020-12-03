const express = require("express")
const router = express.Router();
const pool = require("../pool/MongoConnection")
require("dotenv").config();


router.get("/weapons", async (req, res, next) => {
    try {
        const { weapon, user } = req.headers
        console.log(weapon, user)
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.WEAPONS_COLLECTION)
        const data = await collection.find({ weapon }).toArray();
        const newWeaponObj = data[0]
        if (data.length === 0) return res.json({ message: "data Fetch Error" })
        const addWeaponToChar = await addWeapon(newWeaponObj, user)
        return
        return res.json({ message: "weapon added", data: data[0] })
    } catch (error) {
        console.log("weapons catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})

module.exports = router

const addWeapon = async (weapon, userEmail) => {
    try {
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