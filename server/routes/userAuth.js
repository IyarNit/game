const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../pool/MongoConnection")


router.get("/tokenVerify", async (req, res, next) => {
    try {
        setTimeout(() => {
            const token = req.headers.authorization
            jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) return res.json({ status: false })
                return res.json({ status: true })
            })
        }, 1000);
    } catch (error) {
        console.log("tokenVerify catch error", error.message)
        return res.json({ status: false })
    }
})



router.get("/userIdentifier", async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const isUser = await isUserCheck(token)
        const getCharacter = await getChar(isUser.email)
        if (!getCharacter) return res.json({ message: "Error has occured. Please Contact Support" })
        return res.json({ user: isUser, character: getCharacter })
    } catch (error) {
        console.log("userIdentifier catch error", error.message);
        return res.json({ message: "jwt expired" })
    }
})

const isUserCheck = async (token) => {
    let decoded = await jwt.verify(token, process.env.SECRET);
    return decoded
}

const getChar = async (userEmail) => {
    try {
        const connectionToMongoDB = await pool();
        const collection = await connectionToMongoDB.db(process.env.DB_NAME).collection(process.env.CHARACTER_COLLECTION)
        const data = await collection.find({ email: userEmail }).toArray()
        if (!data) return null
        return data[0]
    }
    catch (error) {
        console.log(error.message, "in get character")
    }

}

module.exports = router