'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async socketCreate(data) {
        message = await strapi.services.message.create(data);

    
        return sanitizeEntity(entity, { model: strapi.models.message });
    },   
};

