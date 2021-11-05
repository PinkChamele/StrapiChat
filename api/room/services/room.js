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

    search(params) {
        return strapi.query('room').search(params);
    },

    findOne(params, populate) {
        return strapi.query('room').findOne(params, populate);
    },

    findByUser(userId, populate) {
        return this.find({ users_permissions_users: { $in: [userId] } }, populate);
    },

    async create(data, { files } = {}) {
        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.room,
            data,
            { isDraft: isDraft(data, strapi.models.room) }
        );
        const entry = await strapi.query('room').create(validData);

        if (files) {
            await strapi.entityService.uploadFiles(entry, files, {
                model: 'room',
            });
            return this.findOne({ id: entry.id });
        }

        return entry;
    },

    async addUser(params, userId, { files } = {}) {
        const existingEntry = await this.findOne(params);
        const validData = await strapi.entityValidator.validateEntityUpdate(
            strapi.models.room,
            { $addToSet: { users_permissions_users: userId } },
            { isDraft: isDraft(existingEntry, strapi.models.room) }
        );
        const entry = await strapi.query('room').update(params, validData);
    
        if (files) {
            await strapi.entityService.uploadFiles(entry, files, {
                model: 'room',
            });
            return this.findOne({ id: entry.id });
        }

        return entry;
    },
};
