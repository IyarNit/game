const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const mongoConnection = require("../databaseConnections/MongoConnection")
const tokenVerify = require("../validations/tokenVerify")

router.get("/products", async (req, res, next) => {
    try {
        const connectionToMongoDB = await mongoConnection();
        const collection = await connectionToMongoDB.db('project4').collection('products')
        const data = await collection.find({}).toArray();
        if (data.length === 0) return res.json({ message: "data Fetch Error" })
     
    }
    catch (error) {
        console.log("getUsers catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})






module.exports = router


