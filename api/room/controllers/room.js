'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {  
    async create(ctx) {
        const room = await strapi.services.room.create(ctx.request.body);

        return sanitizeEntity(room, { model: strapi.models.room });
    },

    async findOneUnpopulated(ctx) {
        const room = await strapi.services.room.findOneUnpopulated({ _id: ctx.params.id });

        return sanitizeEntity(room, { model: strapi.models.room });
    },

    async findByUser(ctx) {
        const rooms = await strapi.services.room.find({ users_permissions_users: { $in: [ctx.state.user._id] } });

        return rooms.map(room => sanitizeEntity(room, { model: strapi.models.room }));
    },

    async joinRoom(ctx) {
        const room = await strapi.services.room.joinRoom({ id: ctx.params.id }, ctx.state.user._id);

        return sanitizeEntity(room, { model: strapi.models.room });
    },
};
