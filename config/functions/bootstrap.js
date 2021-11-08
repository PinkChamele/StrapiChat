'use strict';

const messageSocketEvents = require(`../../api/message/controllers/events`);
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
    strapi.socketIO = require('socket.io')(strapi.server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"],
          allowedHeaders: ["my-custom-header"],
          credentials: true
        },
        noServer: true,
    });

    messageSocketEvents();
};
