module.exports = () => {
    const io = strapi.socketIO;

    io.on('connection', (socket) => {
        socket.on('join', async (data) => {
            try {
                const room = await strapi.services.room.findOneUnpopulated({ _id: data.id });
                const isRoomMember = room.users_permissions_users.includes(socket.state.user._id);

                if (!isRoomMember) {
                    const joinedRoom = await strapi.services.room.joinRoom(data, socket.state.user._id);
                }

                socket.join(room.name);
            } catch (error) {
                socket.emit('error', error);
            }
        });
    });
}
