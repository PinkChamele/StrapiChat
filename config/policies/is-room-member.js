'use strict';

/**
 * `room-contains-user` policy.
 */

module.exports = async (socket, next) => {
	console.log(socket);
	const userId = socket.state.user._id;
	const room = await strapi.room.services.findOne({ id: socket.data.room });
	const isRoomMember = room?.users_permissions_users.some((user) => {
		user.equals(userId);
	});

  	if (isRoomMember) {
    	next();
  	}
  	else {
    	next(new Error('Forbidden error'));
  	}    
};
