'use strict';

const messageSocketEvents = require('../../api/message/controllers/events');
const roomSocketEvents = require('../../api/room/controllers/events');
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {
    strapi.socketIO = require('socket.io')(strapi.server);

    strapi.socketIO.use(strapi.config.policies['verify-socket-token'])
    .on('connection', async (socket) => {
        const userRooms = await strapi.services.room.find({ users_permissions_users: { $in: [socket.state.user._id] } });

        userRooms.forEach((room) => socket.join(room.name));
        console.log(`connection created, username: ${ socket.state.user.username }`);
    });

    messageSocketEvents();
    roomSocketEvents();
};
