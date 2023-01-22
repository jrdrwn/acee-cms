"use strict";

const isOwner = require("../../../utils/isOwner");

/**
 * relation controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::relation.relation",
  ({ strapi }) => ({
    async delete(ctx) {
      await isOwner(ctx, "api::relation.relation");
      const res = await super.delete(ctx);
      return res;
    },
    async update(ctx) {
      await isOwner(ctx, "api::relation.relation");
      const res = await super.update(ctx);
      return res;
    },
  })
);
