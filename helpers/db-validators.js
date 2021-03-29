const { Role, User, Hospital, Doctor } = require('../models')

const validRole = async (role = '') => {

    const roleExist = await Role.findOne({ role });
    if (!roleExist) {
        throw new Error(`El rol ${role} no es valido`);
    }
}

const emailExist = async (email = '') => {

    const exist = await User.findOne({ email });
    if (exist) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}

const userID = async (id) => {

    const userExist = await User.findById(id);
    if (!userExist) {
        throw new Error(`El ID no existe`);
    }
}

const hospitalExist = async (id) => {

    const hostpExist = await Hospital.findById(id);
    if (!hostpExist) {
        throw new Error(`El ID no existe`);
    }
}

const doctorExist = async (id) => {

    const docExist = await Doctor.findById(id);
    if (!docExist) {
        throw new Error(`El ID no existe`);
    }
}

const allowedCollections = (collection = '', collections = []) => {

    const include = collections.includes(collection);

    if (!include) {
        throw new Error(`La coleccion ${collection} no esta permitida, pruebe con ${collections}`);
    }

    return true;
}


module.exports = { validRole, emailExist, userID, hospitalExist, doctorExist, allowedCollections };