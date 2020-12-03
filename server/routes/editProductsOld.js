const express = require("express")
const router = require("express").Router()
const mongoConnection = require("../databaseConnections/MongoConnection")

router.post("/editProducts", async (req, res, next) => {
    try {
        // console.log(req.body);
        const { user, update } = req.body;
        console.log(user, update)
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db('project4').collection('products');
        const data = await collection.updateOne(filter, { $set: update });
        if (data.result.nModified === 0) return res.json({ message: "data Fetch Error" }) //happens if filter is non existant
        return res.json(data)
    } catch (error) {
        console.log("getUsers catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})


module.exports = router