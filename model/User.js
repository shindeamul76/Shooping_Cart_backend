const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true}
})

UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password)
} 

UserSchema.methods.generateToken = async function () {
    return await jwt.sign({_id: this._id}, process.env.JWT_SECRET)
}

module.exports = mongoose.model('User', UserSchema);