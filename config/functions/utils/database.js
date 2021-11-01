async function findUser(username, room) {
    try {
        const userExists = await strapi.services.users.find({ username, room });

        return userExists;
    } catch(err) {
        strapi.log.error("Error while fetching", err);
    }
}

async function createUser({ username, room, socketId }) {
    try {
        const user = await strapi.services.users.create({
            username,
            room,
            socketId
        });

        return user;
    } catch(err) {
        strapi.log.error("Error while creating the user", err)
    }
}

async function userExists(id) {
    try {
        const user = strapi.services.users.findOne({ id: id });

        return user;
    } catch(err) {
        strapi.log.error("Error occured when fetching user", err);
    }
}

async function getUsersInRoom(room) {
    try {
        const usersInRoom = await strapi.services.users.find({ room });
    
        return usersInRoom;
    } catch(err) {
        strapi.log.error("Error while getting the users", err);
    }
}

async function deleteUser(socketId) {
    try {
        const user = await strapi.services.users.delete({ socketId: socketId });

        return user;
    } catch(err) {
        strapi.log.error("Error while deleting the user", err);
    }
}

module.exports = {
    findUser,
    createUser,
    userExists,
    getUsersInRoom,
    deleteUser,
}