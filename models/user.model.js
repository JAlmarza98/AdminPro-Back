const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre el obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email el obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña el obligatorio']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {

    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;

}

module.exports = model('User', UserSchema);