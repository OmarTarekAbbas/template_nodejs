const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
    },

    phoneNumber: {
        type: Number,
    },

    address: {
        type: String,
    },
    image: {
        type: String,
        default : "/upload/default.jpeg"
    }

});

UserSchema.methods.hashpassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema);