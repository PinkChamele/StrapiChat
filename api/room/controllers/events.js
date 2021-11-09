module.exports = () => {
    const io = strapi.socketIO;

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            try {
                if () {
                    const room = await strapi.services.room.joinRoom(data, socket.state.user._id);
                    io.to(room.name).emit('join', {
                        message: `User ${ socket.state.user.username } successfully joined the room`
                    });
                }

                socket.join(room.name);
            } catch (error) {
                socket.emit('error', error);
            }
        });
    });
}

