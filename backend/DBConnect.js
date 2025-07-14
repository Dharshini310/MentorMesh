const mongoose = require("mongoose")

async function dbconnect() {
    db = await mongoose.connect(process.env.DB_URL)
    console.log("DB Connected")
}

module.exports = {dbconnect}