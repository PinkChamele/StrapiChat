module.exports = () => {
    const io = strapi.socketIO;

    io.on('connection', (socket) => {
        socket.on('sendMessage', async (data) => {
            try {
                const message = {
                    user: socket.state.user._id,
                    ...data,
                }
                io.emit('message', await strapi.controllers.message.create(message));
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
