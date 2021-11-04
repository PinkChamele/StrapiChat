'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const {
    findUser,
    createUser,
    userExists,
    getUsersInRoom,
    deleteUser,
} = require('./utils/database');

module.exports = () => {
    const ioServer = require('socket.io')(strapi.server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST'],
            allowedHeaders: ['my-custom-header'],
            credentials: true
        }
    });

    ioServer.on('connection', (socket) => {
        socket.on('join', async({ username, room }) => {
            try {
                const userExists = await findUser(username, room);

                if(userExists.length > 0) {
                    strapi.log.error(`User ${username} already exists in room ${room}. Please select a different name or room`);
                } else {
                    const user = await createUser({
                        username,
                        room,
                        socketId: socket.id
                    });

                    if(user) {
                        socket.join(user.room);
                        socket.emit('welcome', {
                            text: `${user.username}, Welcome to room ${user.room}.`,
                            userData: user
                        }); 

                        socket.broadcast.to(user.room).emit('message', {
                            text: `${user.username} has joined`,
                        });

                        ioServer.to(user.room).emit('roomInfo', {
                            room: user.room,
                            users: await getUsersInRoom(user.room)
                        });
                    } else {
                        strapi.log.error(`user is ${user}, so could not be created.`)
                    }
                }
            } catch(err) {
                strapi.log.error('Err occured', err);
            }
        });

        socket.on('sendMessage', async(data, callback) => {
            try {
                const user = await userExists(data.userId);

                if(user) {
                    ioServer.to(user.room).emit('message', {
                        user: user.username,
                        text: data.message,
                    });
                } else {
                    strapi.log.error(`User doesn't exist in the database. Rejoin the chat`)
                }
            } catch(err) {
                strapi.log.error('Err occured', err);
            }
        });

        socket.on('disconnect', async(data) => {
            try {
                strapi.log.info('disconnected');
                const user = await deleteUser(socket.id);
                strapi.log.info('deleted user is', user)
                if(user.length > 0) {
                    ioServer.to(user[0].room).emit('message', {
                        user: user[0].username,
                        text: `User ${user[0].username} has left the chat.`,
                    });  
                    ioServer.to(user.room).emit('roomInfo', {
                        room: user.room,
                        users: await getUsersInRoom(user[0].room)
                    });
                }
            } catch(err) {
                strapi.log.error('error while disconnecting', err);
            }
        });
    });
};
