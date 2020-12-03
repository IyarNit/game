const express = require("express")
const router = express.Router();
const sqlConnection = require("../databaseConnections/MySqlConnection")
const { getUsersQuery } = require("./queries/queries")


router.get("/users", async (req, res, next) => {
    try {
        const getUsers = await getAllUsers()
        if (getAllUsers) return res.json({ message: "usersFetched", getUsers })
        return res.json({ message: "users error" })
    }
    catch (error) {
        console.log("users catch ", error.message)
    }
})


const getAllUsers = async () => {
    try {
        const usersQuerry = await getUsersQuery()
        const result = await sqlConnection.execute(usersQuerry)
        return result[0]
    }
    catch (error) {
        console.log(error.message)
    }
}







module.exports = router