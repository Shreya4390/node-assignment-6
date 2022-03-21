const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

async function createOne(data) {
    const userdata = await User.create(data);
    return userdata;
};

async function updateOne(data, id) {
    const userdata = await User.update(data, {
        where: { id }
    });
    return userdata;
};

async function deleteOne(id) {
    const userdata = await User.destroy({
        where: { id }
    });
    return userdata;
};

async function findOne(id) {
    const userdata = await User.findOne({
        where: { id }
    });
    return userdata;
};

async function findAll(search) {
    const userdata = await User.findAll({
        where: {
            [Op.and]: {
                [Op.or]: {
                    occupation: {
                        [Op.in]: ['self employed', 'job']
                    },
                    age: {
                        [Op.between]: [44, 90]
                    }
                },
            },
            [Op.or]: {
                country: { [Op.like]: `%${search}%` }
            }
        }

    });
    return userdata;
};

async function deleteAll() {
    const userdata = User.destroy({
        where: {},
        truncate: false
    });
    return userdata;
}
module.exports = {
    createOne,
    updateOne,
    deleteOne,
    findOne,
    findAll,
    deleteAll
}