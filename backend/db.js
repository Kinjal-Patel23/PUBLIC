const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/mern_app_db")
    .then(() => console.log("Database Connected Successfully...!!"))
    .catch((err) => console.log("Database Connection error:", err));
}

module.exports = connectDB;