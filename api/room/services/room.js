'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async create (data, { files } = {}) {
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

    find(params, populate) {
        return strapi.query('room').find(params, populate);
    },
};
