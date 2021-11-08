'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async create(data) {
		const message = await strapi.services.message.create(data);

    	return sanitizeEntity(message, { model: strapi.models.message });
	},
	
	async getByRoom(room) {
		const messages = await strapi.services.message.find({ room });

		return messages.map(message => sanitizeEntity(message, { model: strapi.models.message }));
	},
};

