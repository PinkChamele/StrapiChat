module.exports = () => {
    const io = strapi.socketIO;

    io.on('connection', (socket) => {
        socket.on('sendMessage', strapi.controllers.message.socketCreate);
        socket.on('test', (data) => {
            socket.emit('hello', {
                data,
                cont: strapi.controllers.message.create,
            });
        })
    });
}
