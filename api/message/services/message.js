'use strict';

const { isDraft } = require('strapi-utils').contentTypes;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    find(params, populate) {
        return strapi.query('message').find(params, populate);
    },

    search(params) {
        return strapi.query('message').search(params);
    },

    findOne(params, populate) {
        return strapi.query('message').findOne(params, populate);
    },

    async create(data, { files } = {}) {
        const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.message,
            data,
            { isDraft: isDraft(data, strapi.models.message) }
        );
        const entry = await strapi.query('message').create(validData);

        if (files) {
            await strapi.entityService.uploadFiles(entry, files, {
                model: 'message',
            });
            return this.findOne({ id: entry.id });
        }

        return entry;
    },
};
