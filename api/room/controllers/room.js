'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {  
    async create(ctx) {
        let entity;

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);

            entity = await strapi.services.room.create(data, { files });
        } else {
            entity = await strapi.services.room.create(ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models.room });
    },

    async find(ctx) {
        let entities;

        if (ctx.query._q) {
            entities = await strapi.services.room.search(ctx.query);
        } else {
            entities = await strapi.services.room.find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.room }));
    },

    async findByUser(ctx) {
        let entities;

        entities = await strapi.services.room.findByUser(ctx.params.userId);

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.room }));
    },

    async addUser(ctx) {
        const { id } = ctx.params;
        let entity;

        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);

            entity = await strapi.services.room.addUser({ id }, data, {
                files,
            });
        } else {
            entity = await strapi.services.room.addUser({ id }, ctx.request.body.userId);
        }
    
        return sanitizeEntity(entity, { model: strapi.models.room });
    },
};
