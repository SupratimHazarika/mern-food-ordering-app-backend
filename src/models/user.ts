import mongoose from "mongoose";

const userScema = new mongoose.Schema({
    auth0Id : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    name : {
        type: String,
    },
    addressLine1 : {
        type: String,
    },
    city : {
        type: String,
    },
    country : {
        type: String,
    }
})

const User = mongoose.model('User', userScema);
export default User;