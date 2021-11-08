'use strict';

/**
 * `is-socket-authenticated` policy.
 */
 const jwt = require('jsonwebtoken');


module.exports = (socket, next) => {
  	if (socket.handshake.query && socket.handshake.query.token) {
    	jwt.verify(socket.handshake.query.token, strapi.config.get('server.jwt.secret'), async (err, decoded) => {
        	if (err) return next(new Error('Authentication error'));
          	socket.state = { user: await strapi.query('user', 'users-permissions').findOne({ id: decoded.id }) };
          	next();
      	});
  	}
  	else {
    	next(new Error('Authentication error'));
  	}    
}

/*
async (ctx, next) => {
  // Add your own logic here.
  console.log('In is-socket-authenticated policy.');

  await next();
};*/
