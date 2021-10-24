import mongoose from "mongoose"

const userSchema =	new mongoose.Schema({
	userid : String, 
	password : String,
	email: String
	,
})

export default mongoose.model('users', userSchema)
