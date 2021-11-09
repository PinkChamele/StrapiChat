'use strict';

const { isDraft } = require('strapi-utils').contentTypes;


/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    find(params, populate) {
        return strapi.query('room').find(params, populate);
    },

    findOneUnpopulated(params) {
        return strapi.query('room').model.findOne(params);
    },

    search(params) {
        return strapi.query('room').search(params);
    },

    findOne(params, populate) {
        return strapi.query('room').findOne(params, populate);
    },

    async create(data) {
        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.room,
            data,
            { isDraft: isDraft(data, strapi.models.room) }
        );
        const entry = await strapi.query('room').create(validData);

        return entry;
    },

    async joinRoom(params, userId) {
        const existingEntry = await this.findOne(params);
        const validData = await strapi.entityValidator.validateEntityUpdate(
            strapi.models.room,
            { $addToSet: { users_permissions_users: userId } },
            { isDraft: isDraft(existingEntry, strapi.models.room) }
        );
        const entry = await strapi.query('room').update(params, validData);

        return entry;
    },
};
