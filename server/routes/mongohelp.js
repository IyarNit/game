const express = require("express")
const router = express.Router();
const pool = require("./pool/MongoConnection")


router.get("/getUsers", async (req, res, next) => {
    try {
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db('Countries').collection('users')
        const data = await collection.find({}).toArray();
        if (data.length === 0) return res.json({ message: "data Fetch Error" })
        return res.json({ message: "ok", data: data })
    } catch (error) {
        console.log("getUsers catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})


router.post("/addUsers", async (req, res, next) => {
    try {
        const { user } = req.body
        // console.log(user)
        const connectionToMongoDB = await pool();
        const collection1 = await connectionToMongoDB.db('Countries').collection('users')
        const existingUsers = await collection1.find({}).toArray();
        if (existingUsers.length === 0) return res.json({ message: "data Fetch Error" })
        // console.log(existingUsers)
        const findRes = existingUsers.find((r) => { return r.user === user })
        // console.log(findRes)
        if (findRes) return res.json({ message: "data error" })
        const collection2 = await connectionToMongoDB.db('Countries').collection('users')
        const data = await collection2.insertOne(req.body);
        if (data.lenght === 0) return res.json({ message: "data Fetch Error" })
        return res.json({ message: "ok", data: data })
    } catch (error) {
        console.log("getUsers catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})



router.post("/editUser", async (req, res, next) => {
    try {
        // {
        //     "filter": {
        //         "user": "Philip"
        //     },
        //     "update": {
        //         "age": 980
        //     }

        // }
        console.log(req.body);
        const { user, update } = req.body;
        console.log(user, update)
        // const connectionToMongoDB = await pool();
        // const collection = await connectionToMongoDB.db('Countries').collection('users');
        // const data = await collection.updateOne(filter, { $set: update });
        // if (data.result.nModified === 0) return res.json({ message: "data Fetch Error" }) //happens if filter is non existant
        // return res.json(data)
    } catch (error) {
        console.log("getUsers catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})



router.delete("/removeUser", async (req, res, next) => {
    try {
        // {
        //     "filter": {
        //         "user": "Philip"
        //     },
        // }
        console.log(req.body);
        const { filter } = req.body;
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db('Countries').collection('users');
        const data = await collection.deleteOne(filter);
        console.log(data.deletedCount)
        if (data.deletedCount === 0) return res.json({ message: "no data available" })
        return res.json(data)
    } catch (error) {
        console.log("deleteUsers catch error", error.message)
        return res.status(401).json({ message: "invalid request" })
    }
})

module.exports = router;
