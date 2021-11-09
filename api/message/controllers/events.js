module.exports = () => {
    const io = strapi.socketIO;

    io.on('connection', (socket) => {
        socket.on('sendMessage', async (data) => {
            try {
                const message = {
                    users_permissions_user: socket.state.user._id,
                    ...data,
                };
                const room = await strapi.services.room.findOne({ id: data.room });

                io.to(room.name).emit('message', await strapi.controllers.message.create(message));
            } catch (error) {
                socket.emit('error', error);
            }
        });

        socket.on('getAllMessages', async ({ roomId }) => {
            try {
                socket.emit('allMessages', await strapi.controllers.message.getByRoom(roomId));
            } catch (error) {
                socket.emit('error', error);
            }
        });
    });
}
